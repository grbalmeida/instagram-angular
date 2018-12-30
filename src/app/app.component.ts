import {Component, OnInit} from '@angular/core'
import * as firebase from 'firebase'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'instagram-clone-angular';

  ngOnInit() {
    const config = {
      apiKey: "AIzaSyBYTY0anGxN_djQAS3cto34AUv2vTo8vso",
      authDomain: "instagram-angular-1cdee.firebaseapp.com",
      databaseURL: "https://instagram-angular-1cdee.firebaseio.com",
      projectId: "instagram-angular-1cdee",
      storageBucket: "instagram-angular-1cdee.appspot.com",
      messagingSenderId: "132325886437"
    }

    firebase.initializeApp(config)
  }
}
