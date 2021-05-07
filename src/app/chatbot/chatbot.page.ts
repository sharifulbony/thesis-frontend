import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.page.html',
  styleUrls: ['./chatbot.page.scss'],
})
export class ChatbotPage implements OnInit {
  chatArray: any;
  apiData: any;
  mytext= {name: 'me', text: ''};
  bottext={name: 'bot', text: ''};

  constructor(public apiService: ApiService,) { 
    this.chatArray=[
      {name: '', text: ''}
    ]
  }

  ngOnInit() {

  }
  chat(){
    this.chatArray.push(Object.assign({}, this.mytext));
    this.apiService.chatbot(this.mytext.text).then(result => {
      console.log(result);
      this.apiData=result;
      this.bottext.text = this.apiData;
      this.chatArray.push(Object.assign({},this.bottext));
    }).catch(err => {
      alert("error" + err.message);
    });
  }

}
