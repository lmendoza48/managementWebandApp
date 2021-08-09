import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { OnlineService } from 'src/app/models/online-service';
import { OnlineServicesService } from 'src/app/services/online-services.service';

@Component({
  selector: 'app-pop-new-service',
  templateUrl: './pop-new-service.component.html',
  styleUrls: ['./pop-new-service.component.css']
})
export class PopNewServiceComponent implements OnInit {

  formChargeTitle='Carga de Formulario';
  buttonActionturn='Guardar Datos';
  serviceList : OnlineService[];

  groupFormOnlineService : FormGroup;

  constructor(public dialogRef :  MatDialogRef<PopNewServiceComponent>,
              public service : OnlineServicesService,
              private _formBuilder : FormBuilder) { }

  ngOnInit() {
    this.chargeinfoNewOrOldService();
  }

  chargeinfoNewOrOldService(){
    const dat = this.service.serviceData;
    if(dat != undefined && dat.$key != null){
      this.groupFormOnlineService = this._formBuilder.group({
        $key : new FormControl(dat.$key),
        imgPresentation : [dat.imgPresentation, Validators.required],
        imgtext : [dat.imgtext, Validators.required],
        serviceName : [dat.serviceName, Validators.required],
        isButtonActive : [ dat.isButtonActive, Validators.required],
        textinfo: [dat.textinfo, Validators.required]
      });  
    }else{
      this.groupFormOnlineService = this._formBuilder.group({
        $key : new FormControl(''),
        imgPresentation : ['', Validators.required],
        imgtext : ['', Validators.required],
        serviceName : ['', Validators.required],
        isButtonActive : ['', Validators.required],
        textinfo: ['', Validators.required]
      });
    }
  }

  onChargeDataOnlineService(){
    console.log(this.groupFormOnlineService.value);
    if(this.groupFormOnlineService.value.$key != ""){
        this.service.updateOnlineService(this.groupFormOnlineService.value);
    }else{
      this.service.inserOnlineService(this.groupFormOnlineService.value);
    }
    this.dialogRef.close();
  }
}
