import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NavController } from '@ionic/angular'
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase, AngularFireList, snapshotChanges} from '@angular/fire/database';
import { Platform, LoadingController, ToastController, AlertController } from '@ionic/angular';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { map } from 'rxjs/operators';
import firebase from 'firebase';

import { GoogleMaps,
  GoogleMap,
  GoogleMapOptions,
  LatLng,
  ILatLng,
} from '@ionic-native/google-maps';

declare var google;

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  //variables
  map: GoogleMap;
  loading: any;
  location: any;
  locationsCollection: AngularFireList<any>;
  user_location: any;
  user = null;
  @ViewChild('map') mapElement: ElementRef;
  markers = [];
  iconos = [];
  isTracking = false;
  watch:  any;
  subscription: any;
  currentPosition=null;  
  distancia;
  rutas = this.afs.database.ref('/routes/');
  id_ruta = this.rutas.push().key
  final_time = null;
  start_time = null;
  distancia_total= null;
  distanceArray=[];

  constructor(
    private navCtrl: NavController,
    public loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private platform: Platform,
    private geolocation: Geolocation,
    private afAuth: AngularFireAuth,
    private afs: AngularFireDatabase
  ) { }

  async ngOnInit() {    
    await this.platform.ready().then(()=>{
      this.loadMap();
      this.displayRoutes();
    }) 
  }

  loadMap(){

    let mapOptions: GoogleMapOptions = {
      camera: {
        target: {
          lat: -0.2507592,
          lng: -78.5045844
        },
        zoom: 18,
        tilt: 30
      }
    }    
    this.map = GoogleMaps.create('map', mapOptions);
  }

  displayRoutes(){
    this.locationsCollection = this.afs.list('routes/'+this.id_ruta+'/points/');
    this.location = this.locationsCollection.snapshotChanges().pipe(
      map(changes => 
          changes.map(c => ({
            key: c.payload.key, ...c.payload.val()
          })))
    )
    this.location.subscribe(location => {
      console.log('nueva locacion: ', location);
      this.updateMap(location);
    })
  }

  updateMap(location){
    this.iconos.map
    this.markers = [];
    this.iconos = []
    const latLng=[] as any;
    
    for (let loc of location){
      latLng.push({lat:loc.lat, lng: loc.lng})
      let marker = this.map.addPolyline({
        points: latLng,
        color: '#32F04A',
        width: 10,
        geodesic: true
      })      
      let path = new LatLng(loc.lat, loc.lng);

      let icono = this.map.addMarker({
      position: path,
      icon: '#4970F0'
      })  
      this.iconos.push(icono)
      this.markers.push(marker)
    }    
  }

  startTracking(){

    firebase.auth().onAuthStateChanged(user => {
      if(user){
        this.afs.object('routes/'+this.id_ruta).set(
          {
          user: user.uid,
          finished_at: this.final_time,
          started_at:  Date.now(),
          distance: this.distancia_total
          });
      }
    })
    this.watch = this.geolocation.watchPosition();
    this.subscription = this.watch.subscribe((position) => {      
      if(position){
        if(this.currentPosition){
          let before_coords: ILatLng = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          }
          let next_coords: ILatLng = {
            lat: this.currentPosition.coords.latitude, 
            lng: this.currentPosition.coords.longitude
          }


          this.distancia = Math.round(GoogleMaps.getPlugin().geometry.spherical.
          computeDistanceBetween(before_coords, next_coords))
          
          this.distanceArray.push(this.distancia);
          //console.log("array"+this.distanceArray)

          let suma_distancias
          suma_distancias = this.distanceArray.reduce((a,b) => a+b, 0),

          this.distancia_total = suma_distancias.toFixed();
          console.log("distancia total: "+ this.distancia_total)
          
          firebase.database().ref('routes/'+this.id_ruta).update({
            distance: this.distancia_total
          });

          console.log("posicion anterior: lat:"+before_coords.lat+", lng:"+before_coords.lng)
          console.log("posicion actual: lat:"+next_coords.lat+", lng:"+next_coords.lng)
        }
      }                                                                  
      
      this.addNewLocation(
        position.coords.latitude,
        position.coords.longitude,
        position.timestamp,
        position.date
      )
      this.currentPosition = position 
      console.log(this.distancia);
    })      
  }

  stopTracking(){
    this.subscription.unsubscribe();
    this.presentAlert();       
    firebase.database().ref('routes/'+this.id_ruta).update({
      finished_at: Date.now()
    });
  }

  addNewLocation(lat, lng, timestamp, fecha){
    
    let date = new Date(timestamp)

    this.locationsCollection.push({
      lat,
      lng,
      timestamp,
      date
    })
    let path = new LatLng(lat,lng)
    //console.log("mi posicion: "+ path)      
    this.map.animateCamera({target: path, zoom: 18, tilt: 30 })  
  }

  async presentAlert() {
    const alert = await this.alertCtrl.create({
      animated: true,
      cssClass: 'success',
      header: 'exito',
      message: 'ruta guardada con exito',
      buttons: ['OK']
    });
    await alert.present();
  }

  goToMenu(){
    this.navCtrl.navigateForward('/menu')
  }

}
