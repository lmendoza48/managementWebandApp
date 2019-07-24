import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { MngContactappService } from 'src/app/services/mng-contactapp.service';

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
  flagAns : boolean = true;
  key: string;
  contenidoD = {
    answerApp : ''
  };

  constructor(public dialogRef : MatDialogRef<PopEmailComponent>, public serv : MngContactappService) { }

  ngOnInit() {
    this.serv.getAllDataContactApp();
    this.title = sessionStorage.getItem('title');
    this.comment = sessionStorage.getItem('comment');
    this.email = sessionStorage.getItem('email');
    this.daySend =  +sessionStorage.getItem('daySend');
    this.key = sessionStorage.getItem('key');
    let asn =  sessionStorage.getItem('answerAp');
    if(asn != null){
      this.contenidoD.answerApp = asn;
    } 
    sessionStorage.clear();
  }

  onSendAnswer(flag:boolean){
     this.flagAns = flag;
     if(flag){
      this.serv.saveAnswerDatos(false, this.contenidoD.answerApp, this.key);
      this.bntClosePopUp();  
     } 
  }

  bntClosePopUp(){
    this.dialogRef.close();
  }

}
