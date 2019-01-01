import {Component, OnInit, EventEmitter, Output} from '@angular/core'
import {FormGroup, FormControl, Validators} from '@angular/forms'
import * as firebase from 'firebase'
import {Subject, interval, pipe} from 'rxjs'
import {takeUntil} from 'rxjs/operators'

import {Database} from '../../shared/services/database.service'
import {Progress} from '../../shared/services/progress.service'

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
  private image: any
  private postProgress: string = 'pending'
  private uploadPercentage: number = 0
  @Output() private updateTimeline: EventEmitter<any> = new EventEmitter<any>()

  constructor(
    private database: Database,
    private progress: Progress
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
        title: this.form.value.title,
        image: this.image[0]
      })

      let followUpUpload = interval(500)
      let toBeContinued = new Subject()
      toBeContinued.next(true)

      followUpUpload
        .pipe(takeUntil(toBeContinued))
        .subscribe(() => {
          this.postProgress = 'progress'
          this.uploadPercentage = Math.round((this.progress.state.bytesTransferred / this.progress.state.totalBytes) * 100)

          if(this.progress.status === 'completed') {
            this.postProgress = 'completed'
            this.updateTimeline.emit()
            toBeContinued.next(false)
          }
        })
    }
  }

  public prepareImageUpload(event: Event): void {
    this.image = (<HTMLInputElement>event.target).files
  }
}
