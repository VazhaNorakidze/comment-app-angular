import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-write-comment',
  templateUrl: './write-comment.component.html',
  styleUrls: ['./write-comment.component.scss'],
})
export class WriteCommentComponent {
  inputComment: string = '';

  @Input() currentUserData: any;
  @Output() addComment = new EventEmitter<any>();
  @Output() commentAdded = new EventEmitter<string>();

  onAddComment() {
    this.commentAdded.emit(this.inputComment);
  }
}
