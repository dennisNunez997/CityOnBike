import { Component } from '@angular/core';
import { AngularFireDatabase, snapshotChanges } from '@angular/fire/database';
import { NavController } from '@ionic/angular'
import firebase from 'firebase';


@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage {

  imagen: string;
  nombre: string;
  email: string;
  fecha: string;
  user = [];
  id_user: string;

  constructor(private afs: AngularFireDatabase, 
              private navCtrl: NavController)
  {}

  ngOnInit(){    
    firebase.auth().onAuthStateChanged(user => {
      if(user){
        this.showProfile(user.uid)
      }
    })
  }

  showProfile(uid){    
    
    this.afs.list('users/'+uid).valueChanges().subscribe(_data => {
      this.user = _data;
      this.nombre = this.user[2]
      this.email = this.user[0]
      this.imagen = this.user[1]
      this.fecha = new Date(this.user[3]).toLocaleDateString("en-US")
      console.log(this.user)
    }) 

  }
  
  goToMenu(){
    this.navCtrl.navigateForward('/menu')
  }

  
}
