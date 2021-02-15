import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AngularFireDatabase, AngularFireList, snapshotChanges } from '@angular/fire/database';
import { map } from 'rxjs/operators';
import firebase from 'firebase';


declare var google;

@Component({
  selector: 'app-misrutas',
  templateUrl: './misrutas.page.html',
  styleUrls: ['./misrutas.page.scss'],
})
export class MisrutasPage {

  @ViewChild('map', {static: false}) mapElement: ElementRef;
  
  map: google.maps.Map;
  markers =[];
  locations: any;
  locationsCollection: AngularFireList<any>;
  currentMapTrack: Array<google.maps.Polyline> = [];
  location: any;
  coordinates = [];

  constructor(public afDB: AngularFireDatabase) {}

  ionViewWillEnter(){
    this.loadMap()
  }

  loadMap(){
    let latLng = new google.maps.LatLng(-0.1862504, -78.5005891)
    let mapOptions = {
      center: latLng,
      zoom: 13,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      tilt: 45
    };
    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
    this.showRoutes()
  }
    
  async showRoutes(){
    firebase.auth().onAuthStateChanged(user=> {
      this.locationsCollection = this.afDB.list('/routes');
      this.location = this.locationsCollection.snapshotChanges().pipe(
      map(changes => 
          changes.map(c => ({
            key: c.payload.key, ...c.payload.val()
          })))
    )
    
    this.location.subscribe(location => {
      location.map(track => {
        firebase.auth().onAuthStateChanged(user=> {
            if(user.uid == track.user){
              this.updateMap(Object.values(track.points));    
              //console.log('nueva locacion: ', track.user);
            }
          })       
        })      
      })
    })
  }

  updateMap(location){    
    const currMapTrack = new google.maps.Polyline({
      path: location,
      geodesic: true,
      strokeColor: '#4970F0',
      strokeOpacity: 1.0,
      strokeWeight: 4
    })
    currMapTrack.setMap(this.map)
    this.currentMapTrack.push(currMapTrack)
  }

}
