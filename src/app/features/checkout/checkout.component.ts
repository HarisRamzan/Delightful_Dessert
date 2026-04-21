import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { loadStripe, Stripe, StripeElements, StripeCardElement } from '@stripe/stripe-js';
import { environment } from '../../../environments/environment.development';
import * as OrdersActions from '../../store/orders/orders.actions';
import { selectCartItems, selectCartTotalAmount } from '../../store/cart/cart.selectors';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit, AfterViewInit {
  shippingForm: FormGroup;
  cartItems$ = this.store.select(selectCartItems);
  totalAmount$ = this.store.select(selectCartTotalAmount);
  
  stripe: Stripe | null = null;
  elements: StripeElements | null = null;
  card: StripeCardElement | null = null;
  processing = false;
  error: string | null = null;

  constructor(
    private fb: FormBuilder,
    private store: Store,
    private router: Router
  ) {
    this.shippingForm = this.fb.group({
      fullName: ['', Validators.required],
      addressLine1: ['', Validators.required],
      addressLine2: [''],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zipCode: ['', [Validators.required, Validators.pattern(/^\d{5}$/)]],
      country: ['USA', Validators.required],
      phoneNumber: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]]
    });
  }

  async ngOnInit(): Promise<void> {
    this.stripe = await loadStripe(environment.stripePublicKey);
  }

  ngAfterViewInit(): void {
    if (this.stripe) {
      this.elements = this.stripe.elements();
      this.card = this.elements.create('card', {
        style: {
          base: {
            fontSize: '16px',
            color: '#32325d',
            '::placeholder': {
              color: '#aab7c4'
            }
          }
        }
      });
      this.card.mount('#card-element');
      
      this.card.on('change', (event) => {
        if (event.error) {
          this.error = event.error.message;
        } else {
          this.error = null;
        }
      });
    }
  }

  async onSubmit(): Promise<void> {
    if (!this.shippingForm.valid || !this.stripe || !this.card) {
      return;
    }

    this.processing = true;
    this.error = null;

    const { error, paymentMethod } = await this.stripe.createPaymentMethod({
      type: 'card',
      card: this.card,
      billing_details: {
        name: this.shippingForm.value.fullName,
        address: {
          line1: this.shippingForm.value.addressLine1,
          line2: this.shippingForm.value.addressLine2,
          city: this.shippingForm.value.city,
          state: this.shippingForm.value.state,
          postal_code: this.shippingForm.value.zipCode,
          country: 'US'
        }
      }
    });

    if (error) {
      this.error = error.message || 'Payment failed';
      this.processing = false;
    } else if (paymentMethod) {
      const orderData = {
        shippingAddress: this.shippingForm.value,
        paymentMethodId: paymentMethod.id
      };
      
      this.store.dispatch(OrdersActions.createOrder({ orderData }));
      // Navigation will be handled by the effect after successful order creation
    }
  }

  goBack(): void {
    this.router.navigate(['/cart']);
  }
}
