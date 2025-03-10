import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CommonModule, DatePipe } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './shared/data/in-memory-data';
import { DataService } from './shared/service/data.service';
import { FooterComponent } from './layout/footer/footer.component';
import { ContainerComponent } from './layout/container/container.component';
import { IntroComponent } from './views/intro/intro.component';
import { SideContainerComponent } from './layout/side-container/side-container.component';
import { EducationComponent } from './views/education/education.component';
import { ProffExpComponent } from './views/proff-exp/proff-exp.component';
import { ResearchExpComponent } from './views/research-exp/research-exp.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ServerErrorComponent } from './server-error/server-error.component';
import { ContactFormComponent } from './views/contact-form/contact-form.component';
import { SkillsComponent } from './shared/views/skills/skills.component';
import { SocialSitesComponent } from './shared/views/social-sites/social-sites.component';


import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAnalytics, provideAnalytics, ScreenTrackingService, UserTrackingService } from '@angular/fire/analytics';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getMessaging, provideMessaging } from '@angular/fire/messaging';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { environment } from 'src/environments/environment';
import { FirestoreDataService } from './shared/service/firestore.data.service';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { NotificationService } from './shared/service/notification.service';
import { ReactiveFormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    ContainerComponent,
    IntroComponent,
    SideContainerComponent,
    EducationComponent,
    ProffExpComponent,
    ResearchExpComponent,
    NotFoundComponent,
    ServerErrorComponent,
    ContactFormComponent,
    SkillsComponent,
    SocialSitesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule ,
    MatSnackBarModule,
    HttpClientInMemoryWebApiModule.forRoot(InMemoryDataService, {
      dataEncapsulation: false,
      passThruUnknownUrl: true
    }),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAnalytics(() => getAnalytics()),
    provideFirestore(() => getFirestore()),
    provideMessaging(() => getMessaging()),
    provideStorage(() => getStorage()),
  ],
  providers: [DataService, DatePipe, ScreenTrackingService, FirestoreDataService, NotificationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
