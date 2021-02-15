import { Component, ElementRef, ViewChild } from '@angular/core';
import { AngularFireDatabase, AngularFireList, snapshotChanges } from '@angular/fire/database';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-bicirutas',
  templateUrl: './bicirutas.page.html',
  styleUrls: ['./bicirutas.page.scss'],
})
export class BicirutasPage {

  @ViewChild('map', {static: false}) mapElement: ElementRef;
  
  map: google.maps.Map;
  markers =[];
  location: any;
  locationsCollection: AngularFireList<any>;
  currentMapTrack: Array<google.maps.Polyline> = [];

  constructor(public afDB: AngularFireDatabase) { }

  ionViewWillEnter(){
    this.loadMap()
    this.showRoutes()
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
    this.locationsCollection = this.afDB.list('/Marker');
    this.location = this.locationsCollection.snapshotChanges().pipe(
      map(changes => 
          changes.map(c => ({
            key: c.payload.key, ...c.payload.val()
          })))
    )
    
    this.location.subscribe(location => {
      console.log('nueva locacion: ', location);
      location.map(track => {
        this.updateMap(Object.values(track.points));
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
