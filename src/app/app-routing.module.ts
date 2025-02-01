import { RouterModule, Routes } from '@angular/router';
import { Component, NgModule } from '@angular/core';
import { AddPetComponent } from './componentsPet/add-pet/add-pet.component';
import { EditPetComponent } from './componentsPet/edit-pet/edit-pet.component';
import { HomeComponent } from './home/home.component';
import { ViewPetComponent } from './componentsPet/view-pet/view-pet.component';
import { ViewClientPetComponent } from './view-client-pet/view-client-pet.component';
import {ViewAllPetComponent} from './componentsPet/view-all-pet/view-all-pet.component'
import { ViewMedicalHistoriesComponent } from './componentsMedicalHistory/view-medical-histories/view-medical-histories.component';
import { LoginComponent } from './componentsLogin/login/login.component';
import { SignInComponent } from './componentsLogin/sign-in/sign-in.component';
import { DashboardComponent } from './componentsLogin/dashboard/dashboard.component';
import { AuthGuard } from './utils/auth.guard';
import { NavbarComponent } from './componentsLogin/navbar/navbar.component';
import { ListClientsComponent } from './componentsClient/list-clients/list-clients.component';
import { AddEditClientComponent } from './componentsClient/add-edit-client/add-edit-client.component';
import { DetailClientComponent } from './componentsClient/detail-client/detail-client.component';
import { ListProductsComponent } from './componentsProduct/list-products/list-products.component';
import { AddEditProductComponent } from './componentsProduct/add-edit-product/add-edit-product.component';
import { VaccineComponent } from './componentsMedicalHistory/vaccine/vaccine.component';
import { ProductShopComponent } from './componentsCart/product-shop/product-shop.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { CartComponent } from './componentsCart/cart/cart.component';
import { MenuAdminComponent } from './menu-admin/menu-admin.component';
import { ListPetsComponent } from './componentsPetxClients/list-pets/list-pets.component';
import { AddEditPetComponent } from './componentsPetxClients/add-edit-pet/add-edit-pet.component';
import { DetailPetComponent } from './componentsPetxClients/detail-pet/detail-pet.component';
import { ListFacilitiesComponent } from './componentsFacility/list-facilities/list-facilities.component';
import { AddEditFacilityComponent } from './componentsFacility/add-edit-facility/add-edit-facility.component';
import { DetailFacilityComponent } from './componentsFacility/detail-facility/detail-facility.component';
import { ViewAllProfessionalComponent } from './componentsProfessional/view-all-professional/view-all-professional.component';
import {AddProfessionalComponent} from './componentsProfessional/add-professional/add-professional.component';
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
import { AccountSettingsComponent } from './componentsUserClient/account-settings/account-settings.component';
import path from 'path';
import { PersonalInfoPrComponent } from './componentsUserProf/personal-info-pr/personal-info-pr.component';
import { AccountSettingsPrComponent } from './componentsUserProf/account-settings-pr/account-settings-pr.component';
import { UpcomingAppointmentsComponent } from './componentsUserProf/upcoming-appointments/upcoming-appointments.component';
import { PetsMedicalHistoryListComponent } from './componentsUserProf/pets-medical-history-list/pets-medical-history-list.component';
import { ViewPetProComponent } from './componentsUserProf/view-pet-pro/view-pet-pro.component';
import { ClientOrdersComponent } from './componentsUserClient/client-orders/client-orders.component';
import { ClientOrdersDetailComponent } from './componentsUserClient/client-orders-detail/client-orders-detail.component';
import { CheckoutComponent } from './componentsCart/checkout/checkout.component';
import { MonthlyIncomeComponent } from './reportComponent/monthly-income/monthly-income.component';
import { MostRequestedServiceComponent } from './reportComponent/most-requested-service/most-requested-service.component';
import { MostSoldProductsComponent } from './reportComponent/most-sold-products/most-sold-products.component';
import { RegisteredClientsAndPetsComponent } from './reportComponent/registered-clients-and-pets/registered-clients-and-pets.component';
import { MostActiveProfessionalsComponent } from './reportComponent/most-active-professionals/most-active-professionals.component';
import { AdminReportsComponent } from './reportComponent/admin-reports/admin-reports.component';
import { AppointmentsByProfessionalComponent } from './reportComponent/appointments-by-professional/appointments-by-professional.component';
import { MostAttendedFacilitiesComponent } from './reportComponent/most-attended-facilities/most-attended-facilities.component';
import { ProfessionalReportsComponent } from './reportComponent/professional-reports/professional-reports.component';
import { ClientReportsComponent } from './reportComponent/client-reports/client-reports.component';
import { InfoComponent } from './home/info/info.component';



export const routes: Routes = [
    {path: '', redirectTo: 'Home', pathMatch: 'full'},
    {path: 'Home', component: HomeComponent},
    {path: 'info', component: InfoComponent},
    
    { path: 'FacilityShop', component: FacilityShopComponent },
    
    {path: 'login',component: LoginComponent },
    {path: 'signIn', component: SignInComponent},
    {path: 'checkout', component: CheckoutComponent},
    {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [AuthGuard],
        data: { role: 'client' },
        children: [
          {
            path: 'personal-info',
            component: PersonalInfoComponent,
            canActivate: [AuthGuard], 
            data: { role: 'client' }
          },
          {
            path: 'checkout',
            component: CheckoutComponent,
            canActivate: [AuthGuard], 
            data: { role: 'client' }
          },
          {
            path: 'client-pets',
            component: ClientPetsComponent,
            canActivate: [AuthGuard],
            data: { role: 'client' }
          },
          {
            path: 'client-appointments',
            component: ClientAppointmentComponent,
            canActivate: [AuthGuard],
            data: {role: 'client'}
          },
          {
            path: 'account-settings',
            component: AccountSettingsComponent,
            canActivate: [AuthGuard],
            data: {role: 'client'}
          },
          {
            path: 'client-orders',
            component: ClientOrdersComponent,
            canActivate: [AuthGuard],
            data: {role: 'client'}
          },
          {
            path: 'client-orders/client-order-detail/:orderid',
            component: ClientOrdersDetailComponent,
            canActivate: [AuthGuard],
            data:{role:'client'}
          },
          {
            path: 'client-reports',
            component: ClientReportsComponent,
            canActivate: [AuthGuard],
            data: {role: 'client'}
          }
        ]
      },
     {path: 'profesional-dashboard', component: DashboardPrComponent, canActivate: [AuthGuard], data: { role: 'professional' },
      children:[{
        path: 'personal-info-pr',
        component: PersonalInfoPrComponent,
        canActivate: [AuthGuard],
        data: {role: 'professional'}
      },
      {
        path: 'account-settings-pr',
        component: AccountSettingsPrComponent,
        canActivate: [AuthGuard],
        data: {role: 'professional'}
      },
      {
        path: 'upcoming-appointments',
        component: UpcomingAppointmentsComponent,
        canActivate: [AuthGuard],
        data: {role: 'professional'}
      },
      {
        path:'pets-medical-history-list',
        component: PetsMedicalHistoryListComponent,
        canActivate: [AuthGuard],
        data: {role:'professional'}
      },
      {
        path:'ViewPetPro/:petId',
        component: ViewPetProComponent,
        canActivate:[AuthGuard],
        data:{role:'professional'}
      },
      { 
        path: 'ViewMedicalHistory/:petId',
        component: ViewMedicalHistoriesComponent,
        canActivate:[AuthGuard],
        data:{role:'professional'} },
        {path: 'professional-reports', 
          component: ProfessionalReportsComponent,
          canActivate: [AuthGuard],
          data: {role: 'professional'}
        },

      ]


    },
    {path: 'navbar', component: NavbarComponent},


    {
      path: '',
      canActivate: [AuthGuard],
      data: { role: 'admin' },
      children: [

        {path: 'info', component: InfoComponent},

        // Cliente
        { path: 'listClients', component: ListClientsComponent },
        { path: 'addClient', component: AddEditClientComponent },
        { path: 'editClient/:id', component: AddEditClientComponent },
        { path: 'detailClient/:id', component: DetailClientComponent },
        { path: 'listPets/:id', component: ListPetsComponent },
  
        // Mascota
        { path: 'ViewPet/:petId', component: ViewPetComponent },
        { path: 'AddPet', component: AddPetComponent },
        { path: 'EditPet/:id', component: EditPetComponent },
        { path: 'ViewClientPet', component: ViewClientPetComponent },
        { path: 'ViewAllPet', component: ViewAllPetComponent },
        { path: 'addPet/:idClient', component: AddEditPetComponent },
        { path: 'editPet/:id/:idClient', component: AddEditPetComponent },
        { path: 'detailPet/:id', component: DetailPetComponent },
        { path: 'ViewMedicalHistory/:petId', component: ViewMedicalHistoriesComponent },
  
        // Profesional
        { path: 'ViewProfessional/:id', component: ViewProfessionalComponent },
        { path: 'viewAllProfessionals', component: ViewAllProfessionalComponent },
        { path: 'AddProfessional', component: AddProfessionalComponent },
        { path: 'EditProfessional/:id', component: EditProfessionalComponent },
  
        // Producto
        { path: 'listProducts', component: ListProductsComponent },
        { path: 'addProduct', component: AddEditProductComponent },
        { path: 'editProduct/:id', component: AddEditProductComponent },
        { path: 'vaccines', component: VaccineComponent },
  
        // Servicios
        { path: 'listFacilities', component: ListFacilitiesComponent },
        { path: 'addFacility', component: AddEditFacilityComponent },
        { path: 'editFacility/:id', component: AddEditFacilityComponent },
        { path: 'detailFacility/:id', component: DetailFacilityComponent },
        
  
        // Turnos
        { path: 'listFutureAppointments', component: ListFutureAppointmentsComponent },
        { path: 'newAppointment/:id', component: NewAppointmentComponent },
        { path: 'listAllAppointments', component: ListAppointmentsComponent },
        
        //Reportes
        {path: 'admin-reports', component: AdminReportsComponent},


        // Admin Menu
        { path: 'menuAdmin', component: MenuAdminComponent },
      ],
    },


    //Carrito
    {path: 'productShop', component: ProductShopComponent},
    {path: 'cart', component: CartComponent},
    {path: 'listOrders', component: ListOrdersComponent},
    { path: 'detailOrder/:id', component: DetailOrderComponent },
    //Contacto
    {path: 'contact', component: ContactComponent},

    { path: '**', component: PageNotFoundComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule { }
