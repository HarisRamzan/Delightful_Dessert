import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as CartActions from './store/cart/cart.actions';
import { AuthService } from './core/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Delightful Dessert';

  constructor(
    private store: Store,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    // Load cart from backend if user is authenticated
    if (this.authService.isAuthenticated()) {
      this.store.dispatch(CartActions.loadCart());
    }
  }
}
