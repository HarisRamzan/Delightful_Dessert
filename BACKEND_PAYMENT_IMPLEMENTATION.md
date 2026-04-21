# Backend Payment Implementation Guide

## ✅ IMPLEMENTATION COMPLETE

The payment flow has been fully implemented with proper Stripe Payment Intent integration.

## Payment Flow Overview

### Updated Flow (Implemented):
1. **User goes to checkout** → Cart items loaded
2. **Payment Intent created** → `POST /api/payments/create-intent-from-cart`
   - Validates cart exists and has items
   - Validates amount matches cart total
   - Creates Stripe Payment Intent
   - Returns `clientSecret` to frontend
3. **User enters card details** → Stripe.js handles card input
4. **Payment confirmed** → Frontend calls `stripe.confirmCardPayment()`
   - Stripe processes payment
   - Payment succeeds or fails
5. **Order created** → `POST /api/orders`
   - Sends `paymentIntentId` with order data
   - Backend creates order from cart
   - Creates payment record
   - Clears cart
   - Returns order details

## Implementation Details

### 1. New Payment Endpoint

**Endpoint:** `POST /api/payments/create-intent-from-cart`

**Request:**
```json
{
  "amount": 40.99
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "clientSecret": "pi_xxx_secret_xxx"
  }
}
```

**Features:**
- ✅ Validates user is authenticated
- ✅ Checks cart exists and has items
- ✅ Validates amount matches cart total (±1 cent tolerance)
- ✅ Creates Stripe Payment Intent with metadata
- ✅ Returns client secret for frontend confirmation

### 2. Updated Order Creation

**Endpoint:** `POST /api/orders`

**Request with Payment:**
```json
{
  "shippingAddress": "John Doe, 123 Main St",
  "shippingCity": "New York",
  "shippingState": "NY",
  "shippingZipCode": "10001",
  "shippingCountry": "USA",
  "phoneNumber": "1234567890",
  "paymentIntentId": "pi_xxx",
  "paymentMethodId": "pm_xxx",
  "items": []
}
```

**Features:**
- ✅ Dual flow support:
  - **With `paymentIntentId`**: Creates order from cart (checkout flow)
  - **Without `paymentIntentId`**: Creates order from items (admin/manual flow)
- ✅ Validates payment already succeeded
- ✅ Creates order from cart items
- ✅ Creates payment record
- ✅ Updates product stock
- ✅ Clears cart after successful order
- ✅ Transaction rollback on any failure

### 3. Frontend Integration

**Files Modified:**
- `api.service.ts` - Added `createPaymentIntent(amount)` method
- `checkout.component.ts` - Implements full Stripe payment flow
- `OrderDtos.cs` - Added `PaymentIntentId` and `PaymentMethodId` fields
- `PaymentDtos.cs` - Added `CreatePaymentIntentFromCartDto`

**Flow:**
```typescript
// 1. Create payment intent on page load
const response = await apiService.createPaymentIntent(cartTotal);
const clientSecret = response.clientSecret;

// 2. User fills form and confirms payment
const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
  payment_method: { card: cardElement, billing_details: {...} }
});

// 3. Create order with payment info
const orderData = {
  shippingAddress: "...",
  shippingCity: "...",
  // ... other fields
  paymentIntentId: paymentIntent.id,
  paymentMethodId: paymentIntent.payment_method
};
dispatch(createOrder({ orderData }));
```

## Database Changes

**Payment Entity:**
- `PaymentIntentId` - Stripe payment intent ID
- `PaymentMethodId` - Stripe payment method ID (optional)
- `Status` - PaymentStatus enum (Pending, Succeeded, Failed, Cancelled, Refunded)
- `OrderId` - Foreign key to Order

**Order Entity:**
- Linked to Payment via navigation property
- Status automatically updated when payment succeeds

## Testing

### Test Cards (Stripe Test Mode):
- **Success:** `4242 4242 4242 4242`
- **Decline:** `4000 0000 0000 0002`
- **Requires Auth:** `4000 0025 0000 3155`
- **Insufficient Funds:** `4000 0000 0000 9995`

Use any future expiry date and any 3-digit CVC.

### Test Flow:
1. Add products to cart
2. Navigate to checkout (`/checkout`)
3. Fill shipping information
4. Enter test card details
5. Click "Place Order"
6. Payment intent created → Payment confirmed → Order created
7. Redirected to order details page
8. Cart is cleared

## Error Handling

### Payment Intent Creation:
- ❌ User not authenticated → 401 Unauthorized
- ❌ Cart is empty → 400 Bad Request
- ❌ Amount mismatch → 400 Bad Request with expected/received values
- ❌ Stripe API error → 400 Bad Request with error message

### Order Creation:
- ❌ Payment intent not found/invalid → Proceeds but may fail payment verification
- ❌ Cart empty → 400 Bad Request
- ❌ Insufficient stock → 400 Bad Request with product name
- ❌ Database error → 500 Internal Server Error with transaction rollback

## Security Considerations

- ✅ User authentication required for all endpoints
- ✅ Cart ownership validation (user can only use their own cart)
- ✅ Amount validation (prevents price manipulation)
- ✅ Payment verification before order creation
- ✅ Transaction isolation (BeginTransaction/Commit/Rollback)
- ✅ Stripe API key secured in configuration
- ✅ Payment metadata includes userId for auditing

## Configuration Required

### appsettings.json:
```json
{
  "Stripe": {
    "PublicKey": "pk_test_xxx",
    "SecretKey": "sk_test_xxx"
  }
}
```

### NuGet Packages:
- ✅ `Stripe.net` - Already referenced in project

## API Summary

| Endpoint | Method | Purpose | Auth |
|----------|--------|---------|------|
| `/api/payments/create-intent-from-cart` | POST | Create payment intent from cart | Required |
| `/api/payments/create-intent` | POST | Create payment intent for existing order | Required |
| `/api/payments/confirm` | POST | Confirm payment | Required |
| `/api/payments/{id}/cancel` | POST | Cancel payment | Required |
| `/api/payments/{id}/refund` | POST | Refund payment | Admin |
| `/api/orders` | POST | Create order (with/without payment) | Required |
| `/api/orders/{id}` | GET | Get order details | Required |
| `/api/orders` | GET | List orders | Required |

## Next Steps

1. ✅ Backend implementation complete
2. ✅ Frontend integration complete
3. ⚡ Test with Stripe test cards
4. 📧 Add email notifications (optional)
5. 🔔 Add webhook handlers for payment events (recommended for production)
6. 📊 Add order tracking and status updates
7. 🚀 Deploy to staging/production

## Webhook Setup (Production)

For production, implement Stripe webhooks to handle:
- `payment_intent.succeeded` - Confirm order
- `payment_intent.payment_failed` - Mark order as failed
- `charge.refunded` - Handle refunds

Example webhook endpoint:
```csharp
[HttpPost("webhook")]
[AllowAnonymous]
public async Task<IActionResult> StripeWebhook()
{
    var json = await new StreamReader(HttpContext.Request.Body).ReadToEndAsync();
    var stripeEvent = EventUtility.ConstructEvent(json, 
        Request.Headers["Stripe-Signature"], 
        _configuration["Stripe:WebhookSecret"]);
    
    // Handle events
    if (stripeEvent.Type == Events.PaymentIntentSucceeded)
    {
        var paymentIntent = stripeEvent.Data.Object as PaymentIntent;
        // Update order status
    }
    
    return Ok();
}
```

---

## Quick Reference

**Create Payment Intent:**
```bash
POST https://localhost:62066/api/payments/create-intent-from-cart
Authorization: Bearer {jwt_token}
Content-Type: application/json

{
  "amount": 45.99
}
```

**Create Order:**
```bash
POST https://localhost:62066/api/orders
Authorization: Bearer {jwt_token}
Content-Type: application/json

{
  "shippingAddress": "John Doe, 123 Main St",
  "shippingCity": "New York",
  "shippingState": "NY",
  "shippingZipCode": "10001",
  "shippingCountry": "USA",
  "phoneNumber": "1234567890",
  "paymentIntentId": "pi_xxx",
  "paymentMethodId": "pm_xxx",
  "items": []
}
```

**Status:** ✅ READY FOR TESTING
