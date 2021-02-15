import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MenuPage } from './menu.page';

//paginas
import { HomePageModule } from '../home/home.module';
import { BicirutasPageModule } from '../bicirutas/bicirutas.module';
import { MisrutasPageModule } from '../misrutas/misrutas.module';
import { EstadisticasPageModule } from '../estadisticas/estadisticas.module';
import { PerfilPageModule } from '../perfil/perfil.module';


const routes: Routes = [
  {
    path: '',
    component: MenuPage,
    children: 
    [
      {
        path:"home",
        loadChildren:() => import("../home/home.module").then(m => m.HomePageModule)
      },
      {
        path: "bicirutas",
        loadChildren:() => import("../bicirutas/bicirutas.module").then(m => m.BicirutasPageModule)
      },
      {
        path: "misrutas",
        loadChildren:() => import("../misrutas/misrutas.module").then(m => m.MisrutasPageModule)      
      },
      {
        path: "estadisticas",
        loadChildren:() => import("../estadisticas/estadisticas.module").then(m => m.EstadisticasPageModule)  
      },
      {
        path: "perfil",
        loadChildren:() => import("../perfil/perfil.module").then(m => m.PerfilPageModule)      
      },
      {
        path: "",
        redirectTo: "home",
        pathMatch: "full"
      }
    ]  
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MenuPageRoutingModule {}
