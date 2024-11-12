import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { AddPetComponent } from './add-pet/add-pet.component';
import { EditPetComponent } from './edit-pet/edit-pet.component';
import { HomeComponent } from './home/home.component';
import { ViewPetComponent } from './view-pet/view-pet.component';
import { ViewClientPetComponent } from './view-client-pet/view-client-pet.component';
import {ViewAllPetComponent} from './view-all-pet/view-all-pet.component'
import { ViewMedicalHistoriesComponent } from './view-medical-histories/view-medical-histories.component';
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
import { VaccineComponent } from './vaccine/vaccine.component';
import { ProductShopComponent } from './componentsCart/product-shop/product-shop.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { CartComponent } from './componentsCart/cart/cart.component';
import { MenuAdminComponent } from './menu-admin/menu-admin.component';
import { ListPetsComponent } from './componentsPetxClients/list-pets/list-pets.component';
import { ListFacilitiesComponent } from './componentsFacility/list-facilities/list-facilities.component';
import { AddEditFacilityComponent } from './componentsFacility/add-edit-facility/add-edit-facility.component';
import { DetailFacilityComponent } from './componentsFacility/detail-facility/detail-facility.component';



export const routes: Routes = [
    {path: '', redirectTo: 'Home', pathMatch: 'full'},
    {path: 'Home', component: HomeComponent},
    {path: 'ViewPet/:petId', component: ViewPetComponent},
    {path: 'AddPet', component: AddPetComponent},
    {path: 'EditPet/:petId', component: EditPetComponent},
    {path: 'ViewClientPet', component:ViewClientPetComponent},
    {path: 'ViewAllPet', component: ViewAllPetComponent},
    
    {path: 'ViewMedicalHistory/:petId', component: ViewMedicalHistoriesComponent},

    {path: 'login',component: LoginComponent },
    {path: 'signIn', component: SignInComponent},
    {path: 'dashboard', component: DashboardComponent,canActivate: [AuthGuard]},
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

    //servicios
    {path: 'listFacilities', component: ListFacilitiesComponent},
    {path: 'addFacility', component: AddEditFacilityComponent},
    {path: 'editFacility/:id', component: AddEditFacilityComponent},
    {path: 'detailFacility/:id', component: DetailFacilityComponent},

    //admin
    {path: 'menuAdmin', component:MenuAdminComponent},


    { path: '**', component: PageNotFoundComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule { }
