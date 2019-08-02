import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, NgForm } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { GaleriaService } from 'src/app/services/galeria.service';
import { GaleryModel } from 'src/app/models/galery.model';

@Component({
  selector: 'app-pop-galeria',
  templateUrl: './pop-galeria.component.html',
  styleUrls: ['./pop-galeria.component.css']
})
export class PopGaleriaComponent implements OnInit {
  
  productForm: FormGroup;
  
  constructor(private fb: FormBuilder, 
              public dialogRef : MatDialogRef<PopGaleriaComponent>,
              public servGle : GaleriaService,
              @Inject(MAT_DIALOG_DATA) public data: GaleryModel) { }

              
  ngOnInit() {
    this.getInfoGaleria();
  }

  getInfoGaleria(){
    if(this.data == null){
      this.productForm = this.fb.group({
        $key : null,
        title: '',
        imgPresent : '',
        urlImgCarru : this.fb.array([this.fb.group({point:''})])
      })
    }else{
      this.productForm = this.fb.group({
        $key : this.data.$key,
        title: this.data.titleGal,
        imgPresent : this.data.imgPresent,
        urlImgCarru : this.fb.array([])
      })
      let dd = this.data.urlCarrusel;
      Object.entries(dd).forEach(([key, value]) => {
             this.urlImgCarrusel.push(this.fb.group({point:value})); 
         }
      );
    }
  }
   
  closePopUp( form? : FormGroup){
    this.resetForm(form);
    this.dialogRef.close();
  }

  resetForm(form? : FormGroup)
  {
    if(form != null)
      form.reset();
    this.servGle.dbGaleria = {
      $key : null,
      titleGal :  '',
      imgPresent : '',
      urlCarrusel : [],
      dateSave : Date.now()
    }
  }

   ///////// getDatos ////////
   get urlImgCarrusel() {
    return this.productForm.get('urlImgCarru') as FormArray;
  }
  ///////////End ////////////////
   
  addGaleryImg() {
    this.urlImgCarrusel.push(this.fb.group({point:''}));
  }

  deleteGaleryImg(index) {
    if(index > 0){
      this.urlImgCarrusel.removeAt(index);
    }
  }

  getSaveGaleriaAndUpdate(form : FormGroup){
    if(form.value.$key == null){
      this.servGle.saveGaleriaData(form.value);
    }else{
      this.servGle.updateGaleriaData(form.value);
    }
    this.closePopUp(form);
  }

}
