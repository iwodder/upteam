import { Injectable } from '@angular/core';
import { Login } from "./login/login";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError, retry } from "rxjs/operators";
import {User} from "./model/user";
import {Interest} from "./model/interest";
import {getToken} from "codelyzer/angular/styles/cssLexer";

const httpOpts = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': ''
  })
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private client: HttpClient) { }

  login(login: Login, ok: any, errfn: any) {
    console.log(login);
    return this.client.post<User>(
      '/users/login', login)
      .subscribe((data) => {
        console.log(JSON.stringify(data));
        ok(data);
      }, err => {
        console.log(err.status)
        errfn(err);
      });
  }

  getInterests(id: number): void {
    console.log("Getting interests")
    let token = this.getToken();
    httpOpts.headers.set('Authorization', `Bearer ${token}`)
    this.client.get<Array<Interest>>(
      `/users/${id}/interests`, httpOpts
    ).subscribe(data => {
      console.log(data)
    })
  }

  private getToken(): string {
    let c = document.cookie;
    let token = c.split(";")
      .find(v => {
        v = v.trim()
        let found = v.startsWith('authtoken')
        return found
      });
    console.log(token)
    if (token) {
      let idx = token.indexOf("=");
      let result = token.substring(++idx);
      return result;
    } else {
      return '';
    }
  }
}
