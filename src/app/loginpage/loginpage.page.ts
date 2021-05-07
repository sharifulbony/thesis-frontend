import { Component, OnInit } from '@angular/core';
import { MenuController, AlertController } from '@ionic/angular';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { Router } from '@angular/router';
// import { FormBuilder, FormGroup, FormControl, Validators  } from '@angular/forms';

import { ApiService } from '../services/api.service';
import { IfStmt } from '@angular/compiler';

@Component({
  selector: 'app-loginpage',
  templateUrl: './loginpage.page.html',
  styleUrls: ['./loginpage.page.scss'],
})
export class LoginpagePage implements OnInit {
  // private ionicForm  : FormGroup;
  data: any;
  result: any;
  rememberMe: boolean;
  image ='/resources/bcc_logo.png';
  // user = { username: '8801911721388', password: 'ePass147' };
  user = { phonenumber: '', password: '' };

  constructor(private apiService: ApiService, private menuCtrl: MenuController, public alertCtrl: AlertController, public nativeStorage: NativeStorage, 
    private router: Router) {
      // private formBuilder: FormBuilder
      //form validation rules set
    // this.ionicForm = this.formBuilder.group({
    //   this.user.user: ['', [Validators.required, Validators.minLength(2)]],
    //   email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
    //   dob: [this.defaultDate],
    //   mobile: ['', [Validators.required, Validators.pattern('^[0-9]+$')]]
    // })
      this.rememberMe=true;
      this.nativeStorage.getItem('userLoginInfo').then(data => {
        console.log(data);
  
        this.user.phonenumber = data.phonenumber;
        this.user.password = data.password;

        console.log("saved data: "+this.user.phonenumber);
      });
  
  }
  ionViewWillEnter() {
    this.menuCtrl.enable(false);
   }
  ngOnInit() {
    
    //internet check
  }




  loginUser() {
    // if (this.user.phonenumber == '' || this.user.password == '') {
    //   this.presentAlert('Username and password both are required');
    //   this.navigateLoginPage();
    // }
    if (this.user.phonenumber == '') {
      this.presentAlert('Phone number are required');
      this.navigateLoginPage();
    }else{
      if(this.rememberMe){
        this.nativeStorage.setItem('userLoginInfo', { phonenumber: this.user.phonenumber})
        .then(
          () =>{
            console.error('Stored login info');
            // this.navigate();
          },
          error => console.error('Error storing item', error)
        );
        }
    
  
      // this.data = this.apiService.loginUser(this.user);
      var flag=0;

      this.apiService.loginUser(this.user.phonenumber).then(result => {
        console.log(result);
        this.data = result;
        this.apiService.userId=this.data[0].id;
        this.apiService.username=this.data[0].name;    
        console.log("result:" + this.data.userId);
        // alert(this.data.userId);
        this.nativeStorage.setItem('userBasicInfo', { userId: this.data[0].id, userName: this.data[0].name, userPhone:this.data[0].phone})
        .then(
          () =>{
                 
             this.navigateDashboard();

          },
          error => console.error('Error storing item', error)
        );
      }).catch(err => {
        this.presentAlert('Invalid credential '+ "<ion-icon name=\"sad-outline\"></ion-icon>");
      });
      
      // save userId and token for further use

      
    }
    // remember pass
    

  }

  async presentAlert(message) {
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: '',
      subHeader: 'Error!',
      message: message,
      buttons: ['Retry']
    });

    await alert.present();
  }

  async testAlert(data) {
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: 'Test',
      subHeader: '',
      message: data,
      buttons: ['OK']
    });

    await alert.present();
  }

  
  navigateDashboard(){
    this.router.navigate(['/dashboard'])
  }

  navigateLoginPage(){
    this.router.navigate(['/loginpage'])
  }

  resetPassword(){
    this.router.navigate(['/send-otp']);
  }
  registration(){
    this.router.navigate(['/register']);
  }

}
