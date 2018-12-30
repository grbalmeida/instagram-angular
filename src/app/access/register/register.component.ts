import {Component, OnInit, EventEmitter, Output} from '@angular/core'
import {FormGroup, FormControl, Validators} from '@angular/forms'

import {Auth} from '../../shared/services/auth.service'
import User from '../../shared/models/user.model'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @Output() private showPanel: EventEmitter<string> = new EventEmitter<string>()
  private form: FormGroup = new FormGroup({
    'email': new FormControl(null, 
      [Validators.required, Validators.email, Validators.maxLength(100)]),
    'full_name': new FormControl(null, 
      [Validators.required, Validators.maxLength(100)]),
    'username': new FormControl(null, 
      [Validators.required, Validators.maxLength(50)]),
    'password': new FormControl(null, 
      [Validators.required, Validators.minLength(6), Validators.maxLength(50)])
  })

  constructor(
    private auth: Auth
  ) {}

  ngOnInit() {
  }

  public showLoginPanel(): void {
    this.showPanel.emit('login')
  }

  public registerUser(): void {
    if(this.form.invalid) {
      this.form.get('email').markAsTouched()
      this.form.get('full_name').markAsTouched()
      this.form.get('username').markAsTouched()
      this.form.get('password').markAsTouched()
    } else {
      let user: User = new User(
        this.form.value.email,
        this.form.value.full_name,
        this.form.value.username,
        this.form.value.password
      )

      this.auth.registerUser(user)
    }
  }
}
