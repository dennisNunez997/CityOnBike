import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular'
import { MenuController } from '@ionic/angular';
import { AngularFireDatabase } from '@angular/fire/database';
import firebase from 'firebase';

//servicio
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {

  imagen: string;
  nombre: string;
  email: string;
  user = [];
  constructor(
    private navCtrl: NavController,
    private menu:  MenuController,
    private authService: AuthService,
    private afs: AngularFireDatabase
  ) { }

  ngOnInit() {
    firebase.auth().onAuthStateChanged(user=> {
      if(user){
        this.showMenu(user.uid);
      }
    })
  }

  showMenu(uid){
    this.afs.list('users/'+uid).valueChanges().subscribe(_data => {
      this.user = _data;
      this.nombre = this.user[2];
      this.imagen = this.user[1];
      this.email = this.user[0];
    })
  }

  goToProfile(){
    this.navCtrl.navigateForward("/menu/perfil");
  }

  goToTrackeo(){
    this.navCtrl.navigateForward("/menu/home");
  }

  goToBiciRutas(){
    this.navCtrl.navigateForward("/menu/bicirutas");
  }

  myRoutes(){
    this.navCtrl.navigateForward("/menu/misrutas");
  }

  goToEstadisticas(){
    this.navCtrl.navigateForward("/menu/estadisticas");
  }

  logout(){
    this.authService.logoutUser().then(res => {
      console.log(res);
      this.navCtrl.navigateBack('/login');
    }).catch(error => {
      console.log(error);
    })
  }

  closeMenu(){
    this.menu.close();
  }

}
