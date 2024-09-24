import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ViewPetComponent } from './view-pet/view-pet.component';
import { AddPetComponent } from './add-pet/add-pet.component';
import { EditPetComponent } from './edit-pet/edit-pet.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { RouterModule } from '@angular/router';
import {ClientDniModalComponent} from './client-dni-modal/client-dni-modal.component';
import { ViewClientPetComponent } from './view-client-pet/view-client-pet.component';
import { ViewAllPetComponent } from './view-all-pet/view-all-pet.component';
import {ViewMedicalHistoriesComponent} from './view-medical-histories/view-medical-histories.component'
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ViewPetComponent,
    AddPetComponent,
    EditPetComponent,
    ViewClientPetComponent,
    ClientDniModalComponent,
    ViewAllPetComponent,
    ViewMedicalHistoriesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([]),
    NgbModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    MatPaginatorModule,
    MatTableModule
  ],
  providers: [ ],
  bootstrap: [AppComponent]
})
export class AppModule { }
