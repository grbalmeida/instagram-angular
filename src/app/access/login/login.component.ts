import {Component, OnInit, EventEmitter, Output} from '@angular/core'
import {FormGroup, FormControl, Validators} from '@angular/forms'

import {Auth} from '../../shared/services/auth.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @Output() private showPanel: EventEmitter<string> = new EventEmitter<string>()
  private form: FormGroup = new FormGroup({
    'email': new FormControl(null, 
      [Validators.required, Validators.email]),
    'password': new FormControl(null, [
      Validators.required
    ])
  })

  constructor(
    private auth: Auth
  ) {}

  ngOnInit() {
  }

  public showRegisterPanel(): void {
    this.showPanel.emit('register')
  }

  public authenticate(): void {
    if(this.form.invalid) {
      this.form.get('email').markAsTouched()
      this.form.get('password').markAsTouched()
    } else {
      this.auth.authenticate(
        this.form.value.email,
        this.form.value.password
      )
    }
  }
}
