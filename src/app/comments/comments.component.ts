import { Component } from '@angular/core';
import * as data from '../../assets/data.json';

interface Comment {
  id: number;
  content: string;
  createdAt: Date;
  score: number;
  user: {
    image: {
      png: string;
      webp: string;
    };
    username: string;
  };
  replies: Comment[];
}
interface CurrentUser {
  image: {
    png: string;
    webp: string;
  };
  username: string;
}

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss'],
})
export class CommentsComponent {
  constructor() {
    if (localStorage.getItem('localData') == null) {
      localStorage.setItem('localData', JSON.stringify(data));
    }
  }
  ngOnInit() {
    this.updateTimeDifference(this.commentsData);
  }

  localData: any = JSON.parse(localStorage.getItem('localData')!);

  commentsData: Comment[] = this.localData.comments;
  currentUserData: CurrentUser = this.localData.currentUser;
  // imageUrl = 'comment.user.image.png';

  updateTimeDifference(comments: any[]) {
    for (const comment of comments) {
      if (
        !isNaN(Date.parse(comment.createdAt)) &&
        !comment.createdAt.includes('ago')
      ) {
        const currentTime = new Date();
        const createdAt = new Date(comment.createdAt);
        const timeDifference =
          (currentTime.getTime() - createdAt.getTime()) / (1000 * 60);
        const timeDifferenceInMinutes = Math.round(timeDifference);
        comment.createdAt = `${timeDifferenceInMinutes} min ago`;
      } else if (comment.replies) {
        this.updateTimeDifference(comment.replies);
      }
    }
  }

  currentTime = new Date();
  inputComment: string = '';
  addComment() {
    this.commentsData.push({
      id: 0,
      content: this.inputComment,
      createdAt: this.currentTime,
      score: 0,
      user: {
        image: {
          png: '../../assets/' + this.currentUserData.image.png,
          webp: '../../assets/' + this.currentUserData.image.webp,
        },
        username: this.currentUserData.username,
      },
      replies: [],
    });
    // console.log(inputComment);
    this.localData.comments = this.commentsData;
    localStorage.setItem('localData', JSON.stringify(this.localData));
    location.reload();
  }

  sortData(comments: Comment[]) {
    comments.sort((a, b) => b.score - a.score);
    return comments;
  }

  upVote(comment: Comment) {
    comment.score++;
    this.localData.comments = this.commentsData;
    this.commentsData = this.sortData(this.commentsData);
    localStorage.setItem('localData', JSON.stringify(this.localData));
    console.log(new Date());
  }

  downVote(comment: Comment) {
    comment.score--;
    this.localData.comments = this.commentsData;
    this.commentsData = this.sortData(this.commentsData);
    localStorage.setItem('localData', JSON.stringify(this.localData));
  }

  showModal = false;
  modalType: 'comment' | 'reply' = 'comment';
  modalId: number = 0;
  currentComment: any;

  // showDeleteModal(comment: Comment) {
  //   this.showModal = true;
  //   this.currentComment = comment;
  // }

  // deleteComment(comment: Comment) {

  //   let index = this.commentsData.indexOf(comment);
  //   this.commentsData.splice(index, 1);

  //   this.showModal = false;
  //   this.localData.comments = this.commentsData;
  //   localStorage.setItem('localData', JSON.stringify(this.localData));
  // }

  showDeleteModal(type: 'comment' | 'reply', id: number) {
    this.showModal = true;
    this.modalType = type;
    this.modalId = id;
  }
  deleteComment(type: 'comment' | 'reply', id: number) {
    if (type === 'comment') {
      // code to delete the comment from the commentsData array
      let index = this.commentsData.findIndex((c) => c.id === id);
      this.commentsData.splice(index, 1);
    } else if (type === 'reply') {
      // code to delete the reply from the comment
      for (let comment of this.commentsData) {
        let index = comment.replies.findIndex((r) => r.id === id);
        if (index >= 0) {
          comment.replies.splice(index, 1);
          break;
        }
      }
    }
    this.showModal = false;
    this.localData.comments = this.commentsData;
    localStorage.setItem('localData', JSON.stringify(this.localData));
    // call the API to delete the comment or reply
  }

  confirmDelete() {
    this.showModal = false;
    this.deleteComment(this.modalType, this.modalId);
  }
  // showDeleteModal(comment: any) {
  //   this.showModal = true;
  //   this.currentComment = comment;
  // }

  commentEditing: boolean = false;
  updateComment(comment: Comment) {
    comment.content = comment.content;
    this.editingCommentId = null;
    this.localData.comments = this.commentsData;
    localStorage.setItem('localData', JSON.stringify(this.localData));
  }

  editingCommentId: number | null = null;

  showReplyDivId: number | null = null;
  showReplyDiv(comment: Comment) {
    this.showReplyDivId = comment.id;
  }
  replyContent: string = '';

  addReply(comment: Comment) {
    comment.replies.push({
      id: 0,
      content: this.replyContent,
      createdAt: this.currentTime,
      score: 0,
      user: {
        image: {
          png: '../../assets/' + this.currentUserData.image.png,
          webp: '../../assets/' + this.currentUserData.image.webp,
        },
        username: this.currentUserData.username,
      },
      replies: [],
    });
    this.showReplyDivId = null;
    this.localData.comments = this.commentsData;
    localStorage.setItem('localData', JSON.stringify(this.localData));
    location.reload();
  }
}
