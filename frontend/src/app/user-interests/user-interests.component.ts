import {Component, Input, OnInit} from '@angular/core';
import {Interest} from "../model/interest";
import {UserService} from "../user.service";
import {Level} from "../model/level";

@Component({
  selector: 'app-user-interests',
  templateUrl: './user-interests.component.html',
  styleUrls: ['./user-interests.component.css']
})
export class UserInterestsComponent implements OnInit {

  @Input() userId: number = 0;
  @Input() interest: Interest | undefined
  @Input() levels: Array<Level> = []
  isEdit: boolean = false;

  constructor(private userService: UserService) {
  }

  ngOnInit(): void {
  }

  edit(): void {
    this.isEdit = true;
  }

  save(): void {
    if (this.interest) {
      this.isEdit = false;
      this.userService.editInterest(this.userId, this.interest)
        .subscribe((res) => {
          if (res.statusCode === 200) {
            console.log("Saved")
          }
        }, error => {
          //TODO: Popup error msg
          console.log(error);
        })
    }
  }
}
