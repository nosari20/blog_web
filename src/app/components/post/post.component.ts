import { Router } from '@angular/router';
import { BlogService } from './../../services/blog/blog.service';
import { Post } from './../../services/blog/post';
import { Component, OnInit,OnChanges, Input } from '@angular/core';

@Component({
  selector: 'post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css'],
  host: {'[class.preview]':'preview'},
})
export class PostComponent implements OnInit, OnChanges {

  @Input() postInput : Post;
  @Input() preview : boolean = false;
  @Input() postid : number;
  post : Post;
  loading : boolean = false;

  constructor(
    private blogService: BlogService,
    private router: Router
  ) { }

  ngOnInit() {
    
  }
  
  ngOnChanges(){
    if(!this.postInput && this.postid){
      this.getPost();
    }else{
      this.post = this.postInput;
    }
    document.body.scrollTop = 0;
  }  

  getPost(){
    this.loading = true;
    this.blogService
        .getPost(this.postid)
        .then(post => {this.post = post;this.loading = false;})
        .catch(this.handleError);
  }

  handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }

}
