import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-pop-email-web',
  templateUrl: './pop-email-web.component.html',
  styleUrls: ['./pop-email-web.component.css']
})
export class PopEmailWebComponent implements OnInit {


  titleWeb: string;
  commentWeb: string;
  emailWeb: string;
  daySendWeb: number;

  constructor(public dialogRef : MatDialogRef<PopEmailWebComponent>) { 
    dialogRef.disableClose =true;
  }

  ngOnInit() {
    this.titleWeb = sessionStorage.getItem('titleWeb');
    this.commentWeb = sessionStorage.getItem('commentWeb');
    this.emailWeb = sessionStorage.getItem('emailWeb');
    this.daySendWeb =  +sessionStorage.getItem('daySendWeb');
    sessionStorage.clear();
  }

}
