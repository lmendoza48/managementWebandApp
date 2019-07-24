import { Injectable } from '@angular/core';
import { ContactModel } from '../models/contact-model';
import { AngularFireList, AngularFireDatabase } from 'angularfire2/database';

@Injectable({
  providedIn: 'root'
})
export class MngContactappService {
  
  private conectDBContactApp : AngularFireList<any>;
  listContactApp : ContactModel = new ContactModel();

  constructor(private dbContactFireApp : AngularFireDatabase) { }

  getAllDataContactApp(){
    return this.conectDBContactApp = this.dbContactFireApp.list('/menssagesAPP');
  }

  saveAnswerDatos(flagAns : boolean, answerS : string, keyData : string){
    this.conectDBContactApp.update(keyData, {
        flag : flagAns,
        answer : answerS
    });
  }

  deleteMsgApp( msg : ContactModel){
     this.conectDBContactApp.remove(msg.$key);
  }
}
