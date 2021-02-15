import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BicirutasPage } from './bicirutas.page';

const routes: Routes = [
  {
    path: '',
    component: BicirutasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BicirutasPageRoutingModule {}
