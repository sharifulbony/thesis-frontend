import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, ToastController  } from '@ionic/angular';
// import { REACTIVE_FORM_DIRECTIVES } from '@angular/forms'

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.page.html',
  styleUrls: ['./change-password.page.scss'],
})
export class ChangePasswordPage implements OnInit {
  apiResponse: any;
  changePassword={currentPassword:"", newPassword:"", confirmPassword:""};
  changePassForm: FormGroup;
//   changePasswordForm = this.formBuilder.group({
//     currentPassword: ['', Validators.compose([Validators.minLength(8),Validators.maxLength(30),Validators.required])],
//     newPassword: ['', Validators.compose([Validators.minLength(8),Validators.maxLength(30),Validators.required])],
//     confirmPassword: ['', Validators.compose([Validators.minLength(8),Validators.maxLength(30),Validators.required])]
// });

 
  constructor(private apiService: ApiService, private formBuilder: FormBuilder, private router: Router, private alertctrl: AlertController, private toastCtrl: ToastController ) { 
    // this.changePassForm = new FormControl('', Validators.required);
    this.changePassForm = this.formBuilder.group({
      currentPassword: ['', Validators.compose([Validators.minLength(8),Validators.maxLength(30),Validators.required])],
      newPassword: ['', Validators.compose([Validators.minLength(8),Validators.maxLength(30),Validators.required])],
      confirmPassword: ['', Validators.compose([Validators.minLength(8),Validators.maxLength(30),Validators.required,])]
    }, {
      validators: this.mustMatch.bind(this)
  });
    
  }


  ngOnInit() {
  }

  changePass(){
    console.log("In change password");
    this.apiService.changePass(this.changePassword).then(result => {
      console.log(result);
      this.apiResponse=result;
      // alert("Password changed successfully!");
      if(this.apiResponse.code==0){
        this.presentToast('Changing password is successful');
      this.logout();
      }else{
        this.presentToast(this.apiResponse.message);
      }
      

      
    }).catch(err => {
      // alert("error" + err.message);
      this.presentToast('Error');
    });

  }

  mustMatch(formGroup: FormGroup){
    console.log("Must match");
    const { value: password } = formGroup.get('newPassword');
    const { value: confirmPassword } = formGroup.get('confirmPassword');
    console.log(password);
    return password === confirmPassword ? null : { passwordNotMatch: true };
  }

  logout(){
    this.router.navigate(['/loginpage'])
  }

  async presentAlertConfirm() {
    const alert = await this.alertctrl.create({
      cssClass: 'my-custom-class',
      header: 'Change Password?',
      message: 'Please confirm to change password',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
            this.presentToast('Changing password is discarded');
          }
        }, {
          text: 'Ok',
          handler: () => {
            console.log('Confirm Okay');
            this.changePass();
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
  navigateDashboard(){
    this.router.navigate(['/dashboard'])
  }



}
