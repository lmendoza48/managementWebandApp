import { Injectable } from '@angular/core';
import { OnlineService } from '../models/online-service';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

@Injectable({
  providedIn: 'root'
})
export class OnlineServicesService {

  private dbConectOnlineService:  AngularFireList<any>;
  serviceData : OnlineService = new OnlineService();

  constructor(private dbFirelist : AngularFireDatabase) { }

  getConectListService(){
    return this.dbConectOnlineService = this.dbFirelist.list('/onlineservice');
  }

  inserOnlineService(item : any){
    this.dbConectOnlineService.push({
      imgPresentation : item["imgPresentation"],
      imgtext : item["imgtext"],
      serviceName : item["serviceName"],
      textinfo : item["textinfo"],
      isButtonActive : item["isButtonActive"]
    });
  }

  updateOnlineService(item : any){
     this.dbConectOnlineService.update(item["$key"],{
      imgPresentation : item["imgPresentation"],
      imgtext : item["imgtext"],
      serviceName : item["serviceName"],
      textinfo : item["textinfo"],
      isButtonActive : item["isButtonActive"]
     });
  }

  deleteOnlineService(key : string){
    this.dbConectOnlineService.remove(key);
  }
}
