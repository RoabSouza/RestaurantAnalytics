import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertasService } from '../../services/alertas.service';
import { Alerta } from '../../models/alerta.model';

@Component({
  selector: 'app-alertas',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './alertas.component.html',  // ← CORRIGIDO: mudar de alerts.html para alertas.component.html
  styleUrls: ['./alertas.component.scss']
})
export class AlertasComponent implements OnInit {
  
  alertas: Alerta[] = [];

  constructor(private alertasService: AlertasService) {}

  ngOnInit(): void {
    this.alertasService.alertas$.subscribe(alertas => {
      this.alertas = alertas;
    });
  }

  marcarComoLido(index: number): void {
    this.alertasService.marcarComoLido(index);
  }

  limparAlertas(): void {
    this.alertasService.limparAlertas();
  }
}