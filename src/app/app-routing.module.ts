import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InfectionDetailsComponent } from './infection-details/infection-details.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: 'infections', 
    component: HomeComponent,
    children: [
      {
        path: 'details/:id',
        component: InfectionDetailsComponent
      }      
    ]  
  },   
  { path: '', redirectTo: '/infections', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
