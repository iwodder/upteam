import {Component, Input, OnInit} from '@angular/core';
import {User} from "../model/user";
import {UserService} from "../user.service";

@Component({
  selector: 'app-userdetails',
  templateUrl: './userdetails.component.html',
  styleUrls: ['./userdetails.component.css']
})
export class UserdetailsComponent implements OnInit {

  @Input() user: User | undefined;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
  }

  getInterests() {
    this.userService.getInterests(this.user.id);
  }

}
