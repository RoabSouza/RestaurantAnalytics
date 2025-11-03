// src/app/services/api.service.ts (se precisar atualizar)
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ErrorResponse } from '../models';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private readonly API_URL = 'http://localhost:8080/api';

  constructor(private http: HttpClient) { }

  get<T>(endpoint: string, params?: HttpParams): Observable<T> {
    const url = `${this.API_URL}${endpoint}`;

    return this.http.get<T>(url, { params })
      .pipe(
        catchError(this.handleError.bind(this)) // ← Adicione .bind(this) se necessário
      );
  }

  post<T>(endpoint: string, body: any): Observable<T> {
    const url = `${this.API_URL}${endpoint}`;

    return this.http.post<T>(url, body)
      .pipe(
        catchError(this.handleError.bind(this)) // ← Adicione .bind(this) se necessário
      );
  }

  put<T>(endpoint: string, body: any): Observable<T> {
    const url = `${this.API_URL}${endpoint}`;

    return this.http.put<T>(url, body)
      .pipe(
        catchError(this.handleError.bind(this))
      );
  }

  delete<T>(endpoint: string): Observable<T> {
    const url = `${this.API_URL}${endpoint}`;

    return this.http.delete<T>(url)
      .pipe(
        catchError(this.handleError.bind(this))
      );
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'Ocorreu um erro desconhecido';

    if (error.error instanceof ErrorEvent) {
      errorMessage = `Erro: ${error.error.message}`;
    } else {
      const backendError = error.error as ErrorResponse;

      if (backendError && backendError.message) {
        errorMessage = backendError.message;
      } else {
        errorMessage = this.getErrorMessageByStatus(error.status);
      }
    }

    return throwError(() => new Error(errorMessage));
  }

  private getErrorMessageByStatus(status: number): string {
    switch (status) {
      case 0:
        return 'Não foi possível conectar ao servidor. Verifique sua conexão.';
      case 400:
        return 'Dados inválidos. Verifique as informações enviadas.';
      case 401:
        return 'Você não está autenticado. Faça login novamente.';
      case 403:
        return 'Você não tem permissão para acessar este recurso.';
      case 404:
        return 'Recurso não encontrado.';
      case 500:
        return 'Erro interno no servidor. Tente novamente mais tarde.';
      case 503:
        return 'Serviço temporariamente indisponível. Tente novamente em alguns minutos.';
      default:
        return `Erro inesperado (${status}). Entre em contato com o suporte.`;
    }
  }
}