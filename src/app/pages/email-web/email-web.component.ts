import { Component, OnInit } from '@angular/core';
import { ContactServiceWeb } from 'src/app/services/contact-web.service';
import { ContactModel } from 'src/app/models/contact-model';
import { MatDialog, MatDialogRef } from '@angular/material';
import { PopEmailWebComponent } from './pop-email-web/pop-email-web.component';

@Component({
  selector: 'app-email-web',
  templateUrl: './email-web.component.html',
  styleUrls: ['./email-web.component.css']
})
export class EmailWebComponent implements OnInit {
  
  listWebCct : ContactModel[];
  readWebcct : ContactModel[];
  dialogRef : MatDialogRef<PopEmailWebComponent>;

  constructor(public serviceWeb :  ContactServiceWeb, public dialog : MatDialog) {}

  ngOnInit() {
    let cct = this.serviceWeb.getAllDataContact();
    cct.snapshotChanges().subscribe( webI => {
        this.listWebCct = [];
        webI.forEach( dat => {
          let ccW = dat.payload.toJSON();
          ccW["$key"] = dat.key;
          if(ccW["flag"] === true){
            this.listWebCct.push(ccW as ContactModel);
          }else{
            this.readWebcct.push(ccW as ContactModel)
          }
        });
    });
  }

  openViewMsgWeb(item : ContactModel, flagModel : boolean){
    sessionStorage.setItem('titleWeb', item.title);
    sessionStorage.setItem('commentWeb', item.alltext);
    sessionStorage.setItem('emailWeb', item.mail);
    sessionStorage.setItem('daySendWeb', item.day.toString());
    this.dialogRef = this.dialog.open(PopEmailWebComponent,{
      width: '800px',
      height: '25rem',
    });
  }

}
