# Delightful Dessert - Frontend

Angular application for the Delightful Dessert e-commerce platform.

## Features

- **Authentication**: Login, Register, Google OAuth
- **Shopping**: Product browsing, filtering, cart management
- **Checkout**: Stripe payment integration
- **Admin Dashboard**: Product, Category, Order, and User management
- **Order Tracking**: Track orders by tracking ID
- **State Management**: NgRx for Auth, Cart, and Orders
- **UI**: Angular Material with responsive design

## Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Angular CLI (`npm install -g @angular/cli`)

## Setup

1. Install dependencies:
```bash
npm install
```

2. Configure environment:
Edit `src/environments/environment.ts` and `src/environments/environment.development.ts` with your backend API URL and keys.

3. Run development server:
```bash
npm start
```

Navigate to `http://localhost:4200/`

## Build

```bash
npm run build
```

Build artifacts will be stored in the `dist/` directory.

## Project Structure

```
src/
├── app/
│   ├── core/              # Core module (services, interceptors, guards)
│   ├── shared/            # Shared components and utilities
│   ├── features/
│   │   ├── auth/          # Authentication module
│   │   ├── admin/         # Admin dashboard
│   │   ├── shop/          # Product browsing
│   │   ├── cart/          # Shopping cart
│   │   ├── checkout/      # Checkout process
│   │   └── orders/        # Order management
│   └── store/             # NgRx state management
└── environments/          # Environment configurations
```

## Technologies

- Angular 17
- NgRx (State Management)
- Angular Material
- Chart.js (Admin Dashboard)
- Stripe (Payment Processing)
- TypeScript
