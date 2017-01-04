import { Comment } from './comment';
import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise'
import {Post} from './post';

const API_URL = 'http://blog/public/api/v1';

@Injectable()
export class BlogService {

  private cache: any = {}

  constructor(private http: Http) { }

  getPosts(offset: number= 0, limit: number = null): Promise<Post[]> {

    let params = '?';
    params += 'offset='+offset+'&';
    if(limit){
      params += 'limit='+limit+'&';
    }
    return this.http.get(API_URL+'/posts'+params)
               .toPromise()
               .then(response => response.json() as Post[]);
  }

  getPost(id:number): Promise<Post> {
    if(this.cache[id]){
      return Promise.resolve(this.cache[id]);
    }else{
      return this.http.get(API_URL+'/posts/'+id)
                .toPromise()
                .then(response => {
                  let post = response.json() as Post;
                  this.cache[post.id] = post;
                  return post
                });
    }
  }

  getComments(id:number): Promise<Comment[]> {
    return this.http.get(API_URL+'/posts/'+id+'/comments')
              .toPromise()
              .then(response =>response.json() as Comment[]);
  }










  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }

}
