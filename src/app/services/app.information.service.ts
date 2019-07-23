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
       titleApp : appData.titleApp,
       urlImgApp : appData.urlImgApp,
       contentApp : appData.contentApp,
       dayApp :  appData.dayApp,
       monthApp : appData.monthApp,
    })
  }

  updateDataApp(updData : AppModels){
     updData.dayApp = Date.now();
     this.dbConectList.update(updData.$key,{
        titleApp : updData.titleApp,
        urlImgApp : updData.urlImgApp,
        contentApp : updData.contentApp,
        dayApp :  updData.dayApp,
        monthApp : updData.monthApp,
     });
  }

  deleteDataApp(){

  }

}
