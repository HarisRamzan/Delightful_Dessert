import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CartState } from './cart.reducer';

export const selectCartState = createFeatureSelector<CartState>('cart');

export const selectCartItems = createSelector(
  selectCartState,
  (state: CartState) => state.items
);

export const selectCartItemCount = createSelector(
  selectCartItems,
  (items) => items.reduce((count, item) => count + item.quantity, 0)
);

export const selectCartItemsCount = createSelector(
  selectCartItems,
  (items) => items.length
);

export const selectCartTotalAmount = createSelector(
  selectCartState,
  (state: CartState) => state.totalAmount
);

export const selectCartLoading = createSelector(
  selectCartState,
  (state: CartState) => state.loading
);

export const selectCartError = createSelector(
  selectCartState,
  (state: CartState) => state.error
);
