import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReturnsModalPage } from './returns-modal.page';

const routes: Routes = [
  {
    path: '',
    component: ReturnsModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReturnsModalPageRoutingModule {}
