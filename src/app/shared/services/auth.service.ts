import User from '../models/user.model'
import * as firebase from 'firebase'

export class Auth {
    public registerUser(user: User) {
        firebase
            .auth()
            .createUserWithEmailAndPassword(user.email, user.password)
            .then((response: any) => {
                delete user.password
                firebase
                    .database()
                    .ref(`user_detail/${btoa(user.email)}`)
                    .set(user)
            })
            .catch((error: Error) => error)
    }
}