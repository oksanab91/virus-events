import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { InfectionDetailsComponent } from './infection-details/infection-details.component';
import { InfectionListComponent } from './infection-list/infection-list.component';
import { TopBarComponent } from './top-bar/top-bar.component';

@NgModule({
  declarations: [
    HomeComponent,
    InfectionListComponent,
    InfectionDetailsComponent,
    TopBarComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', 
        component: HomeComponent,
        children: [
          {
            path: 'details/:id',
            component: InfectionDetailsComponent
          }      
        ]  
      }
    ])
  ]
})
export class MainModule { }
