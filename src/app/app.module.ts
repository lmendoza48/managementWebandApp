import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { InformationWebComponent } from './pages/information-web/information-web.component';
import { InformationAPPComponent } from './pages/information-app/information-app.component';
import { EmailMngComponent } from './pages/email-mng/email-mng.component';
import { PopdataComponent } from './pages/information-app/popdata/popdata.component';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { environment } from '../environments/environment';
import { ContactService } from './services/contact.service';
import { WebinformationService } from './services/webinformation.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BackupdataComponent } from './pages/backupdata/backupdata.component';
import { MaterialComponent } from './material-angular/material.component';
import { PopWebComponent } from './pages/information-web/pop-web/pop-web.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { PopEmailComponent } from './pages/email-mng/pop-email/pop-email.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    InformationWebComponent,
    InformationAPPComponent,
    EmailMngComponent,
    PopdataComponent,
    BackupdataComponent,
    PopWebComponent,
    PopEmailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.configFirebase),
    AngularFireDatabaseModule,
    BrowserAnimationsModule ,
    MaterialComponent,
    FormsModule,
    Ng2SearchPipeModule
  ],
  entryComponents:[
    PopWebComponent,
    PopEmailComponent
  ],
  providers: [
    ContactService,
    WebinformationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
