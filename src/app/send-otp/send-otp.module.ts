import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SendOtpPageRoutingModule } from './send-otp-routing.module';

import { SendOtpPage } from './send-otp.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    SendOtpPageRoutingModule
  ],
  declarations: [SendOtpPage]
})
export class SendOtpPageModule {}
