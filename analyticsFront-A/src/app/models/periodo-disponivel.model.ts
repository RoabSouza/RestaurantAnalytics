// Representa o período de dados disponível no sistema
export interface PeriodoDisponivel {
    dataMinima: string;  // Data mais antiga com dados disponíveis
    dataMaxima: string;  // Data mais recente com dados disponíveis
}