import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BicirutasPageRoutingModule } from './bicirutas-routing.module';

import { BicirutasPage } from './bicirutas.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BicirutasPageRoutingModule
  ],
  declarations: [BicirutasPage]
})
export class BicirutasPageModule {}
