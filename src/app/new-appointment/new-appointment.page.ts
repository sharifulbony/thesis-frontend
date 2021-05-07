import { Component, OnInit } from '@angular/core';
// import { async } from '@angular/core/testing';
import { ApiService } from '../services/api.service';
import { AlertController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
// import { time } from 'console';

@Component({
  selector: 'app-new-appointment',
  templateUrl: './new-appointment.page.html',
  styleUrls: ['./new-appointment.page.scss'],
})
export class NewAppointmentPage implements OnInit {
  users: any;

  newAppointmentForm: FormGroup;
  Appointment = { id: "", name: "", date: "", time: "", hospital: "" };

  constructor(public apiService: ApiService, private alertctrl: AlertController, private router: Router, private formBuilder: FormBuilder, private toastCtrl: ToastController,
    public nativeStorage: NativeStorage) {
 
    this.Appointment.date= new Date().toDateString();
    this.Appointment.time= new Date().toISOString();
    

    // this.newAppointmentForm = this.formBuilder.group({
    //   visitor: ['', Validators.compose([Validators.minLength(0), Validators.maxLength(200), Validators.required])],
    //   dateTime: ['', Validators.compose([Validators.required])],
    //   purpose: ['', Validators.compose([Validators.required])],
    //   requestDetails: ['', Validators.compose([Validators.minLength(0), Validators.maxLength(500), Validators.required,])],
    //   approvalOf: ['', Validators.compose([Validators.required])]
    // });

    // if (apiService.approvalOption == 'Dept. Admin') {
    //   this.newAppointmentForm.get('approvalOf').clearValidators();
    //   this.newAppointmentForm.get('approvalOf').updateValueAndValidity();
    // }


    // this.apiService.getOfficials().then(result => {
    //   console.log(result);
    //   this.Officials = result;
    //   console.log("loading of officials is done");
    // }).catch(err => {
    //   alert("error" + err.message);
    // });

    // console.log(this.apiService.roles.indexOf('Official'));
    // console.log(this.apiService.roles);

    // if (this.apiService.roles.indexOf('Official') > -1) {
    //   this.Appointment.approvalOf = this.apiService.userId;
    //   this.approvalOfName = this.apiService.fullName;
    //   this.showOfficialList = false;
    //   this.selfApproval = true;
    //   console.log(this.apiService.phone);
    //   // this.filteredOfficials = this.Officials.filter(item => {
    //   //   return item.phone.toLowerCase().indexOf(this.apiService.phone) > -1;
    //   // });

    // } else {
    //   this.selfApproval = false;
    // }

  }

  ngOnInit() {
    this.nativeStorage.getItem('userBasicInfo').then(data => {
      this.Appointment.id=data.userId;
      this.Appointment.name=data.userName;
      console.log("saved data: "+data.userId);
    });
  }

  createAppointment() {
    console.log("Appointment:" + this.Appointment.id);
    console.log("Appointment:" + this.Appointment.name);
    console.log("Appointment:" + this.Appointment.date.slice(0,10));
    console.log("Appointment:" + this.Appointment.time.slice(11,16));
    console.log("Appointment:" + this.Appointment.hospital);

    this.apiService.createAppointment(this.Appointment).then(result => {
      console.log(result);
      this.presentToast('Appointment has been created Successfully!');
      // alert("Appointment has been created Successfully!");
      this.navigateDashboard();

    }).catch(err => {
      // alert("error" + err.message);
      this.presentToast('Try again later!');
      // alert("Try again later!");
    });

  }

  // refreshPage(){
  //   this.router.navigate(['/new-appointment'])
  // }

  async presentAlertConfirm() {
    const alert = await this.alertctrl.create({
      cssClass: 'my-custom-class',
      header: 'Create Appointment?',
      message: 'Please confirm to create appointment',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
            this.presentToast('Appointment is discarded');
          }
        }, {
          text: 'Confirm',
          handler: () => {
            console.log('Confirm Okay');
            this.createAppointment();
          }
        }
      ]
    });

    await alert.present();
  }

  async presentToast(data) {
    const toast = await this.toastCtrl.create({
      message: data,
      duration: 2000
    });
    toast.present();
  }
  navigateDashboard() {
    this.router.navigate(['/dashboard'])
  }

}
