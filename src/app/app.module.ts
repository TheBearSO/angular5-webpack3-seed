import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Router, RouterModule } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";

import { appRoutes } from "./app.routes";

import { AppComponent } from "./app.component";
import { UserComponent } from "./components/user/user.component";
import { HeaderComponent } from "./shared/header/header.component";

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        RouterModule.forRoot(appRoutes)
    ],
    declarations: [
        HeaderComponent,
        AppComponent,
        UserComponent,
    ],
    bootstrap: [
        AppComponent
    ],
    providers: [
    ]
})
export class AppModule { }