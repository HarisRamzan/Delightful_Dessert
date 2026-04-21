import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectCartItemCount } from '../../../store/cart/cart.selectors';
import { User } from '../../../core/models';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  currentUser$: Observable<User | null>;
  cartItemCount$: Observable<number>;
  isMenuOpen = false;

  constructor(
    public authService: AuthService,
    private router: Router,
    private store: Store
  ) {
    this.currentUser$ = this.authService.currentUser$;
    this.cartItemCount$ = this.store.select(selectCartItemCount);
  }

  ngOnInit(): void {}

  logout(): void {
    this.authService.logout();
  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  navigateToAdmin(): void {
    this.router.navigate(['/admin']);
  }

  navigateToOrders(): void {
    this.router.navigate(['/orders']);
  }

  navigateToCart(): void {
    this.router.navigate(['/cart']);
  }

  navigateToShop(): void {
    this.router.navigate(['/shop']);
  }
}
