import {Component, OnInit} from '@angular/core'
import {Auth} from '../shared/services/auth.service'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(
    private auth: Auth
  ) {}

  ngOnInit() {
  }

  public logout(): void {
    this.auth.logout()
  }
}
