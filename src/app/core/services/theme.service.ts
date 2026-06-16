import {
  Injectable,
  signal,
  inject,
  PLATFORM_ID
} from '@angular/core';

import { isPlatformBrowser }
from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  private platformId = inject(PLATFORM_ID);
  isDarkMode = signal(true);

  constructor() {
    this.loadTheme();
  }
toggleTheme() {

  if (!isPlatformBrowser(this.platformId)) {
    return;
  }

  const next =
    !this.isDarkMode();

  this.isDarkMode.set(next);

  if (next) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }

  localStorage.setItem(
    'theme',
    next ? 'dark' : 'light'
  );
}

  private loadTheme() {

  if (!isPlatformBrowser(this.platformId)) {
    return;
  }

  const saved =
    localStorage.getItem('theme');

  const dark =
    saved !== 'light';

  this.isDarkMode.set(dark);

  if (dark) {
    document.documentElement.classList.add('dark');
  }
}
}