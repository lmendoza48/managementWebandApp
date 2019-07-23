import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { WebinformationModel } from '../models/webinformation-model';

@Injectable({
  providedIn: 'root'
})
export class WebinformationService {

  private information : AngularFireList<any>;
  private backupInfo : AngularFireList<any>;
  listInform : WebinformationModel  = new WebinformationModel();

  constructor(private dbFirebase : AngularFireDatabase) { }

  getInformation(){
    return this.information = this.dbFirebase.list('/cardInformation'); 
  }

  insertAllInformation(data : WebinformationModel){
    let date = Date.now();
    this.information.push({
      title : data.title,
      alltext : data.alltext,
      urlImg : data.urlImg,
      day : date
    });
  }
  
  updateDataInformation(data : WebinformationModel){
    const date = Date.now();
    this.information.update(data.$key , {
      title : data.title,
      alltext : data.alltext,
      urlImg : data.urlImg,
      day : date
    });
  }

  deleteInformation(data : WebinformationModel){
      this.information.remove(data.$key);
  }
 
  getBackupList(){
    return this.backupInfo = this.dbFirebase.list('/backupdata');
  }

  backupSaveList( info : WebinformationModel){
      this.getBackupList();
      let dayM = Date.now();
      this.backupInfo.push({
        title : info.title,
        alltext : info.alltext,
        urlImg : info.urlImg,
        day : dayM
      })
  }
  
  onDeleteBackupList(item : WebinformationModel){
     this.backupInfo.remove(item.$key);
  }

}
