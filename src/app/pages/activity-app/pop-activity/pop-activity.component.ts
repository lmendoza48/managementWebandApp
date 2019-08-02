import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { ActivityAppService } from 'src/app/services/activity-app.service';
import { ActivityModel } from 'src/app/models/activity.model';

@Component({
  selector: 'app-pop-activity',
  templateUrl: './pop-activity.component.html',
  styleUrls: ['./pop-activity.component.css']
})
export class PopActivityComponent implements OnInit {

  acttForm : FormGroup;

  constructor( public dialogRef : MatDialogRef<PopActivityComponent>,
               public fbActt :  FormBuilder,
               public servActt : ActivityAppService,
               @Inject(MAT_DIALOG_DATA) public data: ActivityModel) {}

  ngOnInit() {
     this.getDatosActt();
  }

  getDatosActt(){
    if(this.data == null){
      this.acttForm = this.fbActt.group({
        $key : null,
        titleAct: '',
        contentAct : '',
        imgSlides : this.fbActt.array([this.fbActt.group({img:''})])
      })
    }else{
      this.acttForm = this.fbActt.group({
        $key : this.data.$key,
        titleAct: this.data.titleAct,
        contentAct: this.data.contentAct,
        imgSlides : this.fbActt.array([])
      })
      let dd = this.data.imgSlides;
      Object.entries(dd).forEach(([key, value]) => {
             this.urlImgSlide.push(this.fbActt.group({img:value["img"]})); 
         }
      );
    }
  }

 ///////// getDatos format ////////
  get urlImgSlide() {
    return this.acttForm.get('imgSlides') as FormArray;
  }
     
  addSlideImg() {
   this.urlImgSlide.push(this.fbActt.group({img:''}));
  }
  
  deleteSlideImg(index) {
    if(index > 0){
      this.urlImgSlide.removeAt(index);
    }
  }
////////////// FIN MANEJO GROUP ARRAY ///////////////

  getSaveAndUpdateSlide(form : FormGroup){
    if(form.value.$key == null){
      this.servActt.saveActivityDb(form.value);
    }else{
      this.servActt.updateActivityDb(form.value);
    }
    this.closeModelAct(form);
  }

  closeModelAct( form? : FormGroup){
    this.resetForm(form);
    this.dialogRef.close();
  }

  resetForm(form? : FormGroup){
    if(form != null)
      form.reset();
    this.servActt.dbListAct = {
      $key : null,
      titleAct: '',
      contentAct : '',
      imgSlides : [],
      dateSave : Date.now()
    }
  }

}
