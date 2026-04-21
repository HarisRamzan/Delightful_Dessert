# ✅ Delightful Dessert Frontend - Setup Checklist

## Pre-Flight Checklist

### 1. Prerequisites
- [ ] Node.js installed (v18 or higher) - Run: `node --version`
- [ ] npm installed (v9 or higher) - Run: `npm --version`
- [ ] Angular CLI installed - Run: `ng version` or install with `npm install -g @angular/cli`
- [ ] Backend API running at `D:\Personal Projects\DelightfulDessert`
- [ ] Git installed (optional but recommended)

### 2. Initial Setup
- [ ] Navigate to project: `cd "D:\Personal Projects\Delightful_Dessert"`
- [ ] Run automated setup: `.\quick-start.ps1` **OR**
- [ ] Manual install: `npm install`

### 3. Environment Configuration

#### File: `src/environments/environment.development.ts`
- [ ] Set `apiUrl` to your backend URL (e.g., `http://localhost:5000/api`)
- [ ] Add Stripe publishable key
- [ ] Add Google OAuth Client ID

#### File: `src/environments/environment.ts` (for production)
- [ ] Set production `apiUrl`
- [ ] Add production Stripe key
- [ ] Add production Google Client ID

### 4. Backend Integration
- [ ] Backend is running and accessible
- [ ] CORS is enabled for `http://localhost:4200`
- [ ] All required API endpoints are implemented
- [ ] JWT authentication is working

### 5. External Services Setup

#### Google OAuth
- [ ] Google Cloud Project created
- [ ] OAuth 2.0 credentials created
- [ ] Authorized JavaScript origins: `http://localhost:4200`
- [ ] Client ID copied to environment file

#### Stripe
- [ ] Stripe account created
- [ ] Test mode enabled
- [ ] Publishable key copied from dashboard
- [ ] Backend configured to handle payment intents

## Running the Application

### Development Server
```powershell
npm start
```
- [ ] App opens at `http://localhost:4200`
- [ ] No compilation errors
- [ ] Browser console clean (no errors)

### Build for Production
```powershell
ng build --configuration production
```
- [ ] Build completes successfully
- [ ] Output in `dist/` folder

## Feature Testing Checklist

### Authentication
- [ ] Can register new user
- [ ] Can login with email/password
- [ ] Can login with Google (if configured)
- [ ] JWT token stored in localStorage
- [ ] Token included in API requests
- [ ] Logout works correctly
- [ ] Protected routes redirect to login

### Shop/Products
- [ ] Product list loads correctly
- [ ] Can filter by category
- [ ] Can filter by subcategory
- [ ] Search works
- [ ] Price filter works
- [ ] Pagination works
- [ ] Product detail page loads
- [ ] Can add to cart from list
- [ ] Can add to cart from detail page

### Cart
- [ ] Cart icon shows item count
- [ ] Cart page displays items
- [ ] Can update quantities
- [ ] Can remove items
- [ ] Total calculates correctly
- [ ] Proceed to checkout button works

### Checkout
- [ ] Shipping form validation works
- [ ] Card element displays
- [ ] Can submit order
- [ ] Success message appears
- [ ] Cart clears after order
- [ ] Redirects to order detail

### Orders
- [ ] Order history displays
- [ ] Can view order details
- [ ] Can track by tracking ID
- [ ] Order status displays correctly

### Admin (if user is Admin)
- [ ] Can access admin dashboard
- [ ] Statistics display
- [ ] Can view product list
- [ ] Can add/edit/delete products
- [ ] Alerts display for pending orders

### UI/UX
- [ ] Navbar displays correctly
- [ ] Footer displays
- [ ] Responsive on mobile
- [ ] Responsive on tablet
- [ ] Material theme applied
- [ ] Loading spinners show
- [ ] Error messages display
- [ ] Success messages display

## Troubleshooting Checklist

### Common Issues

#### "Cannot GET /"
- [ ] Check `npm start` completed successfully
- [ ] Navigate to `http://localhost:4200`
- [ ] Check terminal for errors

#### API Errors (401, 404, 500)
- [ ] Backend is running
- [ ] Correct API URL in environment
- [ ] CORS configured on backend
- [ ] JWT token valid

#### Google Sign-In Not Working
- [ ] Client ID correct
- [ ] Script loaded in index.html
- [ ] Origin authorized in Google Console

#### Stripe Not Working
- [ ] Publishable key correct
- [ ] Stripe.js loaded
- [ ] Backend handles payment intent

#### NgRx Store Issues
- [ ] Redux DevTools installed
- [ ] No circular dependencies
- [ ] Actions dispatched correctly

#### Build Errors
- [ ] Run `npm install` again
- [ ] Delete `node_modules` and reinstall
- [ ] Check TypeScript errors
- [ ] Update Angular CLI if needed

## Deployment Checklist

### Pre-Deployment
- [ ] All features tested
- [ ] Environment variables configured for production
- [ ] Build completes without errors
- [ ] No console errors in production build
- [ ] API endpoints updated for production
- [ ] SSL certificates configured (HTTPS)

### Production Environment
- [ ] Production API URL configured
- [ ] Production Stripe keys
- [ ] Production Google OAuth
- [ ] CORS configured for production domain
- [ ] JWT secrets updated

### Post-Deployment
- [ ] Test all features in production
- [ ] Monitor for errors
- [ ] Check performance
- [ ] Set up error tracking (e.g., Sentry)

## Documentation Checklist

- [ ] Read [README.md](README.md)
- [ ] Read [SETUP_GUIDE.md](SETUP_GUIDE.md)
- [ ] Read [IMPLEMENTATION_GUIDE.md](IMPLEMENTATION_GUIDE.md)
- [ ] Read [PROJECT_SUMMARY.md](PROJECT_SUMMARY.md)

## Support Resources

### Angular
- [Angular Documentation](https://angular.io/docs)
- [Angular Material](https://material.angular.io/)

### NgRx
- [NgRx Documentation](https://ngrx.io/)
- [Redux DevTools](https://chrome.google.com/webstore/detail/redux-devtools/)

### Stripe
- [Stripe Documentation](https://stripe.com/docs)
- [Stripe Testing Cards](https://stripe.com/docs/testing)

### Google OAuth
- [Google Sign-In Guide](https://developers.google.com/identity/gsi/web)

## Final Checks

- [ ] All dependencies installed
- [ ] Environment configured
- [ ] Backend accessible
- [ ] External services configured
- [ ] Application runs successfully
- [ ] All features working
- [ ] UI responsive
- [ ] No console errors
- [ ] Ready for development/customization

---

## Quick Commands Reference

```powershell
# Install dependencies
npm install

# Start development server
npm start

# Build for production
ng build --configuration production

# Run tests
npm test

# Generate new component
ng generate component features/module-name/components/component-name

# Generate new service
ng generate service core/services/service-name

# Update Angular
ng update @angular/cli @angular/core

# Check for outdated packages
npm outdated
```

---

## Status: ✅ COMPLETE

Your Delightful Dessert frontend is **fully implemented** and ready to use!

All modules, components, services, and state management are in place. Simply complete the configuration steps above and you're good to go!

**Good luck with your project! 🚀🍰**
