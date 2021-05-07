import { Component, OnInit } from '@angular/core';

import { Platform, ToastController, AlertController  } from '@ionic/angular';
// import { Platform } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router } from '@angular/router';
import { ApiService } from './services/api.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
  public selectedIndex = 0;
  public appPages = [
    {
      title: 'Dashboard',
      url: '/dashboard',
      icon: 'desktop'
    },
    {
      title: 'New appointment',
      url: '/new-appointment',
      icon: 'add-circle'
    },
    {
      title: 'All appointments',
      url: '/all-appointments',
      icon: 'people'
    },
    {
      title: 'Consultation',
      url: '/chatbot',
      icon: 'chatbox-ellipses'
    },
    {
      title: 'Prediction',
      url: '/predict',
      icon: 'fitness'
    }
  ];
  public appPages2 = [
    {
      title: 'Change Password',
      url: '/change-password',
      icon: 'settings'
    },
    {
      title: 'Logout',
      url: '/loginpage',
      icon: 'log-out'
    }
  ];
  public labels = ['Change Password', 'Logout'];

  public counter=0;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private router : Router,
    public apiService: ApiService,
    public toastCtrl: ToastController,
    public alertctrl: AlertController
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.router.navigateByUrl('loginpage')
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.platform.backButton.subscribeWithPriority(0, () => {
        // code that is executed when the user pressed the back button
        // and ionic doesn't already know what to do (close modals etc...)
        this.presentAlertConfirm();
      })
    });
  }

  ngOnInit() {
    const path = window.location.pathname.split('folder/')[1];
    if (path !== undefined) {
      this.selectedIndex = this.appPages.findIndex(page => page.title.toLowerCase() === path.toLowerCase());
    }
  }
  async presentToast() {
    const toast = await this.toastCtrl.create({
      message: "Press again to exit",
      duration: 2000,
      position: "middle"
    });
    toast.present();
  }

  async presentAlertConfirm() {
    const alert = await this.alertctrl.create({
      cssClass: 'my-custom-class',
      header: 'Want to exit app?',
      message: '',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Exit',
          handler: () => {
            console.log('Confirm Okay');
            navigator['app'].exitApp();
          }
        }
      ]
    });

    await alert.present();
  }

}
