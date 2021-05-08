import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewInvestmentPage } from './view-investment.page';

const routes: Routes = [
  {
    path: '',
    component: ViewInvestmentPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewInvestmentPageRoutingModule {}
