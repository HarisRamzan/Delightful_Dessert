// Core Models
export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  phoneNumber?: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phoneNumber?: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface GoogleAuthResponse {
  success: boolean;
  message: string;
  data: {
    token: string;
    refreshToken: string;
  };
}

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  discountPrice?: number;
  imageUrl?: string;
  images?: string[];
  sku?: string;
  categoryId: number;
  categoryName?: string;
  subCategoryId?: number;
  subCategoryName?: string;
  stock: number;
  isActive: boolean;
  viewCount?: number;
  createdAt: string;
}

export interface Category {
  id: number;
  name: string;
  description?: string;
  imageUrl?: string;
  subcategories?: Subcategory[];
}

export interface Subcategory {
  id: number;
  name: string;
  categoryId: number;
  description?: string;
}

export interface CartItem {
  id: number;
  productId: number;
  productName: string;
  productImage: string;
  price: number;
  discountPrice?: number;
  quantity: number;
  subtotal: number;
  availableStock: number;
}

export interface Cart {
  id: number;
  userId: number;
  items: CartItem[];
  totalAmount: number;
}

export interface CartResponse {
  success: boolean;
  data: Cart;
}

export interface Order {
  id: string;
  userId: string;
  orderNumber: string;
  trackingId: string;
  status: OrderStatus;
  items: OrderItem[];
  totalAmount: number;
  shippingAddress: Address;
  paymentMethod: string;
  paymentStatus: string;
  createdAt: string;
  updatedAt: string;
}

export interface OrderItem {
  id: number;
  productId: number;
  productName: string;
  quantity: number;
  price: number;
}

export interface Address {
  fullName: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  phoneNumber: string;
}

export enum OrderStatus {
  Pending = 'Pending',
  Processing = 'Processing',
  Shipped = 'Shipped',
  Delivered = 'Delivered',
  Cancelled = 'Cancelled'
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  errors?: string[];
}

export interface PaginatedResponse<T> {
  success: boolean;
  data: T[];
  pageNumber: number;
  totalPages: number;
  totalCount: number;
  hasPreviousPage?: boolean;
  hasNextPage?: boolean;
}
