import { Component, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'mgnchildrenapps';
  @ViewChild('sidenav', {static: false}) sidenav: MatSidenav;

  constructor(public router : Router) {}

  onClickData( flag? : string){
    this.sidenav.close();
    if(flag != undefined )
       this.router.navigate(['/'+flag]);
  }
}
