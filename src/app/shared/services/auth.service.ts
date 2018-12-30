import User from '../models/user.model'
import * as firebase from 'firebase'

export class Auth {
    public registerUser(user: User): Promise<any> {
        return firebase
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

    public authenticate(email: string, password: string): Promise<any> {
        return firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .then((response: any) => response)
            .catch((error: Error) => error)
    }
}