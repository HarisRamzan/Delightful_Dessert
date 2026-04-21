import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrderListComponent } from './components/order-list/order-list.component';
import { OrderTrackingComponent } from './components/order-tracking/order-tracking.component';

const routes: Routes = [
  { path: '', component: OrderListComponent },
  { path: 'track', component: OrderTrackingComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrdersRoutingModule { }
