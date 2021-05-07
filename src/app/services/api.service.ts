import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  public token: any;
  public userId: any;
  public username: any;
  public password: any;
  public fullName: any;
  public phone: any;
  public roles: any;
  public approvalOption: any;
  public departmentId: any;

  apiUrl = 'http://743caad911f5.ngrok.io';


  constructor(private http: HttpClient) {

  }

  searchData() {
    // return  this.http.get(this.apiUrl+'hello');

    return new Promise((resolve, reject) => {

      this.http.get(this.apiUrl + '/hello',
        {

        }
      )
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });


    });

  }


  loginUser(data) {
    //this.storage.clear();
    //console.log('clear');
    let postData = {
      "phonenumber": data.phonenumber,
      // "password": data.password
    }
    return new Promise((resolve, reject) => {
      this.http.get(this.apiUrl + '/login?phone='+data
      )
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });

  }


  // bony
  dashboard() {

    return new Promise((resolve, reject) => {
      this.http.get(this.apiUrl + '/get-appointment?id='+ this.userId,
      //  + parameter.userId,
        {
          // headers: { Authorization: 'Bearer ' + parameter.token }
        }
      )
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });


    });

  }

  allAppointments() {

    return new Promise((resolve, reject) => {
      this.http.get(this.apiUrl + '/get-all-appointment',
      //  + parameter.userId,
        {
          // headers: { Authorization: 'Bearer ' + parameter.token }
        }
      )
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });


    });

  }


  //bony

  createAppointment(data) {
    //this.storage.clear();
    //console.log('clear');
    // add-appointment?id=2&name=korim&date=25-11-2021&time=10pm&hospital=samorik hospita
    let postData = {
      "id": data.id,
      "name": data.name,
      "date": data.date,
      "time": data.time,
      "hospital": data.hospital,
    }
    return new Promise((resolve, reject) => {
      this.http.get(this.apiUrl + '/add-appointment?id='+postData.id
      +'&name='+postData.name+'&date='+postData.date.slice(0,10)
      +'&time='+postData.time.slice(12,16)+'&hospital='+postData.hospital,
      //  + parameter.userId,
        {
          // headers: { Authorization: 'Bearer ' + parameter.token }
        }
      )
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        })
    });

  }

  chatbot(data) {

    return new Promise((resolve, reject) => {
      this.http.get(this.apiUrl + '/ask?question='+data,
      //  + parameter.userId,
        {
          // headers: { Authorization: 'Bearer ' + parameter.token }
        }
      )
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });


    });

  }


  predict(data) {

   let postData = {

    "rural": data.rural, 
    "age": data.age, 
    "marital_status": data.marital_status,
    "wt": data.wt,
    "anm_in_last_3_months": data.anm_in_last_3_months,
    "mother_age_when_baby_was_born": data.mother_age_when_baby_was_born,
    "disability_status": data.disability_status,
    "when_you_bcome_mother_last_time": data.when_you_bcome_mother_last_time,
    "chew": data.chew, 
    "diagnosed_for": data.diagnosed_for, 
    "smoke": data.smoke,   
    "toilet_used": data.toilet_used,   
    "is_husband_living_with_you": data.is_husband_living_with_you, 
    "highest_qualification": data.highest_qualification, 
    "occupation_status": data.occupation_status,  
    "aware_abt_hiv":  data.aware_abt_hiv, 
    "aware_of_haf":  data.aware_of_haf, 
    "water_filteration":  data.water_filteration,
    "symptoms_pertaining_illness":  data.symptoms_pertaining_illness,
    "sought_medical_care": data.sought_medical_care,
    "pregnant_month":  data.pregnant_month,
    "is_toilet_shared":  data.is_toilet_shared,
    "ever_conceived" :  data.ever_conceived,
    "no_of_times_conceived":  data.no_of_times_conceived,
    "age_at_first_conception" :  data.age_at_first_conception,
    "health_prob_afters_fp_use" :  data.health_prob_afters_fp_use
    }
    return new Promise((resolve, reject) => {
      this.http.post(this.apiUrl + '/predict', postData,
        {
          // headers: { Authorization: 'Bearer ' + this.token, content-Type: 'application/json'  }
        }
      )
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });

  }



  createVisitor(data) {
    //this.storage.clear();
    //console.log('clear');
    let postData = {
      "fullName": data.fullName,
      "email": data.email,
      "address": data.address,
      "phone": data.phone,
      "nid": data.nid,
    }
    return new Promise((resolve, reject) => {
      this.http.post(this.apiUrl + '/createVisitor', postData,
        {
          headers: { Authorization: 'Bearer ' + this.token }
        }
      )
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });

  }

  registerVisitor(data) {
    //this.storage.clear();
    //console.log('clear');
    let postData ={
    "fullName": data.fullName,
    "email": data.email,
    "address": data.address,
    "phone" : data.phone,
    "nid": data.nid,
    "password": data.newPassword,
    "base64Image": data.base64Image
  }
    return new Promise((resolve, reject) => {
      this.http.get(this.apiUrl + '/register?id='+data.id+'&name='+data.name+'&phone='+data.phone,
      // {
      //   headers: {Authorization: 'Bearer '+ this.token}
      // }
      )
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });

  }


  changePass(data) {
    //this.storage.clear();
    //console.log('clear');
    let postData = {
      "currentPassword": data.currentPassword,
      "newPassword": data.newPassword,
      "confirmPassword": data.confirmPassword
    }
    return new Promise((resolve, reject) => {
      this.http.post(this.apiUrl + '/changePassword/' + this.userId, postData,
        {
          headers: { Authorization: 'Bearer ' + this.token }
        }
      )
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });

  }

  sendOtp(phonenumber) {
    return new Promise((resolve, reject) => {
      this.http.post(this.apiUrl + '/fPassword/' + phonenumber,
        {
          // headers: {Authorization: 'Bearer '+ this.token}
        }
      )
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });

  }

  submitOtp(data) {
    //this.storage.clear();
    //console.log('clear');
    let postData = {
      "phoneNumber": data.phonenumber,
      "otp": data.otp
    }
    return new Promise((resolve, reject) => {
      this.http.post(this.apiUrl + '/verifyOTPforForgotPassword', postData,
        {
          // headers: {Authorization: 'Bearer '+ this.token}
        }
      )
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });

  }

  resetPass(phonenumber, data) {
    //this.storage.clear();
    //console.log('clear');
    let postData = {
      "currentPassword": "",
      "newPassword": data.newPassword,
      "confirmPassword": data.confirmPassword,
    }
    return new Promise((resolve, reject) => {
      this.http.post(this.apiUrl + '/resetPassword/' + phonenumber, postData,
        {
          // headers: {Authorization: 'Bearer '+ this.token}
        }
      )
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });

  }

}
