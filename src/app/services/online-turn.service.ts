import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Shiefts } from '../models/shiefts';
import { TurnModel } from '../models/turn.model';

@Injectable({
  providedIn: 'root'
})
export class OnlineTurnService {

  private dbConectTurnOnline :  AngularFireList<any>;
  private dbConectShieftsAgend :  AngularFireList<any>;
  dataTurnOnline : TurnModel = new TurnModel();
  shieftsSelect : Shiefts = new Shiefts();

  constructor(private dbFirelist : AngularFireDatabase,
              private fire : AngularFirestore) { }

  getConectListApp(){
    return this.dbConectTurnOnline = this.dbFirelist.list('/turnonline');
  }

  getConectListShieftAgen(){
    return this.dbConectShieftsAgend = this.dbFirelist.list('/reservas');
  }

  onGetFireStoreDataReserva(ocupation : string){
    return this.fire.collection('reservas').doc(ocupation).collection('turn_').snapshotChanges();
  }


  insertTurnOnline(item : any){
    this.dbConectTurnOnline.push({
      img : item["imgAvatar"],
      ocupation : item["ocupation"],
      hourAvalaible : item["hourSelect"],
      title : "Especialidad",
      name : item["namePerson"],
      imgInfo : item["imgInfo"],
      imgPresentation : item["imgPresentation"],
      descriptioOcupation : item["descriptioOcupation"]

    })
  }

  updateDataProducts(item : any){
     this.dbConectTurnOnline.update(item["$key"],{
      img : item["imgAvatar"],
      ocupation : item["ocupation"],
      hourAvalaible : item["hourSelect"],
      name : item["namePerson"],
      imgInfo : item["imgInfo"],
      imgPresentation : item["imgPresentation"],
      descriptioOcupation : item["descriptioOcupation"]
     });
  }

  deleteDataProducts(key : string){
    this.dbConectTurnOnline.remove(key);
  }
}
