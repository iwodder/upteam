import {Component, Input, OnInit} from '@angular/core';
import {User} from "../model/user";

@Component({
  selector: 'app-user-search-results',
  templateUrl: './user-search-results.component.html',
  styleUrls: ['./user-search-results.component.css']
})
export class UserSearchResultsComponent implements OnInit {

  @Input() users: Array<User> = []

  constructor() { }

  ngOnInit(): void {
  }

}
