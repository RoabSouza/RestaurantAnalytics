// Representa a estrutura padrão de erro retornada pela API
export interface ErrorResponse {
    timestamp: string;    // Data e hora em que o erro ocorreu
    status: number;       // Código HTTP do erro (400, 404, 500, etc.)
    error: string;        // Tipo do erro (Bad Request, Not Found, etc.)
    message: string;      // Mensagem descritiva do erro
    path: string;         // Caminho da API que gerou o erro
}