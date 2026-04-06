import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private themeSubject = new BehaviorSubject<string>('light');
  theme$ = this.themeSubject.asObservable();

  constructor(
    @Inject(DOCUMENT) private document: Document,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.loadTheme();
  }

  toggleTheme() {
    const newTheme = this.themeSubject.value === 'light' ? 'dark' : 'light';
    this.setTheme(newTheme);
  }

  private setTheme(theme: string) {
    this.themeSubject.next(theme);
    
    // Save to localStorage so it survives a page refresh
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('user-theme', theme);
    }

    // Apply the CSS class to the HTML document
    if (theme === 'dark') {
      this.document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      this.document.documentElement.removeAttribute('data-theme');
    }
  }

  private loadTheme() {
    // Check localStorage when the app boots up
    if (isPlatformBrowser(this.platformId)) {
      const savedTheme = localStorage.getItem('user-theme') || 'light';
      this.setTheme(savedTheme);
    }
  }
}