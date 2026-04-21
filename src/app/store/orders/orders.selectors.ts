import { createFeatureSelector, createSelector } from '@ngrx/store';
import { OrdersState } from './orders.reducer';

export const selectOrdersState = createFeatureSelector<OrdersState>('orders');

export const selectAllOrders = createSelector(
  selectOrdersState,
  (state: OrdersState) => state.orders
);

export const selectSelectedOrder = createSelector(
  selectOrdersState,
  (state: OrdersState) => state.selectedOrder
);

export const selectOrdersLoading = createSelector(
  selectOrdersState,
  (state: OrdersState) => state.loading
);

export const selectOrdersError = createSelector(
  selectOrdersState,
  (state: OrdersState) => state.error
);
