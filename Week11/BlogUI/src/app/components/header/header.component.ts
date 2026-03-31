import { Component } from '@angular/core';
import { ThemeService } from '../../services/theme.service';
import { AsyncPipe } from '@angular/common'; 
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [RouterModule, AsyncPipe], 
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  constructor(public themeService: ThemeService) {}

  toggle() {
    this.themeService.toggleTheme();
  }
}