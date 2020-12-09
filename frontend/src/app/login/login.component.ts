import { Component, OnInit } from '@angular/core';
import {Login} from "./login";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import { UserService } from "../user.service";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  model: Login = new Login("", "");
  submitted: boolean = false;
  valid: boolean = false;
  msg: string = ""

  constructor(public activeModal: NgbActiveModal, private userService: UserService) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    this.submitted=true;
    this.userService.login(this.model, (user: any) => {
      this.msg = "Logging you in";
      this.activeModal.close(user);
    },
      (err: HttpErrorResponse) => {
      if (err.status >= 400 && err.status < 500) {
        this.msg = "Invalid username or password supplied."
        this.submitted = false;
      } else {
        this.msg = "Unable to log in at this time, please try again later.";
      }
    });
  }
}
