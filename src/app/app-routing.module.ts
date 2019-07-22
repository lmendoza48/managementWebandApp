import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { InformationWebComponent } from './pages/information-web/information-web.component';
import { EmailMngComponent } from './pages/email-mng/email-mng.component';
import { BackupdataComponent } from './pages/backupdata/backupdata.component';


const routes: Routes = [
  {
   path:'',
   component:HomeComponent
  },
  {
    path:'informations',
    component: InformationWebComponent
  },
  {
    path:'messages',
    component: EmailMngComponent
  },
  {
    path:'backup',
    component:BackupdataComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
