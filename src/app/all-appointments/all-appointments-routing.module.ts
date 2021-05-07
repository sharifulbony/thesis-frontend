import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AllAppointmentsPage } from './all-appointments.page';

const routes: Routes = [
  {
    path: '',
    component: AllAppointmentsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AllAppointmentsPageRoutingModule {}
