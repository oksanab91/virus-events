import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppStartComponent } from './app-start/app-start.component';

const routes: Routes = [
  { path: 'start', component: AppStartComponent },
  { path: 'infections', loadChildren: () => import('./main/main.module').then(m => m.MainModule)},   
  { path: '', redirectTo: '/start', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
