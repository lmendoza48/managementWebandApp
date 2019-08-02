import { Component, OnInit, Inject } from '@angular/core';
import { AppInformationService } from 'src/app/services/app.information.service';
import { NgForm } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-pop-app',
  templateUrl: './pop-app.component.html',
  styleUrls: ['./pop-app.component.css']
})
export class PopAppComponent implements OnInit {

  constructor(public servicesAPP : AppInformationService, 
              public dialogRef :  MatDialogRef<PopAppComponent>) { }

  ngOnInit() {
    this.servicesAPP.getConectListApp();
  }

  onSaveDataAPPAndupdate(form : NgForm){
     if(form.value.$key === undefined){
      this.servicesAPP.saveDataApp(form.value);
     }else{
      this.servicesAPP.updateDataApp(form.value);
     }
     this.onCloseDialogApp(form);
  }

  onCloseDialogApp(form? : NgForm){
    this.resetForm(form);
    this.dialogRef.close();
  }

  resetForm(form? : NgForm)
  {
    if(form != null)
      form.reset();
    this.servicesAPP.dataApp = {
      $key : null,
      titleApp : '',
      urlImgApp : '',
      contentApp : '',
      dayApp :  Date.now(),
      monthApp : '',
    }
  }

}
