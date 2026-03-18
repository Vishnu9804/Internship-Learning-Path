import { Routes } from '@angular/router';
import { Login } from './Components/login/login';
import { Signup } from './Components/signup/signup';
import { NotFound } from './Components/not-found/not-found';
import { About } from './Components/about/about';
import { CreateSnippet } from './Components/create-snippet/create-snippet';

export const routes: Routes = [
    {path: "login", component: Login},
    {path: "signup", component:Signup},
    {path: "", redirectTo:"/login", pathMatch:"full"},
    {path: "about", loadComponent: () => import("./Components/about/about").then(mod => mod.About)},
    {path:"create", component:CreateSnippet},
    {path:"**", component:NotFound}
];
