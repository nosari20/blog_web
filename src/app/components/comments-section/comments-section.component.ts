import { BlogService } from './../../services/blog/blog.service';
import { Comment } from './../../services/blog/comment';
import { Component, OnInit, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'comments-section',
  templateUrl: './comments-section.component.html',
  styleUrls: ['./comments-section.component.css']
})
export class CommentsSectionComponent implements OnInit, OnChanges {

  @Input() postid: number;

  private comments: Comment[];
  private loading: boolean;

  constructor(
    private blogService :BlogService
  ) {}

  ngOnInit() {
  }

  ngOnChanges(){
      this.getComments();
  }

  getComments(){
    this.loading = true;
    this.blogService
        .getComments(this.postid)
        .then(comments => {this.comments = comments;this.loading = false;})
        .catch(this.handleError);
  }

  handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }

}
