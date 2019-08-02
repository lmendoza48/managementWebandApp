import { Component, OnInit } from '@angular/core';
import { AppInformationService } from 'src/app/services/app.information.service';
import { MatDialog, MatDialogRef } from '@angular/material';
import { PopAppComponent } from './pop-app/pop-app.component';
import { AppModels } from 'src/app/models/app.models';
import { ActivityAppService } from 'src/app/services/activity-app.service';
import { ActivityModel } from 'src/app/models/activity.model';

@Component({
  selector: 'app-information-app',
  templateUrl: './information-app.component.html',
  styleUrls: ['./information-app.component.css']
})
export class InformationAPPComponent implements OnInit {

  dialogRef : MatDialogRef<PopAppComponent>;
  appList : AppModels[]; 
  filterAPP : string = '';

  constructor(public servicesAPP : AppInformationService,
              public dialog : MatDialog) { }

  ngOnInit() {
   this.getDataInformationApp();
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
      console.info('aun no se puede borrar', itemDelete);
     }
  }

}
