import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CartItem } from '../../core/models';
import * as CartActions from '../../store/cart/cart.actions';
import { selectCartItems, selectCartTotalAmount, selectCartLoading } from '../../store/cart/cart.selectors';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  cartItems$: Observable<CartItem[]>;
  totalAmount$: Observable<number>;
  loading$: Observable<boolean>;

  constructor(
    private store: Store,
    private router: Router
  ) {
    this.cartItems$ = this.store.select(selectCartItems);
    this.totalAmount$ = this.store.select(selectCartTotalAmount);
    this.loading$ = this.store.select(selectCartLoading);
  }

  ngOnInit(): void {
    this.store.dispatch(CartActions.loadCart());
  }

  updateQuantity(item: CartItem, change: number): void {
    const newQuantity = item.quantity + change;
    if (newQuantity > 0 && newQuantity <= item.availableStock) {
      this.store.dispatch(CartActions.updateCartItem({ itemId: item.id, quantity: newQuantity }));
    }
  }

  removeItem(itemId: number): void {
    this.store.dispatch(CartActions.removeFromCart({ itemId }));
  }

  proceedToCheckout(): void {
    this.router.navigate(['/checkout']);
  }

  continueShopping(): void {
    this.router.navigate(['/shop']);
  }
}
