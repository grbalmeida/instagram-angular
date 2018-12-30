import {Injectable} from '@angular/core'
import {Router} from '@angular/router'

import User from '../models/user.model'
import * as firebase from 'firebase'

@Injectable()
export class Auth {
    private tokenId: string

    constructor(
        private router: Router
    ) {}

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
            .then((response: any) => {
                firebase    
                    .auth()
                    .currentUser
                    .getIdToken()
                    .then((tokenId: string) => {
                        this.tokenId = tokenId
                        localStorage.setItem('tokenId', tokenId)
                        this.router.navigate(['/home'])
                    })
            })
            .catch((error: Error) => error)
    }

    public authenticated(): boolean {
        if(this.tokenId === undefined && localStorage.getItem('tokenId') !== null) {
            this.tokenId = localStorage.getItem('tokenId')
        }

        if(this.tokenId === undefined) {
            this.router.navigate(['/'])
        }

        return this.tokenId !== undefined
    }

    public logout(): void {
        firebase
            .auth()
            .signOut()
            .then(() => {
                localStorage.removeItem('tokenId')
                this.tokenId = undefined
                this.router.navigate(['/'])
            })
    }
}