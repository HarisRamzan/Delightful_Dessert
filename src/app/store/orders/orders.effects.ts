import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, catchError, exhaustMap, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApiService } from '../../core/services/api.service';
import * as OrdersActions from './orders.actions';
import * as CartActions from '../cart/cart.actions';
import { Store } from '@ngrx/store';

@Injectable()
export class OrdersEffects {

  loadOrders$ = createEffect(() =>
    this.actions$.pipe(
      ofType(OrdersActions.loadOrders),
      exhaustMap(() =>
        this.apiService.getOrders().pipe(
          map(response => OrdersActions.loadOrdersSuccess({ orders: response.data })),
          catchError(error => of(OrdersActions.loadOrdersFailure({ error })))
        )
      )
    )
  );

  loadOrder$ = createEffect(() =>
    this.actions$.pipe(
      ofType(OrdersActions.loadOrder),
      exhaustMap(action =>
        this.apiService.getOrder(action.id).pipe(
          map(order => OrdersActions.loadOrderSuccess({ order })),
          catchError(error => of(OrdersActions.loadOrderFailure({ error })))
        )
      )
    )
  );

  trackOrder$ = createEffect(() =>
    this.actions$.pipe(
      ofType(OrdersActions.trackOrder),
      exhaustMap(action =>
        this.apiService.getOrderByTrackingId(action.trackingId).pipe(
          map(order => OrdersActions.trackOrderSuccess({ order })),
          catchError(error => of(OrdersActions.trackOrderFailure({ error })))
        )
      )
    )
  );

  createOrder$ = createEffect(() =>
    this.actions$.pipe(
      ofType(OrdersActions.createOrder),
      exhaustMap(action =>
        this.apiService.createOrder(action.orderData).pipe(
          map(order => {
            this.snackBar.open('Order placed successfully!', 'Close', { duration: 5000 });
            return OrdersActions.createOrderSuccess({ order });
          }),
          catchError(error => of(OrdersActions.createOrderFailure({ error })))
        )
      )
    )
  );

  createOrderSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(OrdersActions.createOrderSuccess),
        tap(({ order }) => {
          this.store.dispatch(CartActions.clearCart());
          this.router.navigate(['/orders', order.id]);
        })
      ),
    { dispatch: false }
  );

  updateOrderStatus$ = createEffect(() =>
    this.actions$.pipe(
      ofType(OrdersActions.updateOrderStatus),
      exhaustMap(action =>
        this.apiService.updateOrderStatus(action.orderId, action.status).pipe(
          map(order => {
            this.snackBar.open('Order status updated', 'Close', { duration: 3000 });
            return OrdersActions.updateOrderStatusSuccess({ order });
          }),
          catchError(error => of(OrdersActions.updateOrderStatusFailure({ error })))
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private apiService: ApiService,
    private router: Router,
    private snackBar: MatSnackBar,
    private store: Store
  ) {}
}
