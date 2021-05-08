import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewInvestmentPageRoutingModule } from './view-investment-routing.module';

import { ViewInvestmentPage } from './view-investment.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    ViewInvestmentPageRoutingModule
  ],
  declarations: [ViewInvestmentPage]
})
export class ViewInvestmentPageModule {}
