import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
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



export const routes: Routes = [
    {path: '', redirectTo: 'Home', pathMatch: 'full'},
    {path: 'Home', component: HomeComponent},
    {path: 'ViewPet/:petId', component: ViewPetComponent},
    {path: 'AddPet', component: AddPetComponent},
    {path: 'EditPet/:id', component: EditPetComponent},
    {path: 'ViewClientPet', component:ViewClientPetComponent},
    {path: 'ViewAllPet', component: ViewAllPetComponent},
    {path:'addPet/:idClient', component:AddEditPetComponent},
    {path: 'editPet/:id/:idClient', component: AddEditPetComponent},
    {path:'detailPet/:id',component:DetailPetComponent},
    {path: 'ViewProfessional/:id', component: ViewProfessionalComponent},
    {path: 'viewAllProfessionals', component: ViewAllProfessionalComponent},
    {path: 'AddProfessional', component: AddProfessionalComponent},
    {path: 'EditProfessional/:id', component: EditProfessionalComponent},
    
    {path: 'ViewMedicalHistory/:petId', component: ViewMedicalHistoriesComponent},

    {path: 'login',component: LoginComponent },
    {path: 'signIn', component: SignInComponent},
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
            path: 'client-pets',
            component: ClientPetsComponent,
            canActivate: [AuthGuard],
            data: { role: 'client' }
          }
        ]
      },
     {path: 'profesional-dashboard', component: DashboardPrComponent, canActivate: [AuthGuard], data: { role: 'professional' } },
    {path: 'navbar', component: NavbarComponent},


    //Cliente
    {path: 'listClients', component: ListClientsComponent},
    {path: 'addClient', component: AddEditClientComponent},
    {path: 'editClient/:id', component: AddEditClientComponent},
    {path: 'detailClient/:id',component: DetailClientComponent},
    {path: 'listPets/:id', component: ListPetsComponent},
    //Producto
    {path: 'listProducts', component: ListProductsComponent},
    {path: 'addProduct', component:AddEditProductComponent},
    {path: 'editProduct/:id', component: AddEditProductComponent},
    {path: 'vaccines', component: VaccineComponent},

    //Carrito
    {path: 'productShop', component: ProductShopComponent},
    {path: 'cart', component: CartComponent},
    {path: 'listOrders', component: ListOrdersComponent},
    { path: 'detailOrder/:id', component: DetailOrderComponent },

    //servicios
    {path: 'listFacilities', component: ListFacilitiesComponent},
    {path: 'addFacility', component: AddEditFacilityComponent},
    {path: 'editFacility/:id', component: AddEditFacilityComponent},
    {path: 'detailFacility/:id', component: DetailFacilityComponent},
    {path: 'FacilityShop', component: FacilityShopComponent},

    //Turnos
    {path: 'listFutureAppointments', component: ListFutureAppointmentsComponent},
    {path:'newAppointment/:id',component: NewAppointmentComponent},
    {path: 'listAllAppointments', component: ListAppointmentsComponent},

    //admin
    {path: 'menuAdmin', component:MenuAdminComponent},

    //Contacto
    {path: 'contact', component: ContactComponent},

    { path: '**', component: PageNotFoundComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule { }
