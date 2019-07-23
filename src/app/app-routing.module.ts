import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { InformationWebComponent } from './pages/information-web/information-web.component';
import { EmailMngComponent } from './pages/email-mng/email-mng.component';
import { BackupdataComponent } from './pages/backupdata/backupdata.component';
import { InformationAPPComponent } from './pages/information-app/information-app.component';
import { EmailWebComponent } from './pages/email-web/email-web.component';


const routes: Routes = [
  {
   path:'',
   component:HomeComponent
  },
  {
    path:'informationsWEB',
    component: InformationWebComponent
  },
  {
    path:'informationsAPP',
    component: InformationAPPComponent
  },
  {
    path:'messagesAPP',
    component: EmailMngComponent
  },
  {
    path:'messagesWEB',
    component: EmailWebComponent
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
