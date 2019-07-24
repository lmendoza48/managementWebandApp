import { Component, OnInit } from '@angular/core';
import { ContactServiceWeb } from 'src/app/services/contact-web.service';
import { ContactModel } from 'src/app/models/contact-model';
import { MatDialogRef, MatDialog } from '@angular/material';
import { PopEmailComponent } from './pop-email/pop-email.component';
import { AppInformationService } from 'src/app/services/app.information.service';
import { MngContactappService } from 'src/app/services/mng-contactapp.service';

@Component({
  selector: 'app-email-mng',
  templateUrl: './email-mng.component.html',
  styleUrls: ['./email-mng.component.css']
})
export class EmailMngComponent implements OnInit {

  emailList : ContactModel[];
  viewEmail : ContactModel[];
  dialogRef : MatDialogRef<PopEmailComponent>;

  constructor(private servContact : MngContactappService, 
              public dialog : MatDialog,
              public servTemas : AppInformationService ) { }

  ngOnInit() {
    let msg = this.servContact.getAllDataContactApp();
    msg.snapshotChanges().subscribe( msgList =>{
      this.emailList = [];
      this.viewEmail = [];
      msgList.forEach( element =>{
        let y = element.payload.toJSON();
        y["$key"] = element.key;
        if(y["flag"] === true){
          this.emailList.push(y as ContactModel);
        }else{
          this.viewEmail.push(y as ContactModel);
        }
      });
    });
  }

  openViewMsg(item : ContactModel, viewFlag? : boolean){
    sessionStorage.setItem('title', item.title);
    sessionStorage.setItem('comment', item.alltext);
    sessionStorage.setItem('email', item.mail);
    sessionStorage.setItem('daySend', item.day.toString());
    sessionStorage.setItem('key', item.$key);
    if(!viewFlag){
      sessionStorage.setItem('answerAp', item.answer);
    }
    this.dialogRef = this.dialog.open(PopEmailComponent,{
      width: '800px',
      height: '30rem',
    });
  }

  /**
   * logica para otros casos 
    let info = this.servTemas.getConectListApp();
    info.snapshotChanges().subscribe(info =>{
      info.forEach( item=>{
         let dat = item.payload.toJSON();
         let tem = dat["title"];
         let msg = this.servContact.getAllDataContactApp(tem);
          msg.snapshotChanges().subscribe( msgList =>{
            this.emailList = [];
            this.viewEmail = [];
            msgList.forEach( element =>{
              let y = element.payload.toJSON();
              y["$key"] = element.key;
              if(y["flag"] === true){
                this.emailList.push(y as ContactModel);
              }else{
                this.viewEmail.push(y as ContactModel);
              }
          });
        });
      });
    });
   */

}
