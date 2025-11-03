import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Alerta } from '../models/alerta.model';
import { DashboardResumo } from '../models';

@Injectable({
    providedIn: 'root'
})
export class AlertasService {

    private alertasSubject = new BehaviorSubject<Alerta[]>([]);
    public alertas$ = this.alertasSubject.asObservable();

    analisarAlertas(dados: DashboardResumo): void {
        const alertas: Alerta[] = [];

        // 1. Alerta de queda nas vendas
        if (dados.crescimentoPercentual < -15) {
            alertas.push({
                tipo: 'perigo',
                titulo: 'Queda Crítica nas Vendas',
                mensagem: `Queda de ${Math.abs(dados.crescimentoPercentual).toFixed(1)}% em relação ao período anterior`,
                icone: '📉',
                timestamp: new Date(),
                lido: false
            });
        } else if (dados.crescimentoPercentual < -5) {
            alertas.push({
                tipo: 'aviso',
                titulo: 'Queda nas Vendas',
                mensagem: `Queda de ${Math.abs(dados.crescimentoPercentual).toFixed(1)}% detectada`,
                icone: '⚠️',
                timestamp: new Date(),
                lido: false
            });
        }

        // 2. Alerta de crescimento excelente
        if (dados.crescimentoPercentual > 20) {
            alertas.push({
                tipo: 'sucesso',
                titulo: 'Crescimento Excelente!',
                mensagem: `Crescimento de ${dados.crescimentoPercentual.toFixed(1)}% - Parabéns!`,
                icone: '🚀',
                timestamp: new Date(),
                lido: false
            });
        }

        // 3. Alerta de horário de pico
        const horaAtual = new Date().getHours();
        if ((horaAtual >= 11 && horaAtual <= 14) || (horaAtual >= 18 && horaAtual <= 21)) {
            alertas.push({
                tipo: 'info',
                titulo: 'Horário de Pico',
                mensagem: horaAtual <= 14 ? 'Pico do almoço - monitore a produção' : 'Pico do jantar - equipe alerta',
                icone: '🍽️',
                timestamp: new Date(),
                lido: false
            });
        }

        // 4. Alerta de produto destaque
        if (dados.topProdutos && dados.topProdutos.length > 0) {
            const produtoTop = dados.topProdutos[0];
            if (produtoTop.quantidadeVendida > 1000) {
                alertas.push({
                    tipo: 'sucesso',
                    titulo: 'Produto Estrela!',
                    mensagem: `${produtoTop.nomeProduto} lidera com ${produtoTop.quantidadeVendida} vendas`,
                    icone: '⭐',
                    timestamp: new Date(),
                    lido: false
                });
            }
        }

        this.alertasSubject.next(alertas);
    }

    marcarComoLido(index: number): void {
        const alertas = this.alertasSubject.value;
        if (alertas[index]) {
            alertas[index].lido = true;
            this.alertasSubject.next([...alertas]);
        }
    }

    limparAlertas(): void {
        this.alertasSubject.next([]);
    }
}