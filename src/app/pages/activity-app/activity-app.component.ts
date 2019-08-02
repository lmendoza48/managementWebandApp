import { Component, OnInit } from '@angular/core';
import { ActivityAppService } from 'src/app/services/activity-app.service';
import { MatDialog, MatDialogRef } from '@angular/material';
import { PopActivityComponent } from './pop-activity/pop-activity.component';
import { ActivityModel } from 'src/app/models/activity.model';

@Component({
  selector: 'app-activity-app',
  templateUrl: './activity-app.component.html',
  styleUrls: ['./activity-app.component.css']
})
export class ActivityAppComponent implements OnInit {
  
  dialogRef : MatDialogRef<PopActivityComponent>;
  actList : ActivityModel[];
  filterAct : string = '';

  constructor(public serActivity : ActivityAppService,
              public dialog : MatDialog) { }

  ngOnInit() {
    this.getDataActivityApp();
  }
  
  getDataActivityApp(){
    let act = this.serActivity.getListDbActivity();
    act.snapshotChanges().subscribe( ac => {
      this.actList = [];
      ac.forEach(elent => {
        let uo = elent.payload.toJSON();
        uo["$key"] = elent.key;
        this.actList.push(uo as ActivityModel);
      });
    });
  }

  openDialogActt(item? : ActivityModel){
    this.dialogRef = this.dialog.open(PopActivityComponent,{
      width: '600px',
      height: '30rem',
      data : item != null ? item : null,
    });
    this.dialogRef.afterClosed().subscribe(result => {
           this.serActivity.dbListAct = new ActivityModel();
    });
  }

  updateDialogActt(item : ActivityModel){
    this.openDialogActt(item);
  }

  onDeleteActt(item : ActivityModel){
    if(confirm('¿Estas seguro de Eliminar este Dato?') == true){
      this.serActivity.removesActivityDb(item);
    }
  }

}
