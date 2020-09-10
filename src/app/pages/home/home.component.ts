import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  
  userLogin$ : Observable<String[]>;

  constructor(public router : Router, public service : LoginService) { }

  ngOnInit() {
    let loginUser = JSON.parse(sessionStorage.getItem('userData'));
    let flglogin = this.service.isUserEmailLoggedIn();
    if(!flglogin){
      if(loginUser == null)
          this.router.navigate(['/']);
    }

  }

}
