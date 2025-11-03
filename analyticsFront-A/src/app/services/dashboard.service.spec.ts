import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { DashboardService } from './dashboard.service';
import { ApiService } from './api.service';
import { DashboardResumo, ProdutoTop, VendasPorCanal } from '../models';

describe('DashboardService', () => {
    let service: DashboardService;
    let httpMock: HttpTestingController;
    let apiService: ApiService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [DashboardService, ApiService]
        });

        service = TestBed.inject(DashboardService);
        httpMock = TestBed.inject(HttpTestingController);
        apiService = TestBed.inject(ApiService);
    });

    afterEach(() => {
        httpMock.verify(); // Verifica que não há requisições pendentes
    });

    it('deve ser criado', () => {
        expect(service).toBeTruthy();
    });

    // ========================================
    // TESTE: getResumoCompleto
    // ========================================

    it('deve buscar resumo completo com sucesso', () => {
        const mockResumo: DashboardResumo = {
            faturamentoTotal: 15000000,
            totalVendas: 500000,
            ticketMedio: 30,
            crescimentoPercentual: 15.5,
            topProdutos: [],
            vendasPorCanal: [],
            vendasPorHora: [],
            vendasPorDia: [],
            topLojas: [],
            vendasPorDiaSemana: []
        };

        service.getResumoCompleto().subscribe(data => {
            expect(data).toEqual(mockResumo);
            expect(data.faturamentoTotal).toBe(15000000);
            expect(data.totalVendas).toBe(500000);
        });

        const req = httpMock.expectOne('http://localhost:8080/api/dashboard/resumo');
        expect(req.request.method).toBe('GET');
        req.flush(mockResumo);
    });

    it('deve buscar resumo completo com datas', () => {
        const inicio = new Date('2024-10-01');
        const fim = new Date('2024-10-31');

        const mockResumo: DashboardResumo = {
            faturamentoTotal: 10000000,
            totalVendas: 300000,
            ticketMedio: 33.33,
            crescimentoPercentual: 10,
            topProdutos: [],
            vendasPorCanal: [],
            vendasPorHora: [],
            vendasPorDia: [],
            topLojas: [],
            vendasPorDiaSemana: []
        };

        service.getResumoCompleto(inicio, fim).subscribe(data => {
            expect(data).toEqual(mockResumo);
        });

        const req = httpMock.expectOne((request) => {
            return request.url === 'http://localhost:8080/api/dashboard/resumo' &&
                request.params.has('inicio') &&
                request.params.has('fim');
        });

        expect(req.request.method).toBe('GET');
        req.flush(mockResumo);
    });

    // ========================================
    // TESTE: getTopProdutos
    // ========================================

    it('deve buscar top produtos', () => {
        const mockProdutos: ProdutoTop[] = [
            {
                produtoId: 1,
                nomeProduto: 'Pizza Margherita',
                quantidadeVendida: 1000,
                totalVendido: 30000
            },
            {
                produtoId: 2,
                nomeProduto: 'Refrigerante',
                quantidadeVendida: 2000,
                totalVendido: 10000
            }
        ];

        service.getTopProdutos(undefined, undefined, 10).subscribe(data => {
            expect(data.length).toBe(2);
            expect(data[0].nomeProduto).toBe('Pizza Margherita');
        });

        const req = httpMock.expectOne((request) => {
            return request.url === 'http://localhost:8080/api/dashboard/produtos/top' &&
                request.params.get('limit') === '10';
        });

        expect(req.request.method).toBe('GET');
        req.flush(mockProdutos);
    });

    // ========================================
    // TESTE: getVendasPorCanal
    // ========================================

    it('deve buscar vendas por canal', () => {
        const mockCanais: VendasPorCanal[] = [
            {
                nomeCanal: 'iFood',
                tipoCanal: 'D',
                quantidade: 150000,
                total: 4500000,
                ticketMedio: 30
            },
            {
                nomeCanal: 'Presencial',
                tipoCanal: 'P',
                quantidade: 200000,
                total: 8000000,
                ticketMedio: 40
            }
        ];

        service.getVendasPorCanal().subscribe(data => {
            expect(data.length).toBe(2);
            expect(data[0].nomeCanal).toBe('iFood');
        });

        const req = httpMock.expectOne('http://localhost:8080/api/dashboard/vendas/por-canal');
        expect(req.request.method).toBe('GET');
        req.flush(mockCanais);
    });

    // ========================================
    // TESTE: Tratamento de Erros
    // ========================================

    it('deve lidar com erro da API', () => {
        const errorMessage = 'Erro ao buscar dados';

        service.getResumoCompleto().subscribe({
            next: () => fail('Deveria ter falhado'),
            error: (error) => {
                // O erro vem como Error com message
                expect(error).toBeTruthy();
                expect(error.message).toContain('Erro'); // Verifica se tem palavra "Erro"
            }
        });

        const req = httpMock.expectOne('http://localhost:8080/api/dashboard/resumo');

        // Simular erro HTTP 500
        req.flush(
            { message: errorMessage },
            { status: 500, statusText: 'Internal Server Error' }
        );
    });

    it('deve lidar com erro de rede', () => {
        service.getResumoCompleto().subscribe({
            next: () => fail('Deveria ter falhado'),
            error: (error) => {
                expect(error).toBeTruthy();
                expect(error.message).toBeTruthy();
            }
        });

        const req = httpMock.expectOne('http://localhost:8080/api/dashboard/resumo');

        // Simular erro de rede
        req.error(
            new ProgressEvent('error'),
            { status: 0, statusText: 'Network Error' }
        );
    });

    // ========================================
    // TESTE: Formatação de Datas
    // ========================================

    it('deve formatar datas corretamente para ISO', () => {
        const inicio = new Date('2024-10-15T10:30:00');
        const fim = new Date('2024-10-20T18:45:00');

        service.getResumoCompleto(inicio, fim).subscribe();

        const req = httpMock.expectOne((request) => {
            const inicioParam = request.params.get('inicio');
            const fimParam = request.params.get('fim');

            // Verificar formato ISO
            expect(inicioParam).toContain('2024-10-15T10:30:00');
            expect(fimParam).toContain('2024-10-20T18:45:00');

            return request.url === 'http://localhost:8080/api/dashboard/resumo';
        });

        req.flush({});
    });

    // ========================================
    // TESTE: Parâmetros Opcionais
    // ========================================

    it('deve funcionar sem parâmetros de data', () => {
        service.getResumoCompleto().subscribe();

        const req = httpMock.expectOne((request) => {
            // Não deve ter parâmetros se datas não foram fornecidas
            expect(request.params.keys().length).toBe(0);
            return request.url === 'http://localhost:8080/api/dashboard/resumo';
        });

        req.flush({});
    });

    it('deve aceitar apenas data início', () => {
        const inicio = new Date('2024-10-01');

        service.getResumoCompleto(inicio).subscribe();

        const req = httpMock.expectOne((request) => {
            expect(request.params.has('inicio')).toBe(true);
            expect(request.params.has('fim')).toBe(false);
            return request.url === 'http://localhost:8080/api/dashboard/resumo';
        });

        req.flush({});
    });

    it('deve aceitar apenas data fim', () => {
        const fim = new Date('2024-10-31');

        service.getResumoCompleto(undefined, fim).subscribe();

        const req = httpMock.expectOne((request) => {
            expect(request.params.has('inicio')).toBe(false);
            expect(request.params.has('fim')).toBe(true);
            return request.url === 'http://localhost:8080/api/dashboard/resumo';
        });

        req.flush({});
    });

    // ========================================
    // TESTE: Diferentes Limites
    // ========================================

    it('deve aceitar limite customizado para produtos', () => {
        service.getTopProdutos(undefined, undefined, 20).subscribe();

        const req = httpMock.expectOne((request) => {
            expect(request.params.get('limit')).toBe('20');
            return request.url === 'http://localhost:8080/api/dashboard/produtos/top';
        });

        req.flush([]);
    });

    it('deve usar limite padrão 10 para produtos', () => {
        service.getTopProdutos().subscribe();

        const req = httpMock.expectOne((request) => {
            expect(request.params.get('limit')).toBe('10');
            return request.url === 'http://localhost:8080/api/dashboard/produtos/top';
        });

        req.flush([]);
    });
});