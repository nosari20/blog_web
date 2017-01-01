import { Component, OnInit, ElementRef, AfterViewInit, Input } from '@angular/core';
import * as marked from 'marked';

@Component({
  selector: 'markdown',
  templateUrl: './markdown.component.html',
  styleUrls: ['./markdown.component.css']
})
export class MarkdownComponent implements OnInit, AfterViewInit {

  @Input() _raw: string;
  private _marked: string;
  constructor(private el: ElementRef) { }

  ngOnInit() {
    
  }

  ngAfterViewInit() {
    if(!this._raw)
    this.fromContent();
  }

  fromContent(){
    this._raw = this.el.nativeElement.innerHTML;
    this.transform();
  }
  prepare() {
    this._raw = ''+this._raw.split('\\n').map((line) => line.trim()).join('\n');
  }
  transform(){
    this.prepare();
    marked(this._raw,function(err,content){
      this._marked = content;
      this.setContent();
    }.bind(this));
    
  }
  setContent(content){
    this.el.nativeElement.innerHTML = this._marked;
  }

}
