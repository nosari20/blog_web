import { Component, OnInit } from '@angular/core';
import { BlogService } from './../../services/blog/blog.service';
import { Post } from './../../services/blog/post';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {

  posts : Post[] = [];
  loading : boolean = false;


  constructor(private blogService: BlogService,) { }


  ngOnInit() {
    this.getPosts(this.posts.length);
  }

  getPosts(offset : number){
    this.loading = true;
    this.blogService
        .getPosts(offset,5)
        .then(posts => {this.posts = this.posts.concat(posts);this.loading = false;})
        .catch(this.handleError);
  }

  handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }


}
