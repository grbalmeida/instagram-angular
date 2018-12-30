import {Component, OnInit} from '@angular/core'
import {FormGroup, FormControl, Validators} from '@angular/forms'
import * as firebase from 'firebase'

import {Database} from '../../shared/services/database.service'

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.css']
})
export class NewPostComponent implements OnInit {
  private form: FormGroup = new FormGroup({
    'title': new FormControl(null, [
      Validators.required
    ])
  })
  private email: string

  constructor(
    private database: Database
  ) {}

  ngOnInit() {
    firebase
      .auth()
      .onAuthStateChanged((user) => {
        this.email = user.email
      })
  }

  public publish(): void {
    if(this.form.valid) {
      this.database.publish({
        email: this.email,
        title: this.form.value.title
      })
    }
  }
}
