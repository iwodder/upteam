import {Component, OnInit} from '@angular/core';
import {LoginComponent} from "./login/login.component";
import {NgbModal, NgbModalRef} from "@ng-bootstrap/ng-bootstrap";
import {User} from "./model/user"

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Upteam';

  user: User | undefined;
  loginOpen: boolean = false;
  modalRef: NgbModalRef | undefined;
  foundUsers: Array<User> = []

  constructor(
    private modalService: NgbModal) {
  }

  showLogin(): void {
    if (this.user) {
      this.logout();
    }
    if (!this.loginOpen) {
      this.loginOpen = true;
      this.modalRef = this.modalService.open(LoginComponent);
      this.modalRef.result.then(r => {
        this.user = new User(r);
        this.loginOpen = false;
      })
    } else {
      if (this.modalRef) {
        this.loginOpen = false;
        this.modalRef.close()
      }
    }
  }

  found(results: Array<User>): void {
    this.foundUsers = results;
  }

  logout(): void {
    this.user = undefined;
    this.foundUsers.splice(0, this.foundUsers.length);
  }
}

