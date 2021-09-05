import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { INVENTORY_ROUTER } from './inventory.router';
import { InventoryComponent } from './inventory.component';


@NgModule({
  declarations: [
    InventoryComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(INVENTORY_ROUTER),
  ]
})
export class InventoryModule { }
