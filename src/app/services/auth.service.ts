import { Injectable } from '@angular/core';
import 'firebase/analytics';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import { Observable } from 'rxjs';

/** Service that authorizes a user using its credentials */
@Injectable({
  providedIn: 'root',
})

export class AuthService {
  /**
   * Signing in a user.
   * @param email User's email.
   * @param password User's password.
   */
  public async signIn(email: string, password: string): Promise< SuccessPayload | ErrorPayload >  {
    return firebase.auth().signInWithEmailAndPassword(email, password)
      .then(() => {
        return { status: 'logged in' };
      })
      .catch((error) => {
        const errorMessage = error.message;
        return { status: 'error', errorMessage: errorMessage };
      });
  }

  /**
   * Signing a user out.
   */
  public signOut(): void {
    firebase.auth().signOut().then(() => {
      console.log('Signed Out');
    }).catch((error) => {
      console.error(error);
    });
  }

  /**
   * Checking if user is signed in or out.
   */
  public getSignInStatus(): Observable<firebase.User> {
    const status$ = new Observable<firebase.User>(subscribe => {
      const tearDown = firebase.auth().onAuthStateChanged(user => {
        subscribe.next(user);
      });
      return () => tearDown();
    });
    return status$;
  }
}

interface ErrorPayload {
  /** Result of the username and password checking */
  status: string;
  /** Service message if the auth was failed */
  errorMessage: string;
}

interface SuccessPayload {
  /** Result of the username and password checking */
  status: string;
}
