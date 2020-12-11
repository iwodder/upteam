import {Injectable} from '@angular/core';
import {Login} from "./login/login";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {User} from "./model/user";
import {Interest} from "./model/interest";
import {Observable} from "rxjs";
import {Level} from "./model/level";

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
        ok(data);
      }, err => {
        errfn(err);
      });
  }

  getInterests(id: number): Observable<Array<Interest>> {
    console.log("Getting interests")
    let token = this.getToken();
    httpOpts.headers = httpOpts.headers.set('Authorization', `Bearer ${token}`)
    return this.client.get<Array<Interest>>(
      `/users/${id}/interests`, httpOpts
    )
  }

  editInterest(id: number, interest: Interest): Observable<any> {
    let token = this.getToken();
    httpOpts.headers = httpOpts.headers.set('Authorization', `Bearer ${token}`)
    return this.client.put(
      `/users/${id}/interests`, interest, httpOpts)
  }

  addInterest(id: number, interest: Interest): Observable<any> {
    let token = this.getToken();
    httpOpts.headers = httpOpts.headers.set('Authorization', `Bearer ${token}`)
    return this.client.put(
      `/users/${id}/interests`, interest, httpOpts)
  }

  deleteInterest(userId: number, interest: Interest): void {
    let token = this.getToken();
    httpOpts.headers = httpOpts.headers.set('Authorization', `Bearer ${token}`);
    this.client.delete(
      `/users/${userId}/interests/${interest.id}`, httpOpts
    ).subscribe(value => {
      console.log("success")
    },error => {
      console.log("error")
    });
  }

  getLevels(): Observable<Array<Level>> {
    return this.client.get<Array<Level>>(
      '/levels'
    );
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
      let idx = token.indexOf("=") + 1;
      return token.substring(idx);
    } else {
      return '';
    }
  }
}
