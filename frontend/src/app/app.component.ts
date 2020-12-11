import { Component } from '@angular/core';
import {LoginComponent} from "./login/login.component";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {User} from "./model/user"

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Upteam';

  user: User | undefined;

  constructor(
    private modalService: NgbModal) {
  }

  showLogin(): void {
    const modalRef = this.modalService.open(LoginComponent);
    modalRef.result.then(r => {
      this.user = new User(r);
    })
  }

}

