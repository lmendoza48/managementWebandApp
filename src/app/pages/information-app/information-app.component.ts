import { Component, OnInit } from '@angular/core';
import { AppInformationService } from 'src/app/services/app.information.service';
import { MatDialog, MatDialogRef } from '@angular/material';
import { PopAppComponent } from './pop-app/pop-app.component';
import { AppModels } from 'src/app/models/app.models';
import { ActivityAppService } from 'src/app/services/activity-app.service';
import { ActivityModel } from 'src/app/models/activity.model';
import { MessaginPushService } from 'src/app/services/messagin-push.service';

@Component({
  selector: 'app-information-app',
  templateUrl: './information-app.component.html',
  styleUrls: ['./information-app.component.css']
})
export class InformationAPPComponent implements OnInit {

  dialogRef : MatDialogRef<PopAppComponent>;
  appList : AppModels[]; 
  filterAPP : string = '';
  message;

  constructor(public servicesAPP : AppInformationService,
              public dialog : MatDialog,
              public messagingService : MessaginPushService) { }

  ngOnInit() {
   this.getDataInformationApp();
   this.pushNotification();
  }
  

  getDataInformationApp(){
    let appH = this.servicesAPP.getConectListApp();
    appH.snapshotChanges().subscribe( mobil => {
       this.appList = [];
       mobil.forEach( item => {
         let u = item.payload.toJSON();
         u["$key"] = item.key;
         this.appList.push(u as AppModels);
       });
    });
  }

  openDialogNewAPP(){
    this.dialogRef = this.dialog.open(PopAppComponent,{
      width: '800px',
      height: '35rem',
    });
    this.dialogRef.afterClosed().subscribe(result => {
           this.servicesAPP.dataApp = new AppModels();
    });
  }

  updateDataDialogAPP(item : AppModels){
     this.servicesAPP.dataApp = Object.assign({}, item);
     this.openDialogNewAPP();
  }

  onDeleteAPP(itemDelete : AppModels){
    if(confirm('¿Estas seguro de Eliminar este Dato?') == true){
      this.servicesAPP.deleteDataApp(itemDelete.$key);
     }
  }

  pushNotification(){
    const userId = 'user001';
    this.messagingService.requestPermission(userId)
    this.messagingService.receiveMessage()
    this.message = this.messagingService.currentMessage
  }

}
