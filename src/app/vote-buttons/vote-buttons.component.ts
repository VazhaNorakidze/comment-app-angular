import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-vote-buttons',
  templateUrl: './vote-buttons.component.html',
  styleUrls: ['./vote-buttons.component.scss'],
})
export class VoteButtonsComponent {
  @Input() score: number = 0;
  @Output() upVote = new EventEmitter();
  @Output() downVote = new EventEmitter();
}
