import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { AddPetComponent } from './add-pet/add-pet.component';
import { EditPetComponent } from './edit-pet/edit-pet.component';
import { HomeComponent } from './home/home.component';
import { ViewPetComponent } from './view-pet/view-pet.component';
import { ViewClientPetComponent } from './view-client-pet/view-client-pet.component';
import {ViewAllPetComponent} from './view-all-pet/view-all-pet.component'



export const routes: Routes = [
    {path: '', redirectTo: 'Home', pathMatch: 'full'},
    {path: 'Home', component: HomeComponent},
    {path: 'ViewPet/:petId', component: ViewPetComponent},
    {path: 'AddPet', component: AddPetComponent},
    {path: 'EditPet/:petId', component: EditPetComponent},
    {path: 'ViewClientPet', component:ViewClientPetComponent},
    {path: 'ViewAllPet', component: ViewAllPetComponent}

];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule { }
