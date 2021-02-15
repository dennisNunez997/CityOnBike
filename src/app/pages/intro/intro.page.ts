import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { NavController } from '@ionic/angular';


@Component({
  selector: 'app-intro',
  templateUrl: './intro.page.html',
  styleUrls: ['./intro.page.scss'],
})
export class IntroPage {

  constructor(private storage: Storage, private navCtrl: NavController) { }

  slideOpt = {
    initialSlide: 0,
    SlidesPerView: 1,
    centeredSlides: true,
    speed: 400
  };

  slides = [
    {
    title: "Guarda tus rutas",
    subtitle: "PERIÓDICAMENTE",
    description: 'Al grabar tus rutas, se crearán mas rutas exclusivas para circular por la ciudad de forma segura',
    icon: "locate-outline"
    },
    {
      title: "Visualiza tu progreso",
      subtitle: "SEMANALMENTE",
      description: 'Observa tu distancia recorrida al dia, mediante graficas',
      icon: "bar-chart-outline"
    },
    {
      title: "Circula por las bicirutas",
      subtitle: "EXCLUSIVAS",
      description: 'Observa las bicirutas existentes en la ciudad para circular de forma segura',
      icon: "bicycle-outline"
    }
  ]

  finish(){
    this.navCtrl.navigateForward('/register');    
  }


}
