import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment.development';

// Store imports
import { authReducer } from './store/auth/auth.reducer';
import { cartReducer } from './store/cart/cart.reducer';
import { ordersReducer } from './store/orders/orders.reducer';
import { AuthEffects } from './store/auth/auth.effects';
import { CartEffects } from './store/cart/cart.effects';
import { OrdersEffects } from './store/orders/orders.effects';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    CoreModule,
    SharedModule,
    StoreModule.forRoot({
      auth: authReducer,
      cart: cartReducer,
      orders: ordersReducer
    }),
    EffectsModule.forRoot([AuthEffects, CartEffects, OrdersEffects]),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
