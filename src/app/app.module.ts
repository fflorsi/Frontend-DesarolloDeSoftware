import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ViewPetComponent } from './view-pet/view-pet.component';
import { AddPetComponent } from './add-pet/add-pet.component';
import { EditPetComponent } from './edit-pet/edit-pet.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
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
import { LoginComponent } from 'app/componentsLogin/login/login.component';
import { SignInComponent } from 'app/componentsLogin/sign-in/sign-in.component';
import { DashboardComponent } from 'app/componentsLogin/dashboard/dashboard.component';
import {NavbarComponent} from 'app/componentsLogin/navbar/navbar.component';
import {SpinnerComponent} from 'app/shared/spinner/spinner.component';
import {AddTokenInterceptor} from 'app/utils/add-token.interceptor';
import { ListClientsComponent } from 'app/componentsClient/list-clients/list-clients.component';
import { AddEditClientComponent } from 'app/componentsClient/add-edit-client/add-edit-client.component';
import {ProgressBarComponent} from 'app/shared/progress-bar/progress-bar.component'
import { DetailClientComponent } from 'app/componentsClient/detail-client/detail-client.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CreateObservationDialogComponent } from './create-observation-dialog/create-observation-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ShowObservationDialogComponent } from './show-observation-dialog/show-observation-dialog.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { EditObservationDialogComponent } from './edit-observation-dialog-component/edit-observation-dialog-component.component';
import { DeleteObservationDialogComponent } from './delete-observation-dialog/delete-observation-dialog.component';
import { ListProductsComponent } from './componentsProduct/list-products/list-products.component';
import { AddEditProductComponent } from './componentsProduct/add-edit-product/add-edit-product.component';
import { VaccineComponent } from './vaccine/vaccine.component';
import { CartComponent } from './componentsCart/cart/cart.component';
import { ProductShopComponent } from './componentsCart/product-shop/product-shop.component';
import { CheckoutComponent } from './componentsCart/checkout/checkout.component';
import { MenuAdminComponent } from './menu-admin/menu-admin.component';


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
    ViewMedicalHistoriesComponent,
    SignInComponent,
    SpinnerComponent,
    LoginComponent,
    DashboardComponent,
    NavbarComponent,
    ClientDniModalComponent,
    ListClientsComponent,
    AddEditClientComponent,
    ProgressBarComponent,
    ListClientsComponent,
    DetailClientComponent,
    CreateObservationDialogComponent,
    ShowObservationDialogComponent,
    EditObservationDialogComponent,
    DeleteObservationDialogComponent,
    ListProductsComponent,
    AddEditProductComponent,
    VaccineComponent,
    CartComponent,
    ProductShopComponent,
    CheckoutComponent,
    MenuAdminComponent
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
    ReactiveFormsModule,
    MatTableModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,

  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: AddTokenInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
