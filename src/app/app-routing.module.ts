import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ViewComponent } from './view/view.component';
import { AllComponent } from './all/all.component';
import { CodesComponent } from './codes/codes.component';
import { ChartsComponent } from './charts/charts.component';


const routes: Routes = [
  {
    component: AllComponent,
    path: ''
  },
  {
    component: CodesComponent,
    path: 'codes'
  },
  {
    component: ChartsComponent,
    path: 'charts'
  },
  {
    component: ViewComponent,
    path: ':id'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
