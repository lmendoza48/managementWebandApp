import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { TurnModel } from 'src/app/models/turn.model';
import { OnlineTurnService } from 'src/app/services/online-turn.service';

@Component({
  selector: 'app-pop-up-onlineturn',
  templateUrl: './pop-up-onlineturn.component.html',
  styleUrls: ['./pop-up-onlineturn.component.css']
})
export class PopUpOnlineturnComponent implements OnInit {

  
  hourSelectTurn = [
    '9:00 a 10:00 hrs',
    '10:00 a 11:00 hrs',
    '11:00 a 12:00 hrs',
    '13:00 a 14:00 hrs',
    '14:00 a 15:00 hrs',
    '16:00 a 17:00 hrs',
    '18:00 a 19:00 hrs',
    '19:00 a 20:00 hrs',
    '21:00 a 22:00 hrs'];
  
  formChargeTitle='Carga de Formulario';
  buttonActionturn='Guardar Datos';
  timeAvaible = 'Horas disponbles';
  turnList : TurnModel[];

  groupFormTurnOnline : FormGroup;
    
  constructor( public dialogRef :  MatDialogRef<PopUpOnlineturnComponent>,
               private _formBuilder: FormBuilder,
               public service : OnlineTurnService) { }

  ngOnInit() {
    const dat = this.service.dataTurnOnline;
    if(dat != undefined && dat.$key != null){
      this.groupFormTurnOnline = this._formBuilder.group({
        $key : new FormControl(dat.$key),
        imgAvatar : [dat.img, Validators.required],
        namePerson : [ dat["name"], Validators.required],
        ocupation: [dat.ocupation, Validators.required],
        hourSelect: ['', Validators.required]
      });  
    }else{
      this.groupFormTurnOnline = this._formBuilder.group({
        $key : new FormControl(''),
        imgAvatar : ['', Validators.required],
        namePerson : [, Validators.required],
        ocupation: ['', Validators.required],
        hourSelect: ['', Validators.required]
      });
    }
  }

  onChargeDataTurnoOnline(){
    if(this.groupFormTurnOnline.value.$key != ""){
        this.service.updateDataProducts(this.groupFormTurnOnline.value);
    }else{
      this.service.insertTurnOnline(this.groupFormTurnOnline.value);
    }

    this.dialogRef.close();
  }

}
