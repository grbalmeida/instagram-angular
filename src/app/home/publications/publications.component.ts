import {Component, OnInit} from '@angular/core'

import * as firebase from 'firebase'

import {Database} from '../../shared/services/database.service'

@Component({
  selector: 'app-publications',
  templateUrl: './publications.component.html',
  styleUrls: ['./publications.component.css']
})
export class PublicationsComponent implements OnInit {
  private email: string
  private publications: any

  constructor(
    private database: Database
  ) { }

  ngOnInit() {
    firebase
      .auth()
      .onAuthStateChanged((user) => {
        this.email = user.email
        this.updateTimeline()
      })
  }

  public updateTimeline(): void {
    this
      .database
      .getPublications(this.email)
      .then((publications: any) => this.publications = publications)
  }
}
