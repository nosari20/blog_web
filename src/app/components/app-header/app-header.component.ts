import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.css'],
  host: {'[class.md-primary]':'true', '[class.md-background]':'true', '[class.push]':'_fixed', '(window:scroll)': 'track($event)'}
})
export class AppHeaderComponent implements OnInit {
  private _fixed:boolean = false;
  private _value:number = 65;

  constructor() { }

  ngOnInit() {
  }

  toggleFixedBar(state:boolean){
    this._fixed = state;
  }

  track(e) {
    var doc = document, w = window;
    var x, y, docEl;
    if (this._value != 0) {
      if (typeof w.pageYOffset === 'number') {
        y = w.pageYOffset;
      } else {
        docEl = (doc.compatMode && doc.compatMode === 'CSS1Compat') ? doc.documentElement : doc.body;
        y = docEl.scrollTop;
      }
      if ((y > this._value)) {
        this._fixed = true;
      } else {
        this._fixed = false;
      }
    }
  }
}
