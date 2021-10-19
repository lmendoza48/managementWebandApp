import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Products } from '../models/products';
import { AngularFirestore } from '@angular/fire/firestore';
import { Orders } from '../models/orders';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private dbConectListProducts :  AngularFireList<any>;
  dataProducts : Products = new Products();

  constructor(private dbFirelist : AngularFireDatabase, 
              public fire : AngularFirestore) {}

  getConectListAppProducts(){
    return this.dbConectListProducts = this.dbFirelist.list('/products');
  }

  
  saveDataProducts(item : Products){
    item.dateCharged = Date.now();
    this.dbConectListProducts.push({
      name : item.name,
      cantidad : item.cantidad,
      category : item.category.trim(),
      dateCharged : item.dateCharged,
      description : item.description,
      img : item.img,
      price : item.price,
      imgSlides : item.imgSlides
    })
  }

  updateDataProducts(item : Products){
    item.dateCharged = Date.now();
     this.dbConectListProducts.update(item.$key,{
      name : item.name,
      cantidad : item.cantidad,
      category : item.category.trim(),
      dateCharged : item.dateCharged,
      description : item.description,
      img : item.img,
      price : item.price,
      imgSlides : item.imgSlides
     });
  }

  deleteDataProducts(key : string){
    this.dbConectListProducts.remove(key);
  }

  /**
   * Data Base Ords 
   */
  read_OrderDeatils() {
    return this.fire.collection('sendemail_Product').snapshotChanges();
  }

  update_OrderDeatils(id : string, record: Orders){
    this.fire.doc('sendemail_Product/' + id).update(record);
  }
  
}
