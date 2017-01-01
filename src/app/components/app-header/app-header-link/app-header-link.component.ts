import { Component, OnInit, Input } from '@angular/core';
import {Router, RouterModule }   from '@angular/router';


@Component({
  selector: 'app-header-link',
  templateUrl: './app-header-link.component.html',
  styleUrls: ['./app-header-link.component.css'],
  host:     {'[class.active]':'isActiveRoute()','[class.md-primary]':'true'},
})
export class AppHeaderLinkComponent implements OnInit {

  @Input() _href: string = '/';
  @Input() _underliner_class: string = ''

  constructor(private _router: Router) {}

  ngOnInit() {
  }

  isActiveRoute() {
    return this._router.isActive(this._href, true);
  }

}
