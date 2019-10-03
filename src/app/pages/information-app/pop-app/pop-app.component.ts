import { Component, OnInit} from '@angular/core';
import { AppInformationService } from 'src/app/services/app.information.service';
import { NgForm, FormGroup, FormControl } from '@angular/forms';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-pop-app',
  templateUrl: './pop-app.component.html',
  styleUrls: ['./pop-app.component.css']
})
export class PopAppComponent implements OnInit {

  firstFormGroup : FormGroup;
  secondFormGroup : FormGroup;
  thirdFormGroup : FormGroup;

  constructor(public servicesAPP : AppInformationService, 
              public dialogRef :  MatDialogRef<PopAppComponent>) { }

  ngOnInit() {
    this.servicesAPP.getConectListApp();
    if(this.servicesAPP.dataApp == null){

      this.firstFormGroup = new FormGroup({
        $key : new FormControl(''),
        titleTab1 : new FormControl(''),
        UrlTab1 : new FormControl(''),
        contentTab1 : new FormControl('')
  
      });

      this.secondFormGroup = new FormGroup({
        titleTab2 : new FormControl(''),
        urlTab2 : new FormControl(''),
        contentTab2 : new FormControl('')
      });
      
      this.thirdFormGroup = new FormGroup({
        titleTab3 : new FormControl(''),
        urlTab3 : new FormControl(''),
        contentTab3 : new FormControl('')
      });

    }else{

      this.firstFormGroup = new FormGroup({
        $key : new FormControl(this.servicesAPP.dataApp.$key),
        titleTab1 : new FormControl(this.servicesAPP.dataApp.titleTab1),
        urlTab1 : new FormControl(this.servicesAPP.dataApp.urlTab1),
        contentTab1 : new FormControl(this.servicesAPP.dataApp.contentTab1)
      });

      this.secondFormGroup = new FormGroup({
        titleTab2 : new FormControl(this.servicesAPP.dataApp.titleTab2),
        urlTab2 : new FormControl(this.servicesAPP.dataApp.urlTab2),
        contentTab2 : new FormControl(this.servicesAPP.dataApp.contentTab2)
      });

      this.thirdFormGroup = new FormGroup({
        titleTab3 : new FormControl(this.servicesAPP.dataApp.titleTab3),
        urlTab3 : new FormControl(this.servicesAPP.dataApp.urlTab3),
        contentTab3 : new FormControl(this.servicesAPP.dataApp.contentTab3)
      });
    }
  }

  onSaveDataAPPAndupdateTemas(){
    if(this.firstFormGroup.value.$key != undefined){
      this.servicesAPP.updateDataApp(this.servicesAPP.dataApp);
    }else{
      this.servicesAPP.saveDataApp(this.servicesAPP.dataApp);
    }
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
      titleTab1 : '',
      urlTab1 : '',
      contentTab1 : '',
      titleTab2 : '',
      urlTab2 : '',
      contentTab2 : '',
      titleTab3 : '',
      urlTab3 : '',
      contentTab3 : '',
      dayApp :  Date.now()
    }
  }

  onSubmit(){
    this.servicesAPP.dataApp.titleTab1 =this.firstFormGroup.value.titleTab1 ;
    this.servicesAPP.dataApp.titleTab2 = this.secondFormGroup.value.titleTab2;
    this.servicesAPP.dataApp.titleTab3 = this.thirdFormGroup.value.titleTab3;
    this.servicesAPP.dataApp.urlTab1 = this.firstFormGroup.value.urlTab1;
    this.servicesAPP.dataApp.urlTab2 = this.secondFormGroup.value.urlTab2;
    this.servicesAPP.dataApp.urlTab3 = this.thirdFormGroup.value.urlTab3;
    this.servicesAPP.dataApp.contentTab1 = this.firstFormGroup.value.contentTab1;
    this.servicesAPP.dataApp.contentTab2 = this.secondFormGroup.value.contentTab2;
    this.servicesAPP.dataApp.contentTab3 = this.thirdFormGroup.value.contentTab3;
    this.onSaveDataAPPAndupdateTemas();
  }

}
