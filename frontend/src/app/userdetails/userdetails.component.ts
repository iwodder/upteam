import {Component, Input, OnInit} from '@angular/core';
import {User} from "../model/user";
import {UserService} from "../user.service";
import {Interest} from "../model/interest";
import {Level} from "../model/level";

@Component({
  selector: 'app-userdetails',
  templateUrl: './userdetails.component.html',
  styleUrls: ['./userdetails.component.css']
})
export class UserdetailsComponent implements OnInit {

  @Input() user: User | undefined;
  retrieved: boolean = false;
  isCollapsed: boolean = true;
  levels: Array<Level> = []
  hideAdd: boolean = true;

  constructor(private userService: UserService) {
  }

  ngOnInit(): void {
    this.userService.getLevels()
      .subscribe((data) => {
        data.forEach(d => this.levels.push(new Level(d)))
      })
  }

  addInterest(): void {
    this.hideAdd = false;
  }

  interest(): Interest {
    return new Interest({language: "", level: ""})
  }

  deleted(id: number): void {
    if (this.user) {
      let interest = this.user.interest
      let idx: number = interest.findIndex(v => v.id === id);
      interest.splice(idx, 1);
    }
  }
}
