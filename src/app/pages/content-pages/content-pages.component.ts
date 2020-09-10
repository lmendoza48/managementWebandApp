import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatSidenav } from '@angular/material/sidenav';
import { LoginService } from 'src/app/services/login.service';
import { Users } from 'src/app/models/users';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-content-pages',
  templateUrl: './content-pages.component.html',
  styleUrls: ['./content-pages.component.css']
})
export class ContentPagesComponent implements OnInit {

  userLogin$ : Observable<String[]>;
  flagLogin : boolean = false;

  @ViewChild('sidenav', {static: false}) sidenav: MatSidenav;

  constructor(public router : Router, public servicesLogin : LoginService) {}

  ngOnInit(): void {
    
      this.userLogin$ = this.servicesLogin.getCartUnique$();
      this.userLogin$.subscribe(usr =>{
         if(usr.length > 0){
            this.flagLogin = true;
         }
      });

      let loginData = JSON.parse(sessionStorage.getItem('userData'));
      if(loginData != null && loginData.emailVerified){
        this.flagLogin = true;
      }
  } 

  onClickData( flag? : string){
    this.sidenav.close();
    if(flag != undefined )
       this.router.navigate(['/'+flag]);
  }

  logOut(){
    this.servicesLogin.signOut();
    sessionStorage.clear();
    this.flagLogin = false;
    this.router.navigate(['/']);
  }

}
