import { Injectable } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';
import { NavController } from '@ionic/angular';
import firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private AFauth: AngularFireAuth,
    private afs: AngularFireDatabase,
    private navCtr: NavController
  ) { }

  register(email: string, password: string, name: string, image: string){
    return new Promise ((resolve, reject) => {
      this.AFauth.createUserWithEmailAndPassword(email, password).then(res => {
        const uid = res.user.uid;
        let subirimagen = firebase.storage().ref('users/'+res.user.uid).putString(image, 'data_url').then(async(datos) => {
          await datos.ref.getDownloadURL().then((downloadURL) => {
            image = downloadURL;
            this.afs.object('users/'+res.user.uid).set({
              uid: uid,
              name: name,
              email: email,
              imagen: image,
              register_at: Date.now()
            })
          })
          
        })

        resolve(res)
      }).catch(err => reject(err))
    })
  }

  loginUser(value){
    return new Promise<any>((resolve, reject) => {
      firebase.auth().signInWithEmailAndPassword(value.email, value.password).then(
        res => resolve(res),
        err => reject(err)
      )
    })
  }

  userDetails(){
    return firebase.auth().currentUser;
  }

  logoutUser(){
    return new Promise((resolve, reject) => {
      if(firebase.auth().currentUser){
        firebase.auth().signOut().then(()=>{
          this.navCtr.navigateForward('/login')
          resolve;
        }).catch((error) => {
          reject();
        })
      }
    })
  }

}
