import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeService } from '../../services/theme.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-theme-toggle',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './theme-toggle.component.html',
  styleUrls: ['./theme-toggle.component.scss']
})
export class ThemeToggleComponent {
  
  // Observable que indica se o tema atual é escuro
  isDark$!: Observable<boolean>;

  constructor(public themeService: ThemeService) {
    // Inicializa o observable com o serviço de tema
    this.isDark$ = this.themeService.isDark$;
  }
  
  // Alterna entre tema claro e escuro
  toggle(): void {
    this.themeService.toggleTheme();
  }
}