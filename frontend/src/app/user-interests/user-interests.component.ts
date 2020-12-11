import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
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
  @Output() deleted: EventEmitter<number> = new EventEmitter<number>();

  isEdit: boolean = false;
  btnText: string = "Edit"

  constructor(private userService: UserService) {
  }

  ngOnInit(): void {
  }

  editOrCancel(): void {
    this.isEdit = !this.isEdit;
    this.btnText = this.isEdit ? "Cancel" : "Edit";
  }

  save(): void {
    if (this.interest) {
      this.isEdit = false;
      this.userService.editInterest(this.userId, this.interest)
        .subscribe((res) => {
          //TODO: Handle success
        }, error => {
          //TODO: Popup error msg
          console.log(error);
        })
    }
  }

  delete(): void {
    if (this.interest) {
      this.userService
        .deleteInterest(this.userId, this.interest)
      this.deleted.emit(this.interest.id);
    }
  }
}
