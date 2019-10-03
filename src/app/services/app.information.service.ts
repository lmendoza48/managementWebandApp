import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { AppModels } from '../models/app.models';
import { WebinformationService } from './webinformation.service';

@Injectable({
  providedIn: 'root'
})
export class AppInformationService {
  
  private dbConectList :  AngularFireList<any>;
  dataApp : AppModels = new AppModels(); 

  constructor(private dbFirelist : AngularFireDatabase, 
              public serveWeb : WebinformationService) { }

  getConectListApp(){
    return this.dbConectList = this.dbFirelist.list('/appContent');
  }

  saveDataApp(appData : AppModels){
    appData.dayApp = Date.now();
    this.dbConectList.push({
      titleTab1 : appData.titleTab1,
      urlTab1 : appData.urlTab1,
      contentTab1 : appData.contentTab1,
      titleTab2 : appData.titleTab2,
      urlTab2 : appData.urlTab2,
      contentTab2 : appData.contentTab2,
      titleTab3 : appData.titleTab3,
      urlTab3 : appData.urlTab3,
      contentTab3 : appData.contentTab3,
      dayApp :  appData.dayApp
    })
  }

  updateDataApp(updData : AppModels){
     updData.dayApp = Date.now();
     this.dbConectList.update(updData.$key,{
      titleTab1 : updData.titleTab1,
      urlTab1 : updData.urlTab1,
      contentTab1 : updData.contentTab1,
      titleTab2 : updData.titleTab2,
      urlTab2 : updData.urlTab2,
      contentTab2 : updData.contentTab2,
      titleTab3 : updData.titleTab3,
      urlTab3 : updData.urlTab3,
      contentTab3 : updData.contentTab3,
       dayApp :  updData.dayApp
     });
  }

  deleteDataApp(key : string){
    this.dbConectList.remove(key);
  }

}
