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
    '9:00 horas',
    '10:00 horas',
    '11:00 horas',
    '13:00 horas',
    '14:00 horas',
    '16:00 horas',
    '18:00 horas',
    '19:00 horas',
    '21:00 horas'];
  
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
        imgPresentation : [dat.imgPresentation, Validators.required],
        imgInfo : [dat.imgInfo, Validators.required],
        namePerson : [ dat["name"], Validators.required],
        ocupation: [dat.ocupation, Validators.required],
        descriptioOcupation : [dat.descriptioOcupation, Validators.required],
        hourSelect: ['', Validators.required]
      });  
    }else{
      this.groupFormTurnOnline = this._formBuilder.group({
        $key : new FormControl(''),
        imgAvatar : ['', Validators.required],
        imgPresentation : ['', Validators.required],
        imgInfo : ['', Validators.required],
        namePerson : ['', Validators.required],
        ocupation: ['', Validators.required],
        descriptioOcupation : ['', Validators.required],
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
