import { createAction, props } from '@ngrx/store';
import { Order } from '../../core/models';

// Load orders
export const loadOrders = createAction('[Orders] Load Orders');

export const loadOrdersSuccess = createAction(
  '[Orders] Load Orders Success',
  props<{ orders: Order[] }>()
);

export const loadOrdersFailure = createAction(
  '[Orders] Load Orders Failure',
  props<{ error: any }>()
);

// Load order by ID
export const loadOrder = createAction(
  '[Orders] Load Order',
  props<{ id: string }>()
);

export const loadOrderSuccess = createAction(
  '[Orders] Load Order Success',
  props<{ order: Order }>()
);

export const loadOrderFailure = createAction(
  '[Orders] Load Order Failure',
  props<{ error: any }>()
);

// Track order by tracking ID
export const trackOrder = createAction(
  '[Orders] Track Order',
  props<{ trackingId: string }>()
);

export const trackOrderSuccess = createAction(
  '[Orders] Track Order Success',
  props<{ order: Order }>()
);

export const trackOrderFailure = createAction(
  '[Orders] Track Order Failure',
  props<{ error: any }>()
);

// Create order
export const createOrder = createAction(
  '[Orders] Create Order',
  props<{ orderData: any }>()
);

export const createOrderSuccess = createAction(
  '[Orders] Create Order Success',
  props<{ order: Order }>()
);

export const createOrderFailure = createAction(
  '[Orders] Create Order Failure',
  props<{ error: any }>()
);

// Update order status (Admin)
export const updateOrderStatus = createAction(
  '[Orders] Update Order Status',
  props<{ orderId: string; status: string }>()
);

export const updateOrderStatusSuccess = createAction(
  '[Orders] Update Order Status Success',
  props<{ order: Order }>()
);

export const updateOrderStatusFailure = createAction(
  '[Orders] Update Order Status Failure',
  props<{ error: any }>()
);
