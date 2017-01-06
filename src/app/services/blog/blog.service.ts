import { Category } from './category';
import { Comment } from './comment';
import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise'
import {Post} from './post';

const API_URL = 'http://blog/public/api/v1';

@Injectable()
export class BlogService {
  private headers = new Headers({'Content-Type': 'application/json'});

  private cache: any = {}

  constructor(private http: Http) { }

  getCategories(): Promise<Category[]> {
    return this.http.get(API_URL+'/categories')
               .toPromise()
               .then(response => response.json() as Category[]);
  }

  getPosts(offset: number = 0, limit: number = null, category: number|string = null): Promise<Post[]> {

    let params = '?';
    params += 'offset='+offset+'&';
    if(limit){
      params += 'limit='+limit+'&';
    }
    if(category){
      params += 'category='+category+'&';
    }
    return this.http.get(API_URL+'/posts'+params)
               .toPromise()
               .then(response => response.json() as Post[]);
  }

  getPost(id: number|string): Promise<Post> {
    if(this.cache[id]){
      return Promise.resolve(this.cache[id]);
    }else{
      return this.http.get(API_URL+'/posts/'+id)
                .toPromise()
                .then(response => {
                  let post = response.json() as Post;
                  this.cache[post.id] = post;
                  this.cache[post.sluged_title] = post;
                  return post
                });
    }
  }

  getComments(id: number): Promise<Comment[]> {
    return this.http.get(API_URL+'/posts/'+id+'/comments')
              .toPromise()
              .then(response =>response.json() as Comment[]);
  }

  postComment(id: number, comment: Comment) {
    return this.http
      .post(API_URL+'/posts/'+id+'/comments', JSON.stringify(comment), {headers: this.headers})
      .toPromise()
      .then(res => res.json().data);
  }










  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }

}
