import {Component, OnInit} from "@angular/core";
import {Router} from "@angular/router";

@Component({
    selector: "app-header",
    template: require("./header.html")
})

export class HeaderComponent implements OnInit {

    constructor() {}

    ngOnInit () {    
    }

    signOut () {
    }

}