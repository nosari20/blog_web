import { Category } from './services/blog/category';
import { BlogService } from './services/blog/blog.service';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  private categories: Category[];
  constructor(
    private blogService: BlogService
  ){}

  ngOnInit(){
    this.getCategories();
  }

  getCategories(){
    this.blogService
          .getCategories()
          .then(categories => {this.categories = categories})
          .catch(this.handleError);
  }

  handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }






}
