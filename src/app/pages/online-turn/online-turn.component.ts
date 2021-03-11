import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { TurnModel } from 'src/app/models/turn.model';
import { OnlineTurnService } from 'src/app/services/online-turn.service';
import { PopUpOnlineturnComponent } from './pop-up-onlineturn/pop-up-onlineturn.component';

@Component({
  selector: 'app-online-turn',
  templateUrl: './online-turn.component.html',
  styleUrls: ['./online-turn.component.css']
})
export class OnlineTurnComponent implements OnInit {

  filterTurn : string = '';
  titleOnlineTurn : string = 'carga de datos turno online';
  dialogRef : MatDialogRef<PopUpOnlineturnComponent>;
  turnList : TurnModel[];

  constructor(public dialog : MatDialog,
              public service : OnlineTurnService) { }

  ngOnInit() {
    let data = this.service.getConectListApp();
    data.snapshotChanges().subscribe(item => {
      this.turnList = [];
      item.forEach(list => {
          let it = list.payload.toJSON();
          it["$key"] = list.key;
          this.turnList.push(it as TurnModel);
      });
    });
  }

  openPopUpChargedata(){
      this.dialogRef = this.dialog.open(PopUpOnlineturnComponent,{
        width: '600px'
      });
      this.dialogRef.afterClosed().subscribe(result => {
           this.service.dataTurnOnline = new TurnModel();
      });
  }


  onUpdateTurnOnline(item : TurnModel){
    this.service.dataTurnOnline = Object.assign({},item);
    this.openPopUpChargedata();
  }

  onDeleteTurnOnline(item : TurnModel){
    if(confirm('¿Estas seguro de Eliminar este Dato?') == true){
       this.service.deleteDataProducts(item.$key);
    }
  }
}
