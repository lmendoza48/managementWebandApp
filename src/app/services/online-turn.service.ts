import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { TurnModel } from '../models/turn.model';

@Injectable({
  providedIn: 'root'
})
export class OnlineTurnService {

  private dbConectTurnOnline :  AngularFireList<any>;
  dataTurnOnline : TurnModel = new TurnModel();

  constructor(private dbFirelist : AngularFireDatabase) { }

  getConectListApp(){
    return this.dbConectTurnOnline = this.dbFirelist.list('/turnonline');
  }

  insertTurnOnline(item : any){
    this.dbConectTurnOnline.push({
      img : item["imgAvatar"],
      ocupation : item["ocupation"],
      hourAvalaible : item["hourSelect"],
      title : "Especialidad",
      name : item["namePerson"]

    })
  }

  updateDataProducts(item : any){
     this.dbConectTurnOnline.update(item["$key"],{
      img : item["imgAvatar"],
      ocupation : item["ocupation"],
      hourAvalaible : item["hourSelect"],
      name : item["namePerson"]
     });
  }

  deleteDataProducts(key : string){
    this.dbConectTurnOnline.remove(key);
  }
}
