import { Component, OnInit } from "@angular/core";
import { UserService } from "./user.service";
import { User } from "./user";

@Component({
    selector: "app-users",
    template: require("./user.html"),
    providers: [UserService]
})
export class UserComponent implements OnInit {

    private users: Array<User> = [];

    constructor(
        private UserService: UserService
    ) { }

    ngOnInit() {
        this.getUsers();
    }

    private getUsers(): void {
        this.UserService.getAll().then( (users: Array<User>) => {
            this.users = users;
        })
    }
}