import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { CommentsComponent } from './comments/comments.component';
import { VoteButtonsComponent } from './vote-buttons/vote-buttons.component';
import { WriteCommentComponent } from './write-comment/write-comment.component';

@NgModule({
  declarations: [AppComponent, CommentsComponent, VoteButtonsComponent, WriteCommentComponent],
  imports: [BrowserModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
