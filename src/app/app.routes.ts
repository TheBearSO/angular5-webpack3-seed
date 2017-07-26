import { Routes } from "@angular/router";
import { UserComponent } from "./components/user/user.component";

export const appRoutes: Routes = [
    {
        path: '', 
        redirectTo: '/users', //Default routing
        pathMatch: 'full'
    },
    {
        path: 'users',
        component: UserComponent
    }
];