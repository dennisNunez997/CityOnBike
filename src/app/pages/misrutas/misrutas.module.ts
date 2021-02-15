import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MisrutasPageRoutingModule } from './misrutas-routing.module';

import { MisrutasPage } from './misrutas.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MisrutasPageRoutingModule
  ],
  declarations: [MisrutasPage]
})
export class MisrutasPageModule {}
