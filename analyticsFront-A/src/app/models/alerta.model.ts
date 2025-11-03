// src/app/models/alerta.model.ts
export interface Alerta {
    tipo: 'info' | 'sucesso' | 'aviso' | 'perigo';
    titulo: string;
    mensagem: string;
    icone: string;
    timestamp: Date;
    lido: boolean;
}