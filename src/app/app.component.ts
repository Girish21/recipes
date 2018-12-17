import {Component, OnInit} from '@angular/core';
import * as firebase from 'firebase';
import {AuthService} from './Services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private auth: AuthService) {}

  ngOnInit() {
    const config = {
      apiKey: 'AIzaSyBO45Rbu5lDLI2gUHEWHZCzRqtYs8Nm73Y',
      authDomain: 'angular-app-30cbd.firebaseapp.com',
      databaseURL: 'https://angular-app-30cbd.firebaseio.com',
      projectId: 'angular-app-30cbd',
      storageBucket: 'angular-app-30cbd.appspot.com',
      messagingSenderId: '997393770086'
    };
    firebase.initializeApp(config);
    this.auth.autoSessionInitialize();
  }

}
