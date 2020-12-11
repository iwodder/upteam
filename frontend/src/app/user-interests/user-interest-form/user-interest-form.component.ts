import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {Interest} from "../../model/interest";
import {Level} from "../../model/level";
import {UserService} from "../../user.service";


@Component({
  selector: 'app-user-interest-form',
  templateUrl: './user-interest-form.component.html',
  styleUrls: ['./user-interest-form.component.css']
})
export class UserInterestFormComponent implements OnInit {

  @Input() userId: number = 0;
  @Input() levels: Array<Level> = []
  @Output() cancelled = new EventEmitter<boolean>();
  @Output() newInterest = new EventEmitter<Interest>();

  interest: Interest = new Interest({language: "", level: ""});

  constructor(private userService: UserService) { }

  ngOnInit(): void {
  }

  save() {
    this.userService.addInterest(this.userId, this.interest)
      .subscribe((res) => {
        this.newInterest.emit(new Interest(res))
      } )
  }

  cancel() {
    this.cancelled.emit(true);
  }
}
