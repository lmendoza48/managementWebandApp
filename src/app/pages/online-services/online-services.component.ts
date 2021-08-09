import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { OnlineService } from 'src/app/models/online-service';
import { OnlineServicesService } from 'src/app/services/online-services.service';
import { PopNewServiceComponent } from './pop-new-service/pop-new-service.component';

@Component({
  selector: 'app-online-services',
  templateUrl: './online-services.component.html',
  styleUrls: ['./online-services.component.css']
})
export class OnlineServicesComponent implements OnInit {

  titleService = 'Cargar Servicios';
  serviceList : OnlineService[];
  dialogRef : MatDialogRef<PopNewServiceComponent>;

  constructor(public service : OnlineServicesService,
              public dialog :MatDialog) { }

  ngOnInit() {
    let conc = this.service.getConectListService();
    conc.snapshotChanges().subscribe(item =>{
      this.serviceList = [];
      item.forEach(list => {
        let it = list.payload.toJSON();
        it["$key"] = list.key;
        this.serviceList.push(it as OnlineService);
      });
    });
  }
  
  onDeleteOnlineService(item){
    if(confirm('¿Estas seguro de Eliminar este Dato?') == true){
      this.service.deleteOnlineService(item.$key);
     }
  }

  onUpdateOnlineService(item){
    this.service.serviceData = Object.assign({},item);
    this.openPopUpOnlineService();
  }

  openPopUpOnlineService(){
    this.dialogRef = this.dialog.open(PopNewServiceComponent,{
      width: '600px'
    });
    this.dialogRef.afterClosed().subscribe(result => {
         this.service.serviceData = new OnlineService();
    });
  }
}
