import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, catchError, exhaustMap, tap } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApiService } from '../../core/services/api.service';
import * as CartActions from './cart.actions';

@Injectable()
export class CartEffects {

  loadCart$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CartActions.loadCart),
      exhaustMap(() =>
        this.apiService.getCart().pipe(
          map(response => 
            CartActions.loadCartSuccess({ 
              items: response.data?.items || [], 
              totalAmount: response.data?.totalAmount || 0 
            })
          ),
          catchError(error => of(CartActions.loadCartFailure({ error })))
        )
      )
    )
  );

  addToCart$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CartActions.addToCart),
      exhaustMap(action =>
        this.apiService.addToCart(action.productId, action.quantity).pipe(
          map(response => {
            this.snackBar.open('Item added to cart!', 'Close', { duration: 3000 });
            // Reload cart to get updated state from backend
            return CartActions.loadCart();
          }),
          catchError(error => {
            this.snackBar.open('Failed to add item to cart', 'Close', { duration: 3000 });
            return of(CartActions.addToCartFailure({ error }));
          })
        )
      )
    )
  );

  updateCartItem$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CartActions.updateCartItem),
      exhaustMap(action =>
        this.apiService.updateCartItem(action.itemId, action.quantity).pipe(
          map(() => {
            // Reload cart to get updated state from backend
            return CartActions.loadCart();
          }),
          catchError(error => of(CartActions.updateCartItemFailure({ error })))
        )
      )
    )
  );

  removeFromCart$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CartActions.removeFromCart),
      exhaustMap(action =>
        this.apiService.removeFromCart(action.itemId).pipe(
          map(() => {
            this.snackBar.open('Item removed from cart', 'Close', { duration: 3000 });
            // Reload cart to get updated state from backend
            return CartActions.loadCart();
          }),
          catchError(error => of(CartActions.removeFromCartFailure({ error })))
        )
      )
    )
  );

  clearCart$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CartActions.clearCart),
      exhaustMap(() =>
        this.apiService.clearCart().pipe(
          map(() => CartActions.clearCartSuccess()),
          catchError(error => of(CartActions.clearCartFailure({ error })))
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private apiService: ApiService,
    private snackBar: MatSnackBar
  ) {}
}
