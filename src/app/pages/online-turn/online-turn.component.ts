import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import {MatTableDataSource} from '@angular/material/table';
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

  columns = [
    {
      columnDef: 'speciality',
      header: 'Especialista',
      cell: (element: Shiefts) => `${element.speciality}`
    },
    {
      columnDef: 'nameChild',
      header: 'Nombre del Paciente',
      cell: (element: Shiefts) => `${element.nameChild}`
    },
    {
      columnDef: 'ageChild',
      header: 'Edad del Paciente',
      cell: (element: Shiefts) => `${element.ageChild}`
    },
    {
      columnDef: 'nameFather',
      header: 'Nombre del Padre',
      cell: (element: Shiefts) => `${element.nameFather}`
    },
    {
      columnDef: 'emailfather',
      header: 'Email Contacto',
      cell: (element: Shiefts) => `${element.emailfather}`
    },
    {
      columnDef: 'dateselect',
      header: 'Dia del turno',
      cell: (element: Shiefts) => `${element.dateselect}`
    },
    {
      columnDef: 'hourselect',
      header: 'Hora del turno',
      cell: (element: Shiefts) => `${element.hourselect}`
    }
  ];
  displayedColumns = this.columns.map(c => c.columnDef);
  dataSource: MatTableDataSource<Shiefts>;

  constructor(public dialog : MatDialog,
              public service : OnlineTurnService) { 
              }

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
                vv["dateselect"] = new Date(vv.dateselect).toLocaleDateString("en-US")
                this.shieftList.push(vv as Shiefts);
            }
            );
        });
        this.dataSource = new MatTableDataSource(this.shieftList);
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

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
