import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MatDialog } from '@angular/material';
import { WebinformationService } from 'src/app/services/webinformation.service';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-pop-web',
  templateUrl: './pop-web.component.html',
  styleUrls: ['./pop-web.component.css']
})
export class PopWebComponent implements OnInit {

  constructor(public dialogRef : MatDialogRef<PopWebComponent>, 
               public servics : WebinformationService) {}

  ngOnInit() {
      this.servics.getInformation();
  }

  onSaveDataWebAndupdate(form: NgForm){
     if(form.value.$key == undefined){
          this.servics.insertAllInformation(form.value);
     }else{
          this.servics.updateDataInformation(form.value);
     }
     this.onCloseDialog(form);
  }

  onCloseDialog( form? : NgForm): void {
    this.resetForm(form);
    this.dialogRef.close();
  }

  resetForm(form? : NgForm)
  {
    if(form != null)
      form.reset();
    this.servics.listInform = {
      $key : null,
      title : '',
      alltext : '',
      urlImg: '',
      day : Date.now(),
    }
  }

}
