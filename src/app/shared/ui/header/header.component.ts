import { Component, inject } from '@angular/core';
import { ThemeService } from '../../../core/services/theme.service';

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html'
})
export class HeaderComponent {

  themeService =
    inject(ThemeService);

  toggleTheme() {
    this.themeService.toggleTheme();
  }
}