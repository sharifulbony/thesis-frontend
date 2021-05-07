import { Component, OnInit } from '@angular/core';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { MenuController, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-all-appointments',
  templateUrl: './all-appointments.page.html',
  styleUrls: ['./all-appointments.page.scss'],
})
export class AllAppointmentsPage implements OnInit {
  appointments: any;

  constructor(public nativeStorage: NativeStorage, private apiService: ApiService, 
    private menuCtrl: MenuController, private router: Router) { }

  ngOnInit() {
    this.apiService.allAppointments().then(result => {
      console.log(result);
      this.appointments = result;
    }).catch(err => {
      alert("error" + err.message);
    });
  }
  ionViewWillEnter() {
    this.menuCtrl.enable(true);
  }

}
