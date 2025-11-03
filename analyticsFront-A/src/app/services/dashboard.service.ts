// src/app/services/dashboard.service.ts
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpParams } from '@angular/common/http';
import { ApiService } from './api.service';
import {
  DashboardResumo,
  ProdutoTop,
  VendasPorCanal,
  VendasPorHora,
  VendasPorDia,
  VendasPorLoja,
  VendasPorDiaSemana,
  PeriodoDisponivel
} from '../models';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private apiService: ApiService) { }

  getResumoCompleto(inicio?: Date, fim?: Date): Observable<DashboardResumo> {
    let params = new HttpParams();

    if (inicio) {
      params = params.set('inicio', this.formatDateToISO(inicio));
    }
    if (fim) {
      params = params.set('fim', this.formatDateToISO(fim));
    }

    return this.apiService.get<DashboardResumo>('/dashboard/resumo', params);
  }

  getTopProdutos(inicio?: Date, fim?: Date, limit: number = 10): Observable<ProdutoTop[]> {
    let params = new HttpParams().set('limit', limit.toString());

    if (inicio) {
      params = params.set('inicio', this.formatDateToISO(inicio));
    }
    if (fim) {
      params = params.set('fim', this.formatDateToISO(fim));
    }

    return this.apiService.get<ProdutoTop[]>('/dashboard/produtos/top', params);
  }

  getVendasPorCanal(inicio?: Date, fim?: Date): Observable<VendasPorCanal[]> {
    let params = new HttpParams();

    if (inicio) {
      params = params.set('inicio', this.formatDateToISO(inicio));
    }
    if (fim) {
      params = params.set('fim', this.formatDateToISO(fim));
    }

    return this.apiService.get<VendasPorCanal[]>('/dashboard/vendas/por-canal', params);
  }

  getVendasPorHora(inicio?: Date, fim?: Date): Observable<VendasPorHora[]> {
    let params = new HttpParams();

    if (inicio) {
      params = params.set('inicio', this.formatDateToISO(inicio));
    }
    if (fim) {
      params = params.set('fim', this.formatDateToISO(fim));
    }

    return this.apiService.get<VendasPorHora[]>('/dashboard/vendas/por-hora', params);
  }

  getVendasPorDia(inicio?: Date, fim?: Date): Observable<VendasPorDia[]> {
    let params = new HttpParams();

    if (inicio) {
      params = params.set('inicio', this.formatDateToISO(inicio));
    }
    if (fim) {
      params = params.set('fim', this.formatDateToISO(fim));
    }

    return this.apiService.get<VendasPorDia[]>('/dashboard/vendas/por-dia', params);
  }

  getTopLojas(inicio?: Date, fim?: Date, limit: number = 10): Observable<VendasPorLoja[]> {
    let params = new HttpParams().set('limit', limit.toString());

    if (inicio) {
      params = params.set('inicio', this.formatDateToISO(inicio));
    }
    if (fim) {
      params = params.set('fim', this.formatDateToISO(fim));
    }

    return this.apiService.get<VendasPorLoja[]>('/dashboard/lojas/top', params);
  }

  getVendasPorDiaSemana(inicio?: Date, fim?: Date): Observable<VendasPorDiaSemana[]> {
    let params = new HttpParams();

    if (inicio) {
      params = params.set('inicio', this.formatDateToISO(inicio));
    }
    if (fim) {
      params = params.set('fim', this.formatDateToISO(fim));
    }

    return this.apiService.get<VendasPorDiaSemana[]>('/dashboard/vendas/por-dia-semana', params);
  }

  getPeriodoDisponivel(): Observable<PeriodoDisponivel> {
    return this.apiService.get<PeriodoDisponivel>('/dashboard/periodo-disponivel');
  }

  private formatDateToISO(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
  }
}