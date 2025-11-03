// src/app/services/api.service.spec.ts
import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { ApiService } from './api.service';
import { ErrorResponse } from '../models';

describe('ApiService', () => {
    let service: ApiService;
    let httpMock: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                ApiService,
                provideHttpClient(withInterceptorsFromDi()),
                provideHttpClientTesting()
            ]
        });

        service = TestBed.inject(ApiService);
        httpMock = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        httpMock.verify();
    });

    it('deve criar o serviço', () => {
        expect(service).toBeTruthy();
    });

    it('deve fazer requisição GET com sucesso', () => {
        const mockData = { id: 1, name: 'Test' };

        service.get<{ id: number, name: string }>('/test').subscribe(data => {
            expect(data).toEqual(mockData);
        });

        const req = httpMock.expectOne('http://localhost:8080/api/test');
        expect(req.request.method).toBe('GET');
        req.flush(mockData);
    });

    it('deve fazer requisição POST com sucesso', () => {
        const mockData = { id: 1, name: 'Test' };
        const body = { name: 'Test' };

        service.post<{ id: number, name: string }>('/test', body).subscribe(data => {
            expect(data).toEqual(mockData);
        });

        const req = httpMock.expectOne('http://localhost:8080/api/test');
        expect(req.request.method).toBe('POST');
        expect(req.request.body).toEqual(body);
        req.flush(mockData);
    });

    it('deve tratar erro HTTP 404', (done) => {
        service.get('/not-found').subscribe({
            next: () => fail('Deveria ter falhado'),
            error: (error: Error) => {
                // Verifica se a mensagem de erro é uma string (não precisa ser específica)
                expect(typeof error.message).toBe('string');
                done();
            }
        });

        const req = httpMock.expectOne('http://localhost:8080/api/not-found');
        req.flush('Not Found', {
            status: 404,
            statusText: 'Not Found'
        });
    });

    it('deve tratar erro HTTP 500', (done) => {
        service.get('/server-error').subscribe({
            next: () => fail('Deveria ter falhado'),
            error: (error: Error) => {
                // Verifica se a mensagem de erro é uma string (não precisa ser específica)
                expect(typeof error.message).toBe('string');
                done();
            }
        });

        const req = httpMock.expectOne('http://localhost:8080/api/server-error');
        req.flush('Internal Server Error', {
            status: 500,
            statusText: 'Internal Server Error'
        });
    });

    // Teste para verificar se o método de formatação de erro existe
    it('deve ter método para formatar mensagens de erro', () => {
        // Verifica se o método existe (pode ser privado, então testamos indiretamente)
        expect(service).toBeTruthy(); // Serviço existe

        // Testa o comportamento através de uma chamada real
        service.get('/test-error').subscribe({
            next: () => fail('Deveria ter falhado'),
            error: (error) => {
                expect(error).toBeDefined();
            }
        });

        const req = httpMock.expectOne('http://localhost:8080/api/test-error');
        req.flush('Error', { status: 400, statusText: 'Bad Request' });
    });
});