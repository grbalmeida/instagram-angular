import {Injectable} from '@angular/core'
import * as firebase from 'firebase'
import {Progress}  from './progress.service'

@Injectable()
export class Database {
    constructor(
        private progress: Progress
    ) {}

    public publish(post: any): void {
        this.progress.state = {bytesTransferred: 0, totalBytes: 0}
        firebase
            .database()
            .ref(`posts/${btoa(post.email)}`)
            .push({title: post.title})
            .then((response: any) => {
                let imageName = response.key

                firebase
                    .storage()
                    .ref()
                    .child(`images/${imageName}`)
                    .put(post.image)
                    .on(firebase.storage.TaskEvent.STATE_CHANGED, (snapshot: any) => {
                        this.progress.status = 'progress'
                        this.progress.state = snapshot
                    }, (error) => {
                        this.progress.status = 'error'
                    }, () => {
                        this.progress.status = 'completed'
                    })
            })
    }
}