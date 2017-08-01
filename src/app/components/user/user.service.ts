import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from "rxjs/Observable";
import { User } from './user';
import "rxjs/add/operator/map";
import 'rxjs/add/operator/share';

@Injectable()
export class UserService {

  constructor(
    private http: Http
  ) { }

  getAll(): Observable<Array<User>> {
    return this.http
      .get('https://jsonplaceholder.typicode.com/users')
      .map((response: Response) => response.json())
      .share();
  }

}