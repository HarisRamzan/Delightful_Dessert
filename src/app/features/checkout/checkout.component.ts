import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { loadStripe, Stripe, StripeElements, StripeCardElement } from '@stripe/stripe-js';
import { environment } from '../../../environments/environment.development';
import * as OrdersActions from '../../store/orders/orders.actions';
import { selectCartItems, selectCartTotalAmount } from '../../store/cart/cart.selectors';
import { ApiService } from '../../core/services/api.service';
import { take } from 'rxjs/operators';

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
  clientSecret: string | null = null;

  constructor(
    private fb: FormBuilder,
    private store: Store,
    private router: Router,
    private apiService: ApiService
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
    try {
      // Initialize Stripe
      this.stripe = await loadStripe(environment.stripePublicKey);
      if (!this.stripe) {
        this.error = 'Failed to load payment system. Please refresh the page.';
        console.error('Stripe failed to initialize');
        return;
      }

      // Create payment intent when component loads
      this.totalAmount$.pipe(take(1)).subscribe(async (amount) => {
        if (amount && amount > 0) {
          try {
            const response = await this.apiService.createPaymentIntent(amount).toPromise();
            this.clientSecret = response?.clientSecret || null;
            console.log('Payment intent created successfully');
          } catch (err) {
            this.error = 'Failed to initialize payment. Please try again.';
            console.error('Error creating payment intent:', err);
          }
        }
      });
    } catch (err) {
      this.error = 'Payment system unavailable. Please try again later.';
      console.error('Error loading Stripe:', err);
    }
  }

  ngAfterViewInit(): void {
    // Use setTimeout to ensure DOM is fully rendered
    setTimeout(() => {
      if (this.stripe) {
        try {
          this.elements = this.stripe.elements();
          this.card = this.elements.create('card', {
            style: {
              base: {
                fontSize: '16px',
                color: '#32325d',
                fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
                fontSmoothing: 'antialiased',
                '::placeholder': {
                  color: '#aab7c4'
                }
              },
              invalid: {
                color: '#f44336',
                iconColor: '#f44336'
              }
            },
            hidePostalCode: true
          });
          
          const cardElement = document.getElementById('card-element');
          if (cardElement) {
            this.card.mount('#card-element');
            console.log('Stripe card element mounted successfully');
          } else {
            this.error = 'Payment form not found. Please refresh the page.';
            console.error('Card element div not found');
          }
          
          this.card.on('change', (event) => {
            if (event.error) {
              this.error = event.error.message;
            } else {
              this.error = null;
            }
          });
        } catch (err) {
          this.error = 'Failed to initialize payment form. Please refresh the page.';
          console.error('Error creating Stripe element:', err);
        }
      } else {
        this.error = 'Payment system not available. Please refresh the page.';
      }
    }, 100);
  }

  async onSubmit(): Promise<void> {
    if (!this.shippingForm.valid || !this.stripe || !this.card || !this.clientSecret) {
      if (!this.clientSecret) {
        this.error = 'Payment not initialized. Please refresh the page.';
      }
      return;
    }

    this.processing = true;
    this.error = null;

    try {
      // Confirm the payment with Stripe
      const { error, paymentIntent } = await this.stripe.confirmCardPayment(this.clientSecret, {
        payment_method: {
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
        }
      });

      if (error) {
        this.error = error.message || 'Payment failed';
        this.processing = false;
      } else if (paymentIntent && paymentIntent.status === 'succeeded') {
        // Payment successful, create order
        const formValue = this.shippingForm.value;
        const orderData = {
          shippingAddress: `${formValue.fullName}, ${formValue.addressLine1}${formValue.addressLine2 ? ', ' + formValue.addressLine2 : ''}`,
          shippingCity: formValue.city,
          shippingState: formValue.state,
          shippingZipCode: formValue.zipCode,
          shippingCountry: formValue.country,
          phoneNumber: formValue.phoneNumber,
          paymentIntentId: paymentIntent.id,
          paymentMethodId: paymentIntent.payment_method as string,
          items: [] // Items will be taken from cart on backend
        };
        
        this.store.dispatch(OrdersActions.createOrder({ orderData }));
        // Navigation will be handled by the effect after successful order creation
      } else {
        this.error = 'Payment was not completed. Please try again.';
        this.processing = false;
      }
    } catch (err: any) {
      this.error = err.message || 'An error occurred during payment.';
      this.processing = false;
      console.error('Payment error:', err);
    }
  }

  goBack(): void {
    this.router.navigate(['/cart']);    
  }
}
