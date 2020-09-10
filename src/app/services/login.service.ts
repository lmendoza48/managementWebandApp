import { Injectable } from '@angular/core';
import { Users } from '../models/users';
import { AngularFireList, AngularFireDatabase } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';
import { Subject, Observable } from 'rxjs';
import { User } from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private logindata$ = new Subject<String[]>();
  private userList : AngularFireList<any>;
  modelUser : Users = new Users();
  userLoginList : String[] = [] ;
  authStatus : any = null;

  constructor(public firebase : AngularFireAuth, 
    public database : AngularFireDatabase) {
      this.firebase.authState.subscribe((auth)=>{
         this.authStatus = auth
      });
     }

   /**
   * method register user with email
   * @param loginData
   */
  registerUserWithEmail(loginData : Users){
   return this.firebase.auth.createUserWithEmailAndPassword(loginData.emailLogin, loginData.passLogin)
        .then((user) => {           
           sessionStorage.setItem("userData", JSON.stringify(user.user))
           this.saveDataUser(loginData),
           this.loginUserWithEmail(loginData)
      }).catch( error =>{
         console.info('error_with_user', error)
         throw error
      }); 
  }
  
  /**
   * method login user with email
   * @param loginData 
   */
  loginUserWithEmail(loginData : Users){
      return this.firebase.auth.signInWithEmailAndPassword(loginData.emailLogin, loginData.passLogin)
        .then((user)=>{
           if(sessionStorage.getItem("userData") == null){
            sessionStorage.setItem("userData", JSON.stringify(user.user))
           }
           this.registerDatareactive('{login:true}');     
        }).catch(_error => {
          console.info('ERROR: ', _error)
          throw _error
        })
  }
  
  /**
   * 
   * @param email 
   */
   ressetpassword(email : string){
     return this.firebase.auth.sendPasswordResetEmail(email['emailForget'])
        .then( data => {
              console.info('response good:', data)
        }).catch( error =>{
          console.log('Error resetPassword:', error)
          throw error
        });
   }



  saveDataUser(loginData : Users){
    this.userList = this.database.list('/users');
    this.userList.push({
        email : loginData.emailLogin,
        role :'admin',
        dateInit : Date.now()
    });
  }
  
 /**
  * method it session close
  */
  signOut() {
    this.firebase.auth.signOut();
  }

  registerDatareactive(ussr){
    this.userLoginList.push(ussr);
    this.logindata$.next(this.userLoginList);
  }

  getCartUnique$(): Observable<String[]> {
    return this.logindata$.asObservable();
  }
 
  isUserEmailLoggedIn(): boolean {
    if (this.authStatus != null && this.authStatus.emailVerified){
      return true
    } else {
      return false
    }
  }
 
}
