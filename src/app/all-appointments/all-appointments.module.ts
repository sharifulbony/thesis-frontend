import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AllAppointmentsPageRoutingModule } from './all-appointments-routing.module';

import { AllAppointmentsPage } from './all-appointments.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AllAppointmentsPageRoutingModule
  ],
  declarations: [AllAppointmentsPage]
})
export class AllAppointmentsPageModule {}
