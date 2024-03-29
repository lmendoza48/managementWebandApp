import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import {MatTableDataSource} from '@angular/material/table';
import { Shiefts } from 'src/app/models/shiefts';
import { TurnModel } from 'src/app/models/turn.model';
import { OnlineTurnService } from 'src/app/services/online-turn.service';
import { PopUpOnlineturnComponent } from './pop-up-onlineturn/pop-up-onlineturn.component';
import { UpdateregisterpopupComponent } from './updateregisterpopup/updateregisterpopup.component';

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
  dialogRefPopUpTurnosOnline : MatDialogRef<UpdateregisterpopupComponent>;
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
      columnDef: 'dateselect',
      header: 'Dia del turno',
      cell: (element: Shiefts) => `${element.dateselect}`
    },
    {
      columnDef: 'hourselect',
      header: 'Hora del turno',
      cell: (element: Shiefts) => `${element.hourselect}`
    },
    {
      columnDef: 'methodpay',
      header: 'Metodo de pago',
      cell: (element: Shiefts) => `${element.methodpay}`
    },
    {
      columnDef: 'statuspayment',
      header: 'Estatus',
      cell: (element: Shiefts) => `${element.statuspayment}`
    },
    {
      columnDef: 'viewAction',
      header: '',
      cell: (element: Shiefts) => `${element}`
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
      this.shieftList = [];
      item.forEach(list => {

          let it = list.payload.toJSON();
          it["$key"] = list.key;
          this.turnList.push(it as TurnModel);

          let reserv2 = this.service.onGetFireStoreDataReserva(it["ocupation"]);
          reserv2.subscribe(rs2 =>{
              let dats = rs2.map(e => {
                return {
                  $key: e.payload.doc.id,
                  nameFather : e.payload.doc.data()['nameFather'] as string,
                  nameChild : e.payload.doc.data()['nameChild'] as string,
                  agefather : e.payload.doc.data()['agefather'] as string,
                  ageChild : e.payload.doc.data()['ageChild'] as string,
                  documentFather : e.payload.doc.data()['documentFather'] as string ,
                  emailfather: e.payload.doc.data()['emailfather'] as string, 
                  sexChild: e.payload.doc.data()['sexChild'] as string, 
                  dateselect: e.payload.doc.data()['dateselect'] as string,
                  hourselect: e.payload.doc.data()['hourselect'] as string,
                  methodpay: e.payload.doc.data()['methodpay'] as string,
                  statuspayment: e.payload.doc.data()['statuspayment'] as string
                }
            });
              dats.forEach( od => {
                od["speciality"] = it["ocupation"];
                od["dateselect"] = new Date(od.dateselect).toLocaleDateString("en-US");
                let indc = this.shieftList.findIndex( i => i.$key == od.$key);
                if(indc === -1){
                  this.shieftList.push(od as unknown as Shiefts);
                }else{
                  this.shieftList.splice(indc,1,od as unknown as Shiefts);
                }
                
              });


            this.dataSource = new MatTableDataSource(this.shieftList);  
        });
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

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getRecordAndOpenModal(objectShieft : Shiefts){
      this.service.shieftsSelect = objectShieft;
      this.dialogRefPopUpTurnosOnline = this.dialog.open(UpdateregisterpopupComponent,{
        width: '600px'
      });
  }
}
