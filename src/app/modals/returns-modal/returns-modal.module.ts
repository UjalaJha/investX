import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReturnsModalPageRoutingModule } from './returns-modal-routing.module';

import { ReturnsModalPage } from './returns-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    ReturnsModalPageRoutingModule
  ],
  declarations: [ReturnsModalPage]
})
export class ReturnsModalPageModule {}
