import { Component, OnInit } from '@angular/core';
import { NgForm, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginFormGroup : FormGroup;
  ressetPass : FormGroup;
  flagPass : boolean = true;

  constructor(private _formBuilderLogin: FormBuilder, 
              public router : Router, 
              public services : LoginService,
              private _snackBar: MatSnackBar) { }

  ngOnInit() {
      let loginUser = JSON.parse(sessionStorage.getItem('userData'));
      if(loginUser != null && loginUser.emailVerified){
         this.router.navigate(['/home']);
      }
      this.clearForm();
  }

  formLogin(){
     this.services.loginUserWithEmail(this.loginFormGroup.value)
          .then((res)=>{
            this.clearForm();
            this.openSnackBarLogin("bienvenido😸","");
            this.router.navigate(['/home']);
          }).catch((err)=>{
            this.openSnackBarLogin("error al ingresar","");
          });

  }

  loginResetPass(){
    this.services.ressetpassword(this.ressetPass.value).then((res)=>{
      this.openSnackBarLogin("se te envio un email para recuperar la contraseña 😄","");
      this.forgetPassBtn();
    }).catch((err)=>{
      this.openSnackBarLogin("error al enviar el email","");
    });

  }
  
  forgetPassBtn(){
    this.flagPass = !this.flagPass;
  }

  clearForm(){
    this.loginFormGroup = this._formBuilderLogin.group({
      emailLogin : ['', Validators.required],
      passLogin : ['', Validators.required]
   });
    this.ressetPass = this._formBuilderLogin.group({
      emailForget : ['', Validators.required],
    })
  }

  openSnackBarLogin(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }

}
