import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {Interest} from "../../model/interest";
import {Level} from "../../model/level";


@Component({
  selector: 'app-user-interest-form',
  templateUrl: './user-interest-form.component.html',
  styleUrls: ['./user-interest-form.component.css']
})
export class UserInterestFormComponent implements OnInit {

  @Input() userId: number = 0;
  @Input() interest: Interest | undefined
  @Input() levels: Array<Level> = []

  @Output() cancelled = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit(): void {
  }

  save() {

  }

  cancel() {
    this.cancelled.emit(true);
  }
}
