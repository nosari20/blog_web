import { BlogService } from './../../../services/blog/blog.service';
import { Comment } from './../../../services/blog/comment';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'add-comment',
  templateUrl: './add-comment.component.html',
  styleUrls: ['./add-comment.component.css']
})
export class AddCommentComponent implements OnInit {

  @Input() postid: number;
  @Output() addCommentEvent = new EventEmitter<Comment>();
  private comment: Comment;
  constructor( private blogService: BlogService) { }

  ngOnInit() {
    this.comment = new Comment();
    this.comment.author = 'Anon-' + Math.floor(Math.random()*1000);
  }

  send(){
    this.addCommentToList();
    this.blogService
        .postComment(this.postid, this.comment)
        .then(()=>{
          this.comment.created_at = new Date().toUTCString();
          
        })
  }

  addCommentToList(){
    this.addCommentEvent.emit(this.comment);
    let newComment = new Comment();
    newComment.author = this.comment.author;
    this.comment = newComment;
  }

}
