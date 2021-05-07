import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { AlertController, ToastController  } from '@ionic/angular';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  registerForm: FormGroup;
  patient ={ id: "", name: "", phone: ""};
  apiResponse: any;
  // base64Image;
  imageData;

  constructor(private apiService: ApiService, private formBuilder: FormBuilder, private router: Router, private toastCtrl: ToastController,
    private camera: Camera) { 
  //   this.registerForm = this.formBuilder.group({
  //     fullName: ['', Validators.compose([Validators.maxLength(30),Validators.required])],
  //     email: ['', Validators.compose([Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")])],
  //     phone: ['', Validators.compose([Validators.minLength(11),Validators.maxLength(11),Validators.required,Validators.pattern("01[3-9]\\d{8}$")])],
  //     address: ['', Validators.compose([Validators.maxLength(100),Validators.required,])],
  //     nid: ['',  Validators.compose([Validators.pattern("^[0-9]*$"),Validators.minLength(10), Validators.maxLength(17)])],
  //     role: [''],
  //     newPassword: ['', Validators.compose([Validators.minLength(8),Validators.maxLength(30),Validators.required])],
  //     confirmPassword: ['', Validators.compose([Validators.minLength(8),Validators.maxLength(30),Validators.required,])]              
  // });
  }

  ngOnInit() {
  }

  // openCamera(sourceType:number){
  //   const options: CameraOptions = {
  //   quality: 100,
  //   destinationType: this.camera.DestinationType.DATA_URL,
  //   encodingType: this.camera.EncodingType.JPEG,
  //   mediaType: this.camera.MediaType.PICTURE,
  //   cameraDirection : this.camera.Direction.FRONT,
  //   sourceType:sourceType,
  //  }

//     this.camera.getPicture(options).then((imageData) => {
//     this.imageData = imageData;
//     this.visitor.base64Image = 'data:image/jpeg;base64,' + imageData;
//     // this.base64Image=(<any>window).Ionic.WebView.convertFileSrc(imageData);
//     // alert(this.visitor.base64Image);
 
//     }, (err) => {
//        // Handle error
//        alert("Warning: "+JSON.stringify(err))
//   });
// }

register(){
  this.apiService.registerVisitor(this.patient).then(result => {
    console.log(result);
    this.apiResponse=result;
    // alert(this.apiResponse.message);
    
      this.presentToast("Registration Successfull!");
      this.navigateToLogin();
  
    
  }).catch(err => {
    alert("error" + err.message);
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

}
