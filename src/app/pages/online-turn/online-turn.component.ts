import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { Shiefts } from 'src/app/models/shiefts';
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
  titleOnlineTurnSecond : string = 'turnos agendados';
  dialogRef : MatDialogRef<PopUpOnlineturnComponent>;
  turnList : TurnModel[];
  shieftList : Shiefts[];

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

    let resers = this.service.getConectListShieftAgen();
    resers.snapshotChanges().subscribe(shieft =>{
        this.shieftList = [];
        shieft.forEach(shf =>{
             let ig = shf.payload.toJSON();
             let namespeciality = shf.key;
             Object.entries(ig).forEach(([key, value]) => {
                let vv = value;
                vv["$key"] = key;
                vv["speciality"] = namespeciality;
                this.shieftList.push(vv as Shiefts);
            }
            );
        })
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
