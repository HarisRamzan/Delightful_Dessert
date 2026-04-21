import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { OrdersRoutingModule } from './orders-routing.module';
import { OrderListComponent } from './components/order-list/order-list.component';
import { OrderTrackingComponent } from './components/order-tracking/order-tracking.component';

@NgModule({
  declarations: [
    OrderListComponent,
    OrderTrackingComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    OrdersRoutingModule
  ]
})
export class OrdersModule { }
