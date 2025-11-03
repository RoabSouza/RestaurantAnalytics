import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  
  // Chave para salvar no localStorage
  private readonly THEME_KEY = 'app-theme';
  
  // Controla o estado do tema (dark/light)
  private isDarkSubject = new BehaviorSubject<boolean>(false);
  
  // Observable para componentes se inscreverem
  public isDark$: Observable<boolean> = this.isDarkSubject.asObservable();
  
  constructor() {
    // Carrega o tema salvo ou detecta preferência do sistema
    this.initializeTheme();
  }
  
  // Carrega o tema do localStorage ou detecta do sistema
  private initializeTheme(): void {
    const savedTheme = localStorage.getItem(this.THEME_KEY);
    
    if (savedTheme !== null) {
      // Usa o tema que estava salvo
      const isDark = savedTheme === 'dark';
      this.applyTheme(isDark);
    } else {
      // Detecta se o sistema prefere tema escuro
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      this.applyTheme(prefersDark);
    }
  }
  
  // Alterna entre tema claro e escuro
  toggleTheme(): void {
    const newTheme = !this.isDarkSubject.value;
    this.applyTheme(newTheme);
    this.saveTheme(newTheme);
  }
  
  // Aplica o tema adicionando/removendo a classe no body
  private applyTheme(isDark: boolean): void {
    if (isDark) {
      document.body.classList.add('dark-theme');
    } else {
      document.body.classList.remove('dark-theme');
    }
    
    this.isDarkSubject.next(isDark);
  }
  
  // Salva a preferência no localStorage
  private saveTheme(isDark: boolean): void {
    localStorage.setItem(this.THEME_KEY, isDark ? 'dark' : 'light');
  }
  
  // Retorna o estado atual do tema
  get isDark(): boolean {
    return this.isDarkSubject.value;
  }
}