import { Injectable } from '@angular/core';
import firebase from 'firebase/compat/app';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root',
})
export class AutheticationService {
  constructor(public fireAuth: AngularFireAuth) {}

  async registerUser(email: string, password: string) {
    return await this.fireAuth.createUserWithEmailAndPassword(email, password);
  }
  async loginUser(email: string, password: string) {
    return await this.fireAuth.signInWithEmailAndPassword(email, password);
  }
  async resetPassword(email: string) {
    return await this.fireAuth.sendPasswordResetEmail(email);
  }
  async signOut() {
    return await this.fireAuth.signOut();
  }
  async getProfile() {
    return await this.fireAuth.currentUser;
  }
}
