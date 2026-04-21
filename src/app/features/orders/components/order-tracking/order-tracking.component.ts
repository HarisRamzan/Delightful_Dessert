import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Order } from '../../../../core/models';
import * as OrdersActions from '../../../../store/orders/orders.actions';
import { selectSelectedOrder, selectOrdersLoading } from '../../../../store/orders/orders.selectors';

@Component({
  selector: 'app-order-tracking',
  templateUrl: './order-tracking.component.html',
  styleUrls: ['./order-tracking.component.scss']
})
export class OrderTrackingComponent implements OnInit {
  trackingForm: FormGroup;
  order$: Observable<Order | null>;
  loading$: Observable<boolean>;

  constructor(
    private fb: FormBuilder,
    private store: Store
  ) {
    this.trackingForm = this.fb.group({
      trackingId: ['', [Validators.required]]
    });
    
    this.order$ = this.store.select(selectSelectedOrder);
    this.loading$ = this.store.select(selectOrdersLoading);
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.trackingForm.valid) {
      const trackingId = this.trackingForm.value.trackingId;
      this.store.dispatch(OrdersActions.trackOrder({ trackingId }));
    }
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
}
