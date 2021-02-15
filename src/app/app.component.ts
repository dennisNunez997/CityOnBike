import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      
      /*
      firebase.auth().onAuthStateChanged(user => {
        if(user){
          // tiene seseion activa, redirija a home
         // 
        } else {
          // no tiene sesión, redirija a login
        }
      })
      */
      
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
