import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Router, RouterModule } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";

import { UserComponent } from "./user/user.component";

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        RouterModule
    ],
    declarations: [
        UserComponent,
    ],
    bootstrap: [],
    providers: [],
    exports: []
})
export class ComponentModule { }