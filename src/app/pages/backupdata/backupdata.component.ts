import { Component, OnInit } from '@angular/core';
import { WebinformationService } from 'src/app/services/webinformation.service';
import { WebinformationModel } from 'src/app/models/webinformation-model';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-backupdata',
  templateUrl: './backupdata.component.html',
  styleUrls: ['./backupdata.component.css']
})
export class BackupdataComponent implements OnInit {

  backupList : WebinformationModel[];

  constructor(public services : WebinformationService, private snackBar: MatSnackBar) { }

  ngOnInit() {
     let dto = this.services.getBackupList();
     dto.snapshotChanges().subscribe(item => {
      this.backupList = [];
      item.forEach( element =>{
          let y = element.payload.toJSON();
          y["$key"] = element.key;
          this.backupList.push(y as WebinformationModel);
      });
    });
  }

  getBackList(item: WebinformationModel){
     this.services.updateDataInformation(item);
     let msg = 'Listo! informacion recuperada';
     this.openSnackBar(msg);
  }

  deleteComplet(item : WebinformationModel){
     if(confirm('¿Estas seguro de Eliminar para siempre este dato?') == true){
       this.services.onDeleteBackupList(item);
       let msg = 'Listo dato borrado para siempre!!';
       this.openSnackBar(msg);
     }
  }

  openSnackBar(msg: string) {
    const message = msg;
    const action = 'Gracias!!'
    this.snackBar.open(message, action, {
      duration: 3000,
    });
  }

}
