import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule,NO_ERRORS_SCHEMA,CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ShareModule } from './share/share.module';
import { DatePipe, JsonPipe } from '@angular/common';
import { HttpClientModule,HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HeaderComponent } from './components/widgets/header/header.component';
import { NavbarComponent } from './components/widgets/navbar/navbar.component';
import { FooterComponent } from './components/widgets/footer/footer.component';
import { ToastrModule } from 'ngx-toastr';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { HomeComponent } from './components/layout/home/home.component';
import { ConfirmationDialogComponent } from './components/widgets/confirmation-dialog/confirmation-dialog.component';

import { MasterfileModule } from './components/pages/masterfiles/masterfile.module';
import { MatDialogModule, MatInputModule, MatPaginatorModule, MatSortModule, MatTableModule, MatToolbarModule } from '@angular/material';
import { ContainerComponent } from './components/layout/container/container.component';
import { MainComponent } from './components/layout/main/main.component';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { LoaderInterceptor } from './interseptors/loader.interceptor';
export const createtranslateloader=(http:HttpClient)=>{
  return new TranslateHttpLoader(http,'./assets/lang/','.json')
}

@NgModule({
  declarations: [
    AppComponent,
    ConfirmationDialogComponent,
    HeaderComponent,
    NavbarComponent,
    FooterComponent,
    HomeComponent,
    ContainerComponent,
    MainComponent,

 



   // AdminNavbarComponent
  ],
  imports: [
    
    MasterfileModule,

    NgbModule,
    HttpClientModule,
    RouterModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatTableModule,
    MatInputModule,
    MatToolbarModule,
    MatPaginatorModule,
    MatSortModule,
    AppRoutingModule,
    MDBBootstrapModule.forRoot(),
    ToastrModule.forRoot(),
    ShareModule,
    TranslateModule.forRoot({
      loader:{
        provide:TranslateLoader,
        useFactory:createtranslateloader,
        deps:[HttpClient]
      }

    }),
  ],
  entryComponents: [
  
    ConfirmationDialogComponent
],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true },
    , DatePipe, JsonPipe],

  bootstrap: [AppComponent],

})
export class AppModule { }

