import { createAction, props } from '@ngrx/store';
import { CartItem, Product } from '../../core/models';

// Load cart
export const loadCart = createAction('[Cart] Load Cart');

export const loadCartSuccess = createAction(
  '[Cart] Load Cart Success',
  props<{ items: CartItem[]; totalAmount: number }>()
);

export const loadCartFailure = createAction(
  '[Cart] Load Cart Failure',
  props<{ error: any }>()
);

// Add to cart
export const addToCart = createAction(
  '[Cart] Add To Cart',
  props<{ productId: number; quantity: number }>()
);

export const addToCartSuccess = createAction(
  '[Cart] Add To Cart Success',
  props<{ item: CartItem }>()
);

export const addToCartFailure = createAction(
  '[Cart] Add To Cart Failure',
  props<{ error: any }>()
);

// Update cart item
export const updateCartItem = createAction(
  '[Cart] Update Cart Item',
  props<{ itemId: number; quantity: number }>()
);

export const updateCartItemSuccess = createAction(
  '[Cart] Update Cart Item Success',
  props<{ itemId: number; quantity: number }>()
);

export const updateCartItemFailure = createAction(
  '[Cart] Update Cart Item Failure',
  props<{ error: any }>()
);

// Remove from cart
export const removeFromCart = createAction(
  '[Cart] Remove From Cart',
  props<{ itemId: number }>()
);

export const removeFromCartSuccess = createAction(
  '[Cart] Remove From Cart Success',
  props<{ itemId: number }>()
);

export const removeFromCartFailure = createAction(
  '[Cart] Remove From Cart Failure',
  props<{ error: any }>()
);

// Clear cart
export const clearCart = createAction('[Cart] Clear Cart');

export const clearCartSuccess = createAction('[Cart] Clear Cart Success');

export const clearCartFailure = createAction(
  '[Cart] Clear Cart Failure',
  props<{ error: any }>()
);
