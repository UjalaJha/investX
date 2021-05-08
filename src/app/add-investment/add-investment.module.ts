import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddInvestmentPageRoutingModule } from './add-investment-routing.module';

import { AddInvestmentPage } from './add-investment.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    AddInvestmentPageRoutingModule
  ],
  declarations: [AddInvestmentPage]
})
export class AddInvestmentPageModule {}
