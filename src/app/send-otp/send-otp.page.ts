import { ConditionalExpr } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { AlertController, ToastController  } from '@ionic/angular';
import { ApiService } from '../services/api.service';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-send-otp',
  templateUrl: './send-otp.page.html',
  styleUrls: ['./send-otp.page.scss'],
})
export class SendOtpPage implements OnInit {
  sendOtp={phonenumber: '', otp: ''};
  data: any;
  showsubmit: boolean;
  showsend: boolean;
  showResetForm: boolean;
  changePassword={newPassword:"", confirmPassword:""};
  changePassForm: FormGroup;
  constructor(private apiService: ApiService, private toastCtrl: ToastController, private formBuilder: FormBuilder, private router: Router) { 
    this.showsubmit=false;
    this.showsend=true;
    this.showResetForm=false;
    this.changePassForm = this.formBuilder.group({
      newPassword: ['', Validators.compose([Validators.minLength(8),Validators.maxLength(30),Validators.required])],
      confirmPassword: ['', Validators.compose([Validators.minLength(8),Validators.maxLength(30),Validators.required,])]
    }, {
      validators: this.mustMatch.bind(this)
  });
    
  }

  ngOnInit() {
  }

  sendOTP(){
    this.apiService.sendOtp(this.sendOtp.phonenumber).then(result => {
      console.log(result);
      this.data = result;
      console.log("result:" + this.data);
      if(this.data.code==0){
        this.presentToast(this.data.message);
        this.showsend=false;
        this.showsubmit=true;
        
      }     
      
  }).catch(err => {
    console.log('error:'+err);
    this.presentToast("Try again!");
  });

}

submitOTP(){
  this.apiService.submitOtp(this.sendOtp).then(result => {
    console.log(result);
    this.data = result;
    console.log("result:" + this.data);
    if(this.data.code==0){
      this.presentToast(this.data.message);
      this.showsubmit=false;
      this.showResetForm=true;
    }     
    
}).catch(err => {
  console.log('error:'+err)
  this.presentToast("Invalid OTP!");
});

}

resetPass(){
  this.apiService.resetPass(this.sendOtp.phonenumber ,this.changePassword).then(result => {
    console.log(result);
    this.data = result;
    console.log("result:" + this.data);
    if(this.data.code==0){
      this.presentToast(this.data.message);
      this.navigateToLogin();
    }     
    
}).catch(err => {
  console.log('error:'+err)
});

}


async presentToast(data) {
  const toast = await this.toastCtrl.create({
    message: data,
    duration: 2000
  });
  toast.present();
}

navigateToLogin(){
  this.router.navigate(['/loginpage'])
}

mustMatch(formGroup: FormGroup){
  console.log("Must match");
  const { value: password } = formGroup.get('newPassword');
  const { value: confirmPassword } = formGroup.get('confirmPassword');
  console.log(password);
  return password === confirmPassword ? null : { passwordNotMatch: true };
}

}
