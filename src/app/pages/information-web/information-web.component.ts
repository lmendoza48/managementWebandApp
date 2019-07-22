import { Component, OnInit } from '@angular/core';
import { WebinformationService } from '../../services/webinformation.service';
import { WebinformationModel } from 'src/app/models/webinformation-model';
import { MatDialogRef, MatDialog } from '@angular/material';
import { PopWebComponent } from './pop-web/pop-web.component';

@Component({
  selector: 'app-information-web',
  templateUrl: './information-web.component.html',
  styleUrls: ['./information-web.component.css']
})
export class InformationWebComponent implements OnInit {

  webList :  WebinformationModel[];
  dialogRef : MatDialogRef<PopWebComponent>;

  constructor(public service : WebinformationService, public dialog : MatDialog) { }

  ngOnInit() {
      let dd = this.service.getInformation();
      dd.snapshotChanges().subscribe(item => {
          this.webList = [];
          item.forEach( element =>{
              let y = element.payload.toJSON();
              y["$key"] = element.key;
              this.webList.push(y as WebinformationModel);
          });
      });
  }
   
  openDialogNew(){
    this.dialogRef = this.dialog.open(PopWebComponent,{
      width: '800px',
      height: '35rem',
    });
    this.dialogRef.afterClosed().subscribe(result => {
           this.service.listInform = new WebinformationModel();
    });
  }
  
  updateDataDialog(item : WebinformationModel){
       this.service.listInform = Object.assign({}, item);
       this.openDialogNew();
  }

  onDeleteData( item : WebinformationModel){
    if(confirm('¿Estas seguro de Eliminar este Dato?') == true){
         this.service.deleteInformation(item);
    }
  }
}
