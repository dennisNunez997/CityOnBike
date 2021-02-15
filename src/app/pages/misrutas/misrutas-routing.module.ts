import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MisrutasPage } from './misrutas.page';

const routes: Routes = [
  {
    path: '',
    component: MisrutasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MisrutasPageRoutingModule {}
