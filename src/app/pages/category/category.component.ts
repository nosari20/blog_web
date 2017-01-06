import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { Post } from './../../services/blog/post';
import { BlogService } from './../../services/blog/blog.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  private posts : Post[] = [];
  private loading : boolean = false;
  private sub: Subscription;
  private category: number|string;

  constructor(
    private blogService: BlogService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.category = params['slug'];
      this.getPosts(0);
    });
  }

  getPosts(offset: number, change:boolean = true){
    this.loading = true;
    this.blogService
        .getPosts(offset,5,this.category)
        .then(posts => {          
          if(change){
            this.posts = posts;
          }else{
            this.posts = this.posts.concat(posts);
          }
          this.loading = false;
        })
        .catch(this.handleError);
  }

  handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }


}
