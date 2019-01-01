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

    public getPublications(userEmail: string): Promise<any> {
        return new Promise((resolve, reject) => {
            firebase
                .database()
                .ref(`posts/${btoa(userEmail)}`)
                .orderByKey()
                .once('value')
                .then((snapshot: any) => {
                    const publications: Array<any> = []

                    snapshot.forEach((childSnapshot: any) => {
                        const publication = childSnapshot.val()
                        publication.key = childSnapshot.key
                        publications.push(publication)
                    })
                    return publications.reverse()
                })
                .then((publications: any) => {
                    publications.forEach((publication: any) => {
                        firebase
                            .storage()
                            .ref()
                            .child(`images/${publication.key}`)
                            .getDownloadURL()
                            .then((url: string) => {
                                publication.imageUrl = url

                                firebase
                                    .database()
                                    .ref(`user_detail/${btoa(userEmail)}`)
                                    .once('value')
                                    .then((snapshot: any) => {
                                        publication.fullName = snapshot.val().fullName
                                    })
                            })
                    })
                    resolve(publications)
                })
        })
    }
}