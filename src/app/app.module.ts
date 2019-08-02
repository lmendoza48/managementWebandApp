import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { InformationWebComponent } from './pages/information-web/information-web.component';
import { InformationAPPComponent } from './pages/information-app/information-app.component';
import { EmailMngComponent } from './pages/email-mng/email-mng.component';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { environment } from '../environments/environment';
import { ContactServiceWeb } from './services/contact-web.service';
import { WebinformationService } from './services/webinformation.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BackupdataComponent } from './pages/backupdata/backupdata.component';
import { MaterialComponent } from './material-angular/material.component';
import { PopWebComponent } from './pages/information-web/pop-web/pop-web.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { PopEmailComponent } from './pages/email-mng/pop-email/pop-email.component';
import { EmailWebComponent } from './pages/email-web/email-web.component';
import { PopEmailWebComponent } from './pages/email-web/pop-email-web/pop-email-web.component';
import { PopAppComponent } from './pages/information-app/pop-app/pop-app.component';
import { MngContactappService } from './services/mng-contactapp.service';
import { AppInformationService } from './services/app.information.service';
import { GalreiaIMGComponent } from './pages/galreia-img/galreia-img.component';
import { PopGaleriaComponent } from './pages/galreia-img/pop-galeria/pop-galeria.component';
import { GaleriaService } from './services/galeria.service';
import { ActivityAppComponent } from './pages/activity-app/activity-app.component';
import { PopActivityComponent } from './pages/activity-app/pop-activity/pop-activity.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    InformationWebComponent,
    InformationAPPComponent,
    EmailMngComponent,
    PopAppComponent,
    BackupdataComponent,
    PopWebComponent,
    PopEmailComponent,
    EmailWebComponent,
    PopEmailWebComponent,
    PopAppComponent,
    GalreiaIMGComponent,
    PopGaleriaComponent,
    ActivityAppComponent,
    PopActivityComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.configFirebase),
    AngularFireDatabaseModule,
    BrowserAnimationsModule ,
    MaterialComponent,
    FormsModule,
    Ng2SearchPipeModule,
    ReactiveFormsModule
  ],
  entryComponents:[
    PopWebComponent,
    PopEmailComponent,
    PopAppComponent,
    PopEmailWebComponent,
    PopGaleriaComponent,
    PopActivityComponent    
  ],
  providers: [
    ContactServiceWeb,
    WebinformationService,
    MngContactappService,
    AppInformationService,
    GaleriaService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
