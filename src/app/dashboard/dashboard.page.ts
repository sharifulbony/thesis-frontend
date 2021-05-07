import { Component, OnInit } from '@angular/core';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { MenuController, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  appointments: any;
  approvalData: any;
  roles: any;

  constructor(public nativeStorage: NativeStorage, private apiService: ApiService, private menuCtrl: MenuController, private router: Router,) {
    this.roles = this.apiService.roles;
  }
  ionViewWillEnter() {
    this.menuCtrl.enable(true);
  }

  ngOnInit() {

    //console.log("approval option = " + this.apiService.approvalOption);

    this.nativeStorage.getItem('userBasicInfo')
      .then(
        data => {
          // console.log("get item!");
          // console.log("get item:" + data.token);
          // this.apiService.token = data.token;
          // this.apiService.userId = data.userId;
          // console.log(this.apiService.token);
          // load dashboard data


          this.apiService.dashboard().then(result => {
            console.log(result);
            this.appointments = result;
            // console.log("result:" + this.appointments[0].name);
            // alert(this.data.fullName);
            // this.apiService.fullName = this.data.fullName;
            // this.apiService.phone = this.data.phone;
            // this.apiService.departmentId = this.data.departmentId;
          }).catch(err => {
            alert("error" + err.message);
          });
        },
        error => console.error(error)
      );

  }
  navigateAppointment() {
    this.router.navigate(['/new-appointment'])
  }
  navigateVisitor() {
    this.router.navigate(['/add-visitor'])
  }

}
