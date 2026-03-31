import { Routes } from '@angular/router';
import { BlogListComponent } from './components/blog-list/blog-list.component';
import { BlogDetailComponent } from './components/blog-details/blog-details.component';

export const routes: Routes = [
  { path: '', component: BlogListComponent },
  { path: 'post/:id', component: BlogDetailComponent },
  { path: '**', redirectTo: '' } 
];