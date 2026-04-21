import { createReducer, on } from '@ngrx/store';
import { Order } from '../../core/models';
import * as OrdersActions from './orders.actions';

export interface OrdersState {
  orders: Order[];
  selectedOrder: Order | null;
  loading: boolean;
  error: any;
}

export const initialState: OrdersState = {
  orders: [],
  selectedOrder: null,
  loading: false,
  error: null
};

export const ordersReducer = createReducer(
  initialState,

  // Load orders
  on(OrdersActions.loadOrders, state => ({
    ...state,
    loading: true
  })),
  on(OrdersActions.loadOrdersSuccess, (state, { orders }) => ({
    ...state,
    orders,
    loading: false,
    error: null
  })),
  on(OrdersActions.loadOrdersFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  // Load order
  on(OrdersActions.loadOrder, state => ({
    ...state,
    loading: true
  })),
  on(OrdersActions.loadOrderSuccess, (state, { order }) => ({
    ...state,
    selectedOrder: order,
    loading: false,
    error: null
  })),
  on(OrdersActions.loadOrderFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  // Track order
  on(OrdersActions.trackOrder, state => ({
    ...state,
    loading: true
  })),
  on(OrdersActions.trackOrderSuccess, (state, { order }) => ({
    ...state,
    selectedOrder: order,
    loading: false,
    error: null
  })),
  on(OrdersActions.trackOrderFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  // Create order
  on(OrdersActions.createOrder, state => ({
    ...state,
    loading: true
  })),
  on(OrdersActions.createOrderSuccess, (state, { order }) => ({
    ...state,
    orders: [...state.orders, order],
    selectedOrder: order,
    loading: false,
    error: null
  })),
  on(OrdersActions.createOrderFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  // Update order status
  on(OrdersActions.updateOrderStatus, state => ({
    ...state,
    loading: true
  })),
  on(OrdersActions.updateOrderStatusSuccess, (state, { order }) => ({
    ...state,
    orders: state.orders.map(o => o.id === order.id ? order : o),
    selectedOrder: state.selectedOrder?.id === order.id ? order : state.selectedOrder,
    loading: false,
    error: null
  })),
  on(OrdersActions.updateOrderStatusFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  }))
);
