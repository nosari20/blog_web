import { BlogService } from './services/blog/blog.service';
import { CustomReuseStrategy } from './app.reusestrategy';
import { RouteReuseStrategy } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes }   from '@angular/router';
import { MaterialModule } from '@angular/material';
import { LOCALE_ID } from '@angular/core';

import { AppComponent } from './app.component';
import { AppHeaderComponent } from './components/app-header/app-header.component';
import { AppHeaderTopComponent } from './components/app-header/app-header-top/app-header-top.component';
import { AppHeaderLinkComponent } from './components/app-header/app-header-link/app-header-link.component';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { AppFooterComponent } from './components/app-footer/app-footer.component';
import { AppFooterItemComponent } from './components/app-footer/app-footer-item/app-footer-item.component';
import { LoaderComponent } from './components/loader/loader.component';
import { PostComponent } from './components/post/post.component';
import { MarkdownComponent } from './components/markdown/markdown.component';
import { PostDetailsComponent } from './pages/post-details/post-details.component';

const appRoutes: Routes = [
 { path: '', component: HomeComponent },
 { path: 'about', component: AboutComponent },

 { path: 'posts/:id', component: PostDetailsComponent },

 { path: '404', component: NotFoundComponent },
 { path: '**', redirectTo: '404', },
];

@NgModule({
  declarations: [
    AppComponent,
    //Header
    AppHeaderComponent,
    AppHeaderTopComponent,
    AppHeaderLinkComponent,
    HomeComponent,
    AboutComponent,
    NotFoundComponent,
    AppFooterComponent,
    AppFooterItemComponent,
    LoaderComponent,
    PostComponent,
    MarkdownComponent,
    PostDetailsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
    MaterialModule.forRoot(),
  ],
  providers: [
    {provide: LOCALE_ID, useValue: "fr-FR"},
    {provide: RouteReuseStrategy, useClass: CustomReuseStrategy},
    BlogService,
  ],
  bootstrap: [AppComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule { }
