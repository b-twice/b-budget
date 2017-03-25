import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'number-change',
  templateUrl: './number-change.component.html',
  styleUrls: ['./number-change.component.scss']
})

export class NumberChangeComponent implements OnInit {

  @Input() number: number;

  // Up, Down, None
  changeType: string;

  constructor() { }

  ngOnInit() {
    this.setChangeType();
  }

  setChangeType() {
    if (this.number > 0) {
      this.changeType = "up";
    }
    else if (this.number < 0) {
      this.changeType = "down";
    }
    else {
      this.changeType = "none";
    }

  }

}
