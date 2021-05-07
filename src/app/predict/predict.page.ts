import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-predict',
  templateUrl: './predict.page.html',
  styleUrls: ['./predict.page.scss'],
})
export class PredictPage implements OnInit {
  apiResponse: any;
  predictData =
    {
      rural: 1,
      age: 23,
      marital_status: 1,
      wt: 65,
      anm_in_last_3_months: 1,
      mother_age_when_baby_was_born: 18,
      disability_status: 0,
      when_you_bcome_mother_last_time: 2,
      chew: 1,
      diagnosed_for: 5,   //not completed
      smoke: 1,
      toilet_used: 1,    // not completed
      is_husband_living_with_you: 1,
      highest_qualification: 5, //not com
      occupation_status: 1,  //not com
      aware_abt_hiv: 1,
      aware_of_haf: 1,
      water_filteration: 1,
      symptoms_pertaining_illness: 1,
      sought_medical_care: 1,
      pregnant_month: 5,
      is_toilet_shared: 1,
      ever_conceived: 1,
      no_of_times_conceived: 1,
      age_at_first_conception: 15,
      health_prob_afters_fp_use: 0
    }


  constructor(public apiService: ApiService, public alertController: AlertController) { }

  ngOnInit() {
  }
  predict() {
    console.log(this.predictData.rural);
    this.apiService.predict(this.predictData).then(result => {
      console.log(result);
      this.apiResponse=result;
      this.presentAlert(this.apiResponse[0]);
    }).catch(err => {
      alert("error" + err.message);
    });
  }

  async presentAlert(data) {
    console.log("in side alert");
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: '',
      subHeader: 'Prediction',
      message: data,
      buttons: ['OK']
    });
    await alert.present();

  }

}
