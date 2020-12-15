import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
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
  @Output() foundUsers: EventEmitter<Array<User>> = new EventEmitter<Array<User>>();
  retrieved: boolean = false;
  isCollapsed: boolean = true;
  levels: Array<Level> = []
  languages: Array<String> = []
  hideAdd: boolean = true;
  searchLang: String = ""

  constructor(private userService: UserService) {
  }

  ngOnInit(): void {
    this.userService.getLevels()
      .subscribe((data) => {
        data.forEach(d => this.levels.push(new Level(d)))
      })
    this.userService.getLanguages().subscribe(data => {
      data.forEach(s => this.languages.push(s))
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

  addNewInterest(interest: Interest) {
    if (this.user) {
      this.user.interest.push(interest)
    }
  }

  search(): void {
    this.userService.searchByLanguage(this.searchLang)
      .subscribe(data => {
        let results: Array<User> = [];
        data.forEach(i => results.push(new User(i)));
        this.foundUsers.emit(results);
      })
  }
}
