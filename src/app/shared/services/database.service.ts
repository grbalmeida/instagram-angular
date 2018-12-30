import * as firebase from 'firebase'

export class Database {
    public publish(post: any): void {
        firebase
            .database()
            .ref(`posts/${btoa(post.email)}/`)
            .push({title: post.title})
    }
}