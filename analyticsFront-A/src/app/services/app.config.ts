import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { routes } from '../app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

// Configuração principal da aplicação Angular
export const appConfig: ApplicationConfig = {
  providers: [
    // Configuração de detecção de mudanças do Angular
    provideZoneChangeDetection({ eventCoalescing: true }),

    // Configura as rotas da aplicação
    provideRouter(routes),

    // Habilita o HttpClient para fazer requisições HTTP
    provideHttpClient(),

    // Habilita animações assíncronas
    provideAnimationsAsync()
  ]
};