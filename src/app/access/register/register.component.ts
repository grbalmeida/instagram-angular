import {Component, OnInit, EventEmitter, Output} from '@angular/core'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @Output() private showPanel: EventEmitter<string> = new EventEmitter<string>()

  constructor() { }

  ngOnInit() {
  }

  public showLoginPanel(): void {
    this.showPanel.emit('login')
  }
}
