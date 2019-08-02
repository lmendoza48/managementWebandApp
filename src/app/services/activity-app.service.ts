import { Injectable } from '@angular/core';
import { AngularFireList, AngularFireDatabase } from 'angularfire2/database';
import { ActivityModel } from '../models/activity.model';

@Injectable({
  providedIn: 'root'
})
export class ActivityAppService {
  
  private conectActivity : AngularFireList<any>;
  dbListAct : ActivityModel = new ActivityModel();

  constructor(public dbFires : AngularFireDatabase) { }


  getListDbActivity(){
    return this.conectActivity = this.dbFires.list('/activity');
  }

  saveActivityDb( form : ActivityModel){
    this.conectActivity.push({
      titleAct :  form.titleAct,
      imgSlides : form.imgSlides,
      contentAct : form.contentAct,
      dateSave : Date.now()
    })

  }

  updateActivityDb( form : ActivityModel){
     this.conectActivity.update(form.$key,{
        titleAct :  form.titleAct,
        imgSlides : form.imgSlides,
        contentAct : form.contentAct,
        dateSave : Date.now()
     })
  }

  removesActivityDb(form : ActivityModel){
     this.conectActivity.remove(form.$key); 
  }

}
