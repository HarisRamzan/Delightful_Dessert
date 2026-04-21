import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Order, OrderStatus } from '../../../../core/models';
import * as OrdersActions from '../../../../store/orders/orders.actions';
import { selectAllOrders, selectOrdersLoading } from '../../../../store/orders/orders.selectors';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss']
})
export class OrderListComponent implements OnInit {
  orders$: Observable<Order[]>;
  loading$: Observable<boolean>;

  constructor(
    private store: Store,
    private router: Router
  ) {
    this.orders$ = this.store.select(selectAllOrders);
    this.loading$ = this.store.select(selectOrdersLoading);
  }

  ngOnInit(): void {
    this.store.dispatch(OrdersActions.loadOrders());
  }

  viewOrderDetails(orderId: string): void {
    this.router.navigate(['/orders', orderId]);
  }

  getStatusColor(status: string): string {
    const colors: { [key: string]: string } = {
      'Pending': 'warn',
      'Processing': 'accent',
      'Shipped': 'primary',
      'Delivered': 'primary',
      'Cancelled': 'warn'
    };
    return colors[status] || 'primary';
  }

  getStatusIcon(status: string): string {
    const icons: { [key: string]: string } = {
      'Pending': 'schedule',
      'Processing': 'autorenew',
      'Shipped': 'local_shipping',
      'Delivered': 'check_circle',
      'Cancelled': 'cancel'
    };
    return icons[status] || 'info';
  }
}
