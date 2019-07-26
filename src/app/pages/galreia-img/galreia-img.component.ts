import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { GaleryModel } from 'src/app/models/galery.model';
import { GaleriaService } from 'src/app/services/galeria.service';
import { MatDialog, MatDialogRef } from '@angular/material';
import { PopGaleriaComponent } from './pop-galeria/pop-galeria.component';

@Component({
  selector: 'app-galreia-img',
  templateUrl: './galreia-img.component.html',
  styleUrls: ['./galreia-img.component.css']
})
export class GalreiaIMGComponent implements OnInit {
  
  dialogRef : MatDialogRef<PopGaleriaComponent>;
  productForm: FormGroup;
  listGalery : GaleryModel[];
  filterGalery : string;

  constructor(private servcs : GaleriaService, public dialog: MatDialog) { }

  ngOnInit() {
    let xx = this.servcs.getConectDBgalery();
    xx.snapshotChanges().subscribe( list => {
        this.listGalery = [];
        list.forEach(element=>{
          let ui = element.payload.toJSON();
          ui["$key"] = element.key;
          this.listGalery.push(ui as GaleryModel);
        });
    });
  }

  openPopUpGalery(){
    this.dialogRef = this.dialog.open(PopGaleriaComponent,{
      width: '600px',
      height: '35rem',
    });
    this.dialogRef.afterClosed().subscribe(result => {
           this.servcs.dbGaleria = new GaleryModel();
    });
  }

  updateDataDialog(item : GaleryModel){
     this.dialogRef = this.dialog.open(PopGaleriaComponent,{
      width: '600px',
      height: '35rem',
      data : item
     })
  }

  onDeleteData(item : GaleryModel){
    if(confirm('¿Estas seguro de Eliminar este Dato?') == true){
        this.servcs.deleteGaleriaData(item);
     }
  }

}
