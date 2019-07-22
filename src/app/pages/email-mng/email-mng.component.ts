import { Component, OnInit } from '@angular/core';
import { ContactService } from 'src/app/services/contact.service';
import { ContactModel } from 'src/app/models/contact-model';
import { MatDialogRef, MatDialog } from '@angular/material';
import { PopEmailComponent } from './pop-email/pop-email.component';

@Component({
  selector: 'app-email-mng',
  templateUrl: './email-mng.component.html',
  styleUrls: ['./email-mng.component.css']
})
export class EmailMngComponent implements OnInit {

  emailList : ContactModel[];
  viewEmail : ContactModel[];
  dialogRef : MatDialogRef<PopEmailComponent>;

  constructor(private servContact : ContactService, public dialog : MatDialog ) { }

  ngOnInit() {
    let cc = this.servContact.getConectContact();
    cc.snapshotChanges().subscribe(item => {
     this.emailList = [];
     this.viewEmail = [];
     item.forEach( element =>{
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

  openViewMsg(item : ContactModel, flagModel : boolean){
    if(flagModel){
      this.servContact.updateMessageStatus(item);
    } 

    sessionStorage.setItem('title', item.title);
    sessionStorage.setItem('comment', item.alltext);
    sessionStorage.setItem('email', item.mail);
    sessionStorage.setItem('daySend', item.day.toString());

    this.dialogRef = this.dialog.open(PopEmailComponent,{
      width: '800px',
      height: '30rem',
    });
  }

}
