import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs/Rx';

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.css']
})
export class PostDetailsComponent implements OnInit {

private sub: Subscription;  
  private id: number
  private scrollPos: number = 0;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.scrollPos = 0;

      this.id = +params['id'];
    });

  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
