import { Injectable } from '@angular/core';
import { AngularFireList, AngularFireDatabase } from 'angularfire2/database';
import { ContactModel } from '../models/contact-model';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
   
  private conectDBContact : AngularFireList<any>;
  listContact : ContactModel = new ContactModel();

  constructor(private dbContactFire : AngularFireDatabase) { }

  getConectContact(){
    return this.conectDBContact = this.dbContactFire.list('/dataMessage');
  }

  updateMessageStatus(msg : ContactModel){
    this.conectDBContact.update(msg.$key, {
         flag : false
    });
  }

  deleteMessage(msg : ContactModel){
    this.conectDBContact.remove( msg.$key );
  }

}
