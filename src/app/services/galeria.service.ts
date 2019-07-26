import { Injectable } from '@angular/core';
import { AngularFireList, AngularFireDatabase } from 'angularfire2/database';
import { GaleryModel } from '../models/galery.model';

@Injectable({
  providedIn: 'root'
})
export class GaleriaService {

  private conectGaleriaDb : AngularFireList<any>;
  dbGaleria : GaleryModel = new GaleryModel();

  constructor(public dbFirebase : AngularFireDatabase) {}

  getConectDBgalery(){
    return this.conectGaleriaDb = this.dbFirebase.list('/galeriadb');
  }
  
  saveGaleriaData(gleData : GaleryModel){ 
    let arry = gleData["urlImgCarru"];
    let arrUrl = [];
    arry.forEach(element => {
        let t = element['point'];
        arrUrl.push(t);
    });
    
    this.conectGaleriaDb.push({
      titleGal :  gleData["title"],
      imgPresent : gleData["imgPresent"],
      urlCarrusel : arrUrl,
      dateSave : Date.now()
     }); 
  }

  updateGaleriaData(gleData : GaleryModel){
    let arryUp = gleData["urlImgCarru"];
    let arrUrlUp = [];
    arryUp.forEach(element => {
        let t = element['point'];
        arrUrlUp.push(t);
    });
    this.conectGaleriaDb.update(gleData.$key,{
      titleGal :  gleData["title"],
      imgPresent : gleData.imgPresent,
      urlCarrusel : arrUrlUp,
      dateSave : Date.now()
    });
  }

  deleteGaleriaData(gleData : GaleryModel){
     this.conectGaleriaDb.remove(gleData.$key);
  }

}
