import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-pop-email',
  templateUrl: './pop-email.component.html',
  styleUrls: ['./pop-email.component.css']
})
export class PopEmailComponent implements OnInit {
  
  title: string;
  comment: string;
  email: string;
  daySend: number;

  constructor(public dialogRef : MatDialogRef<PopEmailComponent>) { }

  ngOnInit() {
    this.title = sessionStorage.getItem('title');
    this.comment = sessionStorage.getItem('comment');
    this.email = sessionStorage.getItem('email');
    this.daySend =  +sessionStorage.getItem('daySend');
    sessionStorage.clear();
  }

}
