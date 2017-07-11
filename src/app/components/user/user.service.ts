import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { User } from './user';

@Injectable()
export class UserService {

  constructor(
    private http: Http
  ) { }

  getAll(): Promise<Array<User>> {
    return this.http.get('https://jsonplaceholder.typicode.com/users')
      .toPromise()
      .then(response => response.json())
      .catch(error => error);
  }

}