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

  getAllDataContactApp(tema? : string){
    return this.conectDBContactApp = this.dbContactFireApp.list('/menssagesAPP/temas_'+tema);
  }

  deleteMsgApp( msg : ContactModel){
     this.conectDBContactApp.remove(msg.$key);
  }
}
