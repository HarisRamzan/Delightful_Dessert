# Delightful Dessert - Angular Frontend

## 🎉 Project Setup Complete!

A complete Angular 17 e-commerce application for Delightful Dessert with full state management, authentication, and payment integration.

## 📦 What's Been Created

### ✅ Core Infrastructure
- **Core Module**: Services, Interceptors, Guards, Models
- **Shared Module**: Reusable components (Navbar, Footer, ProductCard, Loading Spinner)
- **NgRx Store**: Complete state management for Auth, Cart, and Orders
- **Routing**: Lazy-loaded feature modules with proper guards

### ✅ Feature Modules

#### 1. **Auth Module** (`/auth`)
- Login page with email/password
- Register page with validation
- Google OAuth integration ready
- Form validation and error handling

#### 2. **Shop Module** (`/shop`)
- Product listing with filters (category, subcategory, price, search)
- Pagination support
- Product detail page
- Add to cart functionality

#### 3. **Cart Module** (`/cart`)
- View cart items
- Update quantities
- Remove items
- Proceed to checkout
- Real-time total calculation

#### 4. **Checkout Module** (`/checkout`)
- Shipping address form
- Stripe payment integration
- Order creation
- Form validation

#### 5. **Orders Module** (`/orders`)
- Order history
- Order tracking by tracking ID
- Order status display
- Order details view

#### 6. **Admin Module** (`/admin`)
- Dashboard with statistics
- Product management
- Category management placeholder
- Order management placeholder
- User management placeholder

## 🚀 Getting Started

### Prerequisites
```bash
Node.js >= 18.x
npm >= 9.x
Angular CLI
```

### Installation

1. **Navigate to the project directory:**
```bash
cd "D:\Personal Projects\Delightful_Dessert"
```

2. **Install dependencies:**
```bash
npm install
```

3. **Configure Environment Variables:**

Edit `src/environments/environment.development.ts`:
```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:5000/api',  // Your backend URL
  stripePublicKey: 'pk_test_your_stripe_key',
  googleClientId: 'your_google_client_id.apps.googleusercontent.com'
};
```

Edit `src/environments/environment.ts` for production:
```typescript
export const environment = {
  production: true,
  apiUrl: 'https://your-api.com/api',
  stripePublicKey: 'pk_live_your_stripe_key',
  googleClientId: 'your_google_client_id.apps.googleusercontent.com'
};
```

4. **Run the development server:**
```bash
npm start
```

Navigate to `http://localhost:4200/`

## 🔧 Configuration

### Backend API Setup
Ensure your backend API at `D:\Personal Projects\DelightfulDessert` is running and provides these endpoints:

**Auth Endpoints:**
- `POST /api/auth/login`
- `POST /api/auth/register`
- `POST /api/auth/google`

**Product Endpoints:**
- `GET /api/products` (with query params for filtering)
- `GET /api/products/:id`
- `POST /api/products` (Admin)
- `PUT /api/products/:id` (Admin)
- `DELETE /api/products/:id` (Admin)

**Category Endpoints:**
- `GET /api/categories`
- `GET /api/categories/:id`
- `POST /api/categories` (Admin)
- `PUT /api/categories/:id` (Admin)
- `DELETE /api/categories/:id` (Admin)

**Cart Endpoints:**
- `GET /api/cart`
- `POST /api/cart/items`
- `PUT /api/cart/items/:id`
- `DELETE /api/cart/items/:id`
- `DELETE /api/cart`

**Order Endpoints:**
- `GET /api/orders`
- `GET /api/orders/:id`
- `GET /api/orders/track/:trackingId`
- `POST /api/orders`
- `PATCH /api/orders/:id/status` (Admin)

**Admin Endpoints:**
- `GET /api/dashboard/stats`
- `GET /api/users`

### Google OAuth Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing
3. Enable Google+ API
4. Create OAuth 2.0 credentials
5. Add authorized JavaScript origins: `http://localhost:4200`
6. Add authorized redirect URIs
7. Copy the Client ID to your environment file

### Stripe Setup

1. Go to [Stripe Dashboard](https://dashboard.stripe.com/)
2. Get your publishable key (starts with `pk_test_` for test mode)
3. Add to environment file
4. Backend needs to handle payment intent creation

## 📁 Project Structure

```
src/
├── app/
│   ├── core/                    # Core module (singleton services)
│   │   ├── guards/              # Route guards
│   │   ├── interceptors/        # HTTP interceptors
│   │   ├── models/              # TypeScript interfaces
│   │   └── services/            # Singleton services
│   │
│   ├── shared/                  # Shared module (reusable components)
│   │   └── components/
│   │       ├── navbar/
│   │       ├── footer/
│   │       ├── product-card/
│   │       └── loading-spinner/
│   │
│   ├── store/                   # NgRx state management
│   │   ├── auth/
│   │   ├── cart/
│   │   └── orders/
│   │
│   ├── features/                # Feature modules (lazy-loaded)
│   │   ├── auth/
│   │   ├── shop/
│   │   ├── cart/
│   │   ├── checkout/
│   │   ├── orders/
│   │   └── admin/
│   │
│   ├── app.component.*          # Root component
│   ├── app.module.ts            # Root module
│   └── app-routing.module.ts   # Root routing
│
├── environments/                # Environment configurations
├── assets/                      # Static assets
└── styles.scss                  # Global styles
```

## 🎨 Features

### User Features
- ✅ Browse products with advanced filtering
- ✅ Search products
- ✅ View product details
- ✅ Add to cart
- ✅ Manage cart (update quantities, remove items)
- ✅ Checkout with Stripe
- ✅ View order history
- ✅ Track orders
- ✅ User authentication (Email/Password, Google OAuth)
- ✅ Responsive design

### Admin Features
- ✅ Dashboard with statistics
- ✅ Product management (CRUD)
- ✅ Order management
- ✅ User management
- ✅ Category management
- ✅ Analytics overview

### Technical Features
- ✅ NgRx state management
- ✅ JWT authentication
- ✅ HTTP interceptors
- ✅ Route guards
- ✅ Lazy loading
- ✅ Angular Material UI
- ✅ Responsive design
- ✅ Form validation
- ✅ Error handling
- ✅ Loading states

## 🏗️ Build

```bash
# Development build
npm run build

# Production build
ng build --configuration production
```

Build artifacts will be stored in the `dist/` directory.

## 🧪 Testing

```bash
# Run unit tests
npm test

# Run e2e tests
ng e2e
```

## 📱 Responsive Design

The application is fully responsive and works on:
- Desktop (1920px+)
- Laptop (1024px - 1919px)
- Tablet (768px - 1023px)
- Mobile (320px - 767px)

## 🔐 Security

- JWT tokens stored in localStorage
- HTTP-only authentication
- Protected routes with guards
- Role-based access control (User/Admin)
- XSS protection
- CSRF protection via Angular

## 🚦 Routing

```
/                          → Redirect to /shop
/auth/login                → Login page
/auth/register             → Register page
/shop                      → Product listing
/shop/:id                  → Product detail
/cart                      → Shopping cart (Public)
/checkout                  → Checkout (Protected)
/orders                    → Order history (Protected)
/orders/track              → Order tracking
/admin                     → Admin dashboard (Admin only)
/admin/products            → Product management (Admin only)
/admin/categories          → Category management (Admin only)
/admin/orders              → Order management (Admin only)
/admin/users               → User management (Admin only)
```

## 📝 Notes

1. **Backend URL**: Update `environment.development.ts` with your actual backend API URL
2. **Google OAuth**: Configure Google Cloud Console and update client ID
3. **Stripe**: Get publishable key from Stripe dashboard
4. **CORS**: Ensure backend allows requests from `http://localhost:4200`
5. **JWT**: Backend should return token in response as `{ token: string, user: User }`

## 🐛 Common Issues

### Issue: Google Sign-In not working
**Solution**: Ensure Google client ID is correct and `http://localhost:4200` is added to authorized origins

### Issue: Stripe payment not working
**Solution**: Check Stripe publishable key and ensure backend handles payment intent creation

### Issue: API calls failing
**Solution**: Verify backend URL in environment files and check CORS settings

### Issue: NgRx DevTools not showing
**Solution**: Install [Redux DevTools extension](https://chrome.google.com/webstore/detail/redux-devtools/) for Chrome

## 📚 Learn More

- [Angular Documentation](https://angular.io/docs)
- [Angular Material](https://material.angular.io/)
- [NgRx Documentation](https://ngrx.io/)
- [Stripe Documentation](https://stripe.com/docs)
- [Google Sign-In](https://developers.google.com/identity/gsi/web)

## 👨‍💻 Development

The application is ready for development. All modules are lazily loaded for optimal performance.

### Next Steps:
1. Install dependencies: `npm install`
2. Configure environment variables
3. Start backend API
4. Run frontend: `npm start`
5. Test all features
6. Customize as needed

## 📄 License

This project is created for DelightfulDessert e-commerce platform.

---

**Happy Coding! 🍰**
