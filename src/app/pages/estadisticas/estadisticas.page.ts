import { Component, ViewChild, ElementRef } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';

import { Chart } from 'chart.js';
import firebase from 'firebase';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-estadisticas',
  templateUrl: './estadisticas.page.html',
  styleUrls: ['./estadisticas.page.scss'],
})
export class EstadisticasPage {

  @ViewChild('lineCanvas', {read: ElementRef}) lineCanvas;
  ref: AngularFireList<any[]>
  lineChart: any;
  items;
  data: Observable<any[]>;
  chartData= null;
  xArray: any[] = [];
  yArray: any[] = [];
  object: any;

  ///////////////////
  itemRef: AngularFireList<any>;
  item: Observable<any[]>;
  chart = [];

  ////////
  ejex = [];
  ejey = [];

  constructor(public afDatabase: AngularFireDatabase) { 
    
    firebase.auth().onAuthStateChanged(user=> {
      if(user){
        this.routes(user.uid)
      }
    })    
  }
  
  routes(uid_user){
    this.itemRef = this.afDatabase.list('/routes');
    this.item = this.itemRef.snapshotChanges().pipe(
      map(changes => 
        changes.map( c => ({
          key: c.payload, ...c.payload.val()
        })))
    )
  
    this.item.subscribe(data => {
      data.map((item) => {
        
        if(uid_user == item.user){
          console.log("user actual: "+item.user)
          let fecha = new Date(item.finished_at).toLocaleDateString("en-US")
          this.ejex.push(fecha)
          console.log("fecha "+this.ejex)
          
          this.ejey.push(item.distance)
          console.log("distancia "+this.ejey)
          
          this.basicChart(this.ejex, this.ejey)
        }
        //console.log("usuario:"+item.user)
            
      })       
    })
  }
  

  basicChart(key, data){
     this.chartData = data;
      this.lineChart = new Chart(this.lineCanvas.nativeElement, {
        type: 'line',
    data: {
        labels: key,
        datasets: [{
            label: 'distancia recorrida por dia',
            data: data,
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }
    })
  }


}
