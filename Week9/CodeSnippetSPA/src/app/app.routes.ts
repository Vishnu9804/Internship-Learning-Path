import { Routes } from '@angular/router';
import { Login } from './Components/login/login';
import { Signup } from './Components/signup/signup';
import { NotFound } from './Components/not-found/not-found';
import { About } from './Components/about/about';
import { CreateSnippet } from './Components/create-snippet/create-snippet';
import { Home } from './Components/home/home';
import { ViewSnippet } from './Components/view-snippet/view-snippet';

export const routes: Routes = [
    {path: "login", component: Login},
    {path: "signup", component:Signup},
    {path: "snippet/:id", component:ViewSnippet},
    {path: "about", loadComponent: () => import("./Components/about/about").then(mod => mod.About)},
    {path:"create", component:CreateSnippet},
    {path: "", component:Home},
    {path:"**", component:NotFound}
];
