import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ViewPetComponent } from './componentsPet/view-pet/view-pet.component';
import { AddPetComponent } from './componentsPet/add-pet/add-pet.component';
import { EditPetComponent } from './componentsPet/edit-pet/edit-pet.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { RouterModule } from '@angular/router';
import {ClientDniModalComponent} from './client-dni-modal/client-dni-modal.component';
import { ViewClientPetComponent } from './view-client-pet/view-client-pet.component';
import { ViewAllPetComponent } from './componentsPet/view-all-pet/view-all-pet.component';
import {ViewMedicalHistoriesComponent} from './componentsMedicalHistory/view-medical-histories/view-medical-histories.component'
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
import { CreateObservationDialogComponent } from './componentsMedicalHistory/create-observation-dialog/create-observation-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ShowObservationDialogComponent } from './componentsMedicalHistory/show-observation-dialog/show-observation-dialog.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { EditObservationDialogComponent } from './componentsMedicalHistory/edit-observation-dialog-component/edit-observation-dialog-component.component';
import { DeleteObservationDialogComponent } from './componentsMedicalHistory/delete-observation-dialog/delete-observation-dialog.component';
import { ListProductsComponent } from './componentsProduct/list-products/list-products.component';
import { AddEditProductComponent } from './componentsProduct/add-edit-product/add-edit-product.component';
import { VaccineComponent } from './componentsMedicalHistory/vaccine/vaccine.component';
import { CartComponent } from './componentsCart/cart/cart.component';
import { ProductShopComponent } from './componentsCart/product-shop/product-shop.component';
import { CheckoutComponent } from './componentsCart/checkout/checkout.component';
import { MenuAdminComponent } from './menu-admin/menu-admin.component';
import { ListPetsComponent } from './componentsPetxClients/list-pets/list-pets.component';
import { AddEditPetComponent } from './componentsPetxClients/add-edit-pet/add-edit-pet.component';
import { DetailPetComponent } from './componentsPetxClients/detail-pet/detail-pet.component';
import { ListFacilitiesComponent } from './componentsFacility/list-facilities/list-facilities.component';
import { AddEditFacilityComponent } from './componentsFacility/add-edit-facility/add-edit-facility.component';
import { DetailFacilityComponent } from './componentsFacility/detail-facility/detail-facility.component';
import { MatListModule } from '@angular/material/list';
import { LinkVaccineDialogComponent } from './componentsMedicalHistory/link-vaccine-dialog/link-vaccine-dialog.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ViewAllProfessionalComponent } from './componentsProfessional/view-all-professional/view-all-professional.component';
import { AddProfessionalComponent } from './componentsProfessional/add-professional/add-professional.component';
import { ViewProfessionalComponent } from './componentsProfessional/view-professional/view-professional.component';
import { EditProfessionalComponent } from './componentsProfessional/edit-professional/edit-professional.component';
import { FacilityShopComponent } from './componentsFacility/facility-shop/facility-shop.component';
import { ListFutureAppointmentsComponent } from './componentsAppointment/list-future-appointments/list-future-appointments.component';
import { NewAppointmentComponent } from './componentsAppointment/new-appointment/new-appointment.component';
import { ListAppointmentsComponent } from './componentsAppointment/list-appointments/list-appointments.component';
import { ContactComponent } from './componentsContact/contact/contact.component';
import { ListOrdersComponent } from './componentsOrder/list-orders/list-orders.component';
import { DetailOrderComponent } from './componentsOrder/detail-order/detail-order.component';
import { DashboardPrComponent } from './componentsLogin/dashboard-pr/dashboard-pr.component';
import { PersonalInfoComponent } from './componentsUserClient/personal-info/personal-info.component';
import { ClientPetsComponent } from './componentsUserClient/client-pets/client-pets.component';
import { ClientAppointmentComponent } from './componentsUserClient/client-appointments/client-appointments.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { AccountSettingsComponent } from './componentsUserClient/account-settings/account-settings.component';
import { PersonalInfoPrComponent } from './componentsUserProf/personal-info-pr/personal-info-pr.component';
import { AccountSettingsPrComponent } from './componentsUserProf/account-settings-pr/account-settings-pr.component';
import { UpcomingAppointmentsComponent } from './componentsUserProf/upcoming-appointments/upcoming-appointments.component';
import { PetsMedicalHistoryListComponent } from './componentsUserProf/pets-medical-history-list/pets-medical-history-list.component';
import { ViewPetProComponent } from './componentsUserProf/view-pet-pro/view-pet-pro.component';
import { ClientOrdersComponent } from './componentsUserClient/client-orders/client-orders.component';
import { ClientOrdersDetailComponent } from './componentsUserClient/client-orders-detail/client-orders-detail.component';
import { MonthlyIncomeComponent } from './reportComponent/monthly-income/monthly-income.component';
import { MostRequestedServiceComponent } from './reportComponent/most-requested-service/most-requested-service.component';
import { MostSoldProductsComponent } from './reportComponent/most-sold-products/most-sold-products.component';
import { RegisteredClientsAndPetsComponent } from './reportComponent/registered-clients-and-pets/registered-clients-and-pets.component';
import { MostActiveProfessionalsComponent } from './reportComponent/most-active-professionals/most-active-professionals.component';
import { AdminReportsComponent } from './reportComponent/admin-reports/admin-reports.component';
import { AppointmentsByProfessionalComponent } from './reportComponent/appointments-by-professional/appointments-by-professional.component';
import { MostAttendedFacilitiesComponent } from './reportComponent/most-attended-facilities/most-attended-facilities.component';
import { ProfessionalReportsComponent } from './reportComponent/professional-reports/professional-reports.component';
import { ClientMonthlySpendingComponent } from './reportComponent/client-monthly-spending/client-monthly-spending.component';
import { ClientReportsComponent } from './reportComponent/client-reports/client-reports.component';
import { MostUsedFacilitiesComponent } from './reportComponent/most-used-facilities/most-used-facilities.component';
import { MostAttendedPetsComponent } from './reportComponent/most-attended-pets/most-attended-pets.component';
import { InfoComponent } from './home/info/info.component';
import { SideCartComponent } from './componentsCart/side-cart/side-cart.component';
import { FooterComponent } from './footer/footer.component';



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
    ListClientsComponent,
    AddEditClientComponent,
    ProgressBarComponent,
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
    MenuAdminComponent,
    ListPetsComponent,
    AddEditPetComponent,
    DetailPetComponent,
    ListFacilitiesComponent,
    AddEditFacilityComponent,
    DetailFacilityComponent,
    LinkVaccineDialogComponent,
    ViewAllProfessionalComponent,
    AddProfessionalComponent,
    ViewProfessionalComponent,
    EditProfessionalComponent,
    FacilityShopComponent,
    ListFutureAppointmentsComponent,
    NewAppointmentComponent, 
    ListAppointmentsComponent,
    ContactComponent,
    ListOrdersComponent,
    DetailOrderComponent,
    DashboardPrComponent,
    PersonalInfoComponent,
    ClientPetsComponent,
    ClientAppointmentComponent,
    AccountSettingsComponent,
    PersonalInfoPrComponent,
    AccountSettingsPrComponent,
    UpcomingAppointmentsComponent,
    PetsMedicalHistoryListComponent,
    ViewPetProComponent,
    ClientOrdersDetailComponent,
    ClientOrdersComponent,
    MonthlyIncomeComponent,
    MostRequestedServiceComponent,
    MostSoldProductsComponent,
    RegisteredClientsAndPetsComponent,
    MostActiveProfessionalsComponent,
    AdminReportsComponent,
    AppointmentsByProfessionalComponent,
    MostAttendedFacilitiesComponent,
    ProfessionalReportsComponent,
    ClientMonthlySpendingComponent,
    ClientReportsComponent,
    MostActiveProfessionalsComponent,
    MostUsedFacilitiesComponent,
    MostAttendedPetsComponent,
    InfoComponent,
    SideCartComponent,
    FooterComponent


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
    MatListModule,
    MatCheckboxModule,
    MatExpansionModule 
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AddTokenInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
