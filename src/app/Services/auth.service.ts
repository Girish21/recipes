import { Injectable } from '@angular/core';
import * as firebase from 'firebase';

@Injectable()
export class AuthService {

  token = null;

  constructor() { }

  autoSessionInitialize() {
    firebase.auth().onAuthStateChanged(
      (user) => {
        if (user) {
          user.getIdToken()
            .then(
              (tk: string) => {
                this.token = tk;
              }
            );
        }
      }
    );
  }

  signupUser(mail: string, password: string) {
    firebase.auth().createUserWithEmailAndPassword(mail, password)
      .catch(
        (error) => console.log(error)
      );
  }

  signinUser(mail: string, password: string) {
    firebase.auth().signInWithEmailAndPassword(mail, password)
      .then(
        (response) => {
          firebase.auth().currentUser.getIdToken()
            .then(
              (tk: string) => {
                this.token = tk;
              }
            );
        }
      )
      .catch(
        (error) => {
          console.log(error);
        }
      );
  }

  getToken() {
    firebase.auth().currentUser.getIdToken()
      .then(
        tk => this.token = tk
      );
    return this.token;
  }

  isAuthenticated() {
    return (this.token != null);
  }

  logout() {
    firebase.auth().signOut();
    this.token = null;
  }

}
