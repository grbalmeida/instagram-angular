import {Component, OnInit, ViewChild} from '@angular/core'
import {Auth} from '../shared/services/auth.service'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  @ViewChild('publications') private publications: any

  constructor(
    private auth: Auth
  ) {}

  ngOnInit() {
  }

  public logout(): void {
    this.auth.logout()
  }

  public updateTimeline(): void {
    this.publications.updateTimeline()
  }
}
