import { Routes } from "@angular/router";
import { UserComponent } from "./components/user/user.component";

export const appRoutes: Routes = [
    {
        path: '', //DEfault routing
        component: UserComponent
    }
];