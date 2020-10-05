import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProductsService } from 'src/app/services/products.service';
import { NgForm, FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { Products } from 'src/app/models/products';

@Component({
  selector: 'app-dialog-new-products',
  templateUrl: './dialog-new-products.component.html',
  styleUrls: ['./dialog-new-products.component.css']
})
export class DialogNewProductsComponent implements OnInit {


  producstChagerd : FormGroup;

  constructor(public dialogRef : MatDialogRef<DialogNewProductsComponent>, 
    public servics : ProductsService,
    public fbproducst :  FormBuilder,
    @Inject(MAT_DIALOG_DATA) public dataProducts: Products) {
      dialogRef.disableClose = true;
    }

ngOnInit() {
  this.servics.getConectListAppProducts();
  this.getDatosProducts();
}

getDatosProducts(){
  if(this.dataProducts.$key == null){
    this.producstChagerd = this.fbproducst.group({
      $key : null,
      name : '',
      category : '',
      price : 0,
      description : '',
      img : '',
      cantidad : 0,
      dateCharged : '',
      imgSlides : this.fbproducst.array([this.fbproducst.group({img:''})])
    });
  }else{
    this.producstChagerd = this.fbproducst.group({
      $key : this.dataProducts.$key,
      name : this.dataProducts.name,
      category : this.dataProducts.category,
      price : this.dataProducts.price,
      description : this.dataProducts.description,
      img : this.dataProducts.img,
      cantidad : this.dataProducts.cantidad,
      dateCharged : this.dataProducts.dateCharged,
      imgSlides : this.fbproducst.array([])
    });
    let dd = this.dataProducts.imgSlides;
    if(dd != null){
      Object.entries(dd).forEach(([key, value]) => {
        this.urlImgSlide.push(this.fbproducst.group({img:value["img"]})); 
          }
      );
    }
  }
}

///////// getDatos format ////////
get urlImgSlide() {
  return this.producstChagerd.get('imgSlides') as FormArray;
}
   
addSlideImg() {
 this.urlImgSlide.push(this.fbproducst.group({img:''}));
}

deleteSlideImg(index) {
  if(index > 0){
    this.urlImgSlide.removeAt(index);
  }
}
////////////// FIN MANEJO GROUP ARRAY ///////////////

onSaveDataWebAndupdateProducts(){
  if(this.producstChagerd.value['$key'] == undefined){
    this.servics.saveDataProducts(this.producstChagerd.value);
  }else{
    this.servics.updateDataProducts(this.producstChagerd.value);
  }
  this.onCloseDialog();
}

onCloseDialog(){
  this.resetForm();
  this.dialogRef.close();
}

resetForm(){
  this.producstChagerd = this.fbproducst.group({
    $key : null,
    name : '',
    category : '',
    price : 0,
    description : '',
    img : '',
    cantidad : 0,
    dateCharged : '',
    imgSlides : this.fbproducst.array([this.fbproducst.group({img:''})])
  });
}

}
