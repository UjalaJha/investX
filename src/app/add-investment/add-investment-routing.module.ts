import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddInvestmentPage } from './add-investment.page';

const routes: Routes = [
  {
    path: '',
    component: AddInvestmentPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddInvestmentPageRoutingModule {}
