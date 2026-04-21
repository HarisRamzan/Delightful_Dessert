import { createReducer, on } from '@ngrx/store';
import { CartItem } from '../../core/models';
import * as CartActions from './cart.actions';

export interface CartState {
  items: CartItem[];
  totalAmount: number;
  loading: boolean;
  error: any;
}

export const initialState: CartState = {
  items: [],
  totalAmount: 0,
  loading: false,
  error: null
};

export const cartReducer = createReducer(
  initialState,

  // Load cart
  on(CartActions.loadCart, state => ({
    ...state,
    loading: true
  })),
  on(CartActions.loadCartSuccess, (state, { items, totalAmount }) => ({
    ...state,
    items,
    totalAmount,
    loading: false,
    error: null
  })),
  on(CartActions.loadCartFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  // Add to cart
  on(CartActions.addToCart, state => ({
    ...state,
    loading: true
  })),
  on(CartActions.addToCartSuccess, (state, { item }) => ({
    ...state,
    items: [...state.items, item],
    totalAmount: state.totalAmount + (item.price * item.quantity),
    loading: false,
    error: null
  })),
  on(CartActions.addToCartFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  // Update cart item
  on(CartActions.updateCartItem, state => ({
    ...state,
    loading: true
  })),
  on(CartActions.updateCartItemSuccess, (state, { itemId, quantity }) => {
    const updatedItems = state.items.map(item =>
      item.id === itemId ? { ...item, quantity } : item
    );
    const totalAmount = updatedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    return {
      ...state,
      items: updatedItems,
      totalAmount,
      loading: false,
      error: null
    };
  }),
  on(CartActions.updateCartItemFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  // Remove from cart
  on(CartActions.removeFromCart, state => ({
    ...state,
    loading: true
  })),
  on(CartActions.removeFromCartSuccess, (state, { itemId }) => {
    const updatedItems = state.items.filter(item => item.id !== itemId);
    const totalAmount = updatedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    return {
      ...state,
      items: updatedItems,
      totalAmount,
      loading: false,
      error: null
    };
  }),
  on(CartActions.removeFromCartFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  // Clear cart
  on(CartActions.clearCart, state => ({
    ...state,
    loading: true
  })),
  on(CartActions.clearCartSuccess, () => initialState),
  on(CartActions.clearCartFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  }))
);
