import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { Shiefts } from 'src/app/models/shiefts';
import { OnlineTurnService } from 'src/app/services/online-turn.service';

@Component({
  selector: 'app-updateregisterpopup',
  templateUrl: './updateregisterpopup.component.html',
  styleUrls: ['./updateregisterpopup.component.css']
})
export class UpdateregisterpopupComponent implements OnInit {

  shiftObject : Shiefts = new Shiefts();
  constructor(public service : OnlineTurnService,
              public dialogRefPopUpTurnosOnline :  MatDialogRef<UpdateregisterpopupComponent>) { }

  ngOnInit() {
    this.shiftObject = this.service.shieftsSelect;
  }

  onUpdatePayment(){
    this.service.onUpdateReservaOnline(this.shiftObject);
    this.dialogRefPopUpTurnosOnline.close();
  }

  onDeleteTurn(){
    if(confirm('¿Estas seguro de Eliminar este Dato?') == true){
      this.service.onDeleteReservaPaciente(this.shiftObject);
      this.dialogRefPopUpTurnosOnline.close();
    }
  }

}
