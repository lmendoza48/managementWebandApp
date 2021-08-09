import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { InformationWebComponent } from './pages/information-web/information-web.component';
import { EmailMngComponent } from './pages/email-mng/email-mng.component';
import { BackupdataComponent } from './pages/backupdata/backupdata.component';
import { InformationAPPComponent } from './pages/information-app/information-app.component';
import { EmailWebComponent } from './pages/email-web/email-web.component';
import { GalreiaIMGComponent } from './pages/galreia-img/galreia-img.component';
import { ProductsComponent } from './pages/products/products.component';
import { LoginComponent } from './pages/login/login.component';
import { OnlineTurnComponent } from './pages/online-turn/online-turn.component';
import { OnlineServicesComponent } from './pages/online-services/online-services.component';


const routes: Routes = [
  {
    path: '',
    component : LoginComponent
  },
  {
   path:'home',
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
  },
  {
    path:'galeria',
    component:GalreiaIMGComponent
  },
  {
    path: 'products',
    component: ProductsComponent
  },
  {
    path: 'turnonline',
    component: OnlineTurnComponent
  },
  {
    path: 'onlinservice',
    component: OnlineServicesComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
