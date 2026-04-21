import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { 
  Product, 
  Category, 
  Subcategory, 
  Order, 
  User,
  ApiResponse,
  PaginatedResponse 
} from '../models';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  // Product endpoints
  getProducts(params?: any): Observable<PaginatedResponse<Product>> {
    let httpParams = new HttpParams();
    if (params) {
      Object.keys(params).forEach(key => {
        if (params[key] !== null && params[key] !== undefined) {
          httpParams = httpParams.set(key, params[key].toString());
        }
      });
    }
    return this.http.get<PaginatedResponse<Product>>(`${this.apiUrl}/products`, { params: httpParams });
  }

  getProduct(id: string): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/products/${id}`);
  }

  createProduct(product: Partial<Product>): Observable<Product> {
    return this.http.post<Product>(`${this.apiUrl}/products`, product);
  }

  updateProduct(id: string, product: Partial<Product>): Observable<Product> {
    return this.http.put<Product>(`${this.apiUrl}/products/${id}`, product);
  }

  deleteProduct(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/products/${id}`);
  }

  // Category endpoints
  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.apiUrl}/categories`);
  }

  getCategory(id: string): Observable<Category> {
    return this.http.get<Category>(`${this.apiUrl}/categories/${id}`);
  }

  createCategory(category: Partial<Category>): Observable<Category> {
    return this.http.post<Category>(`${this.apiUrl}/categories`, category);
  }

  updateCategory(id: string, category: Partial<Category>): Observable<Category> {
    return this.http.put<Category>(`${this.apiUrl}/categories/${id}`, category);
  }

  deleteCategory(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/categories/${id}`);
  }

  // Subcategory endpoints
  getSubcategories(categoryId?: string): Observable<Subcategory[]> {
    const url = categoryId 
      ? `${this.apiUrl}/subcategories?categoryId=${categoryId}`
      : `${this.apiUrl}/subcategories`;
    return this.http.get<Subcategory[]>(url);
  }

  createSubcategory(subcategory: Partial<Subcategory>): Observable<Subcategory> {
    return this.http.post<Subcategory>(`${this.apiUrl}/subcategories`, subcategory);
  }

  updateSubcategory(id: string, subcategory: Partial<Subcategory>): Observable<Subcategory> {
    return this.http.put<Subcategory>(`${this.apiUrl}/subcategories/${id}`, subcategory);
  }

  deleteSubcategory(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/subcategories/${id}`);
  }

  // Cart endpoints
  getCart(): Observable<any> {
    return this.http.get(`${this.apiUrl}/cart`);
  }

  addToCart(productId: string, quantity: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/cart/items`, { productId, quantity });
  }

  updateCartItem(itemId: string, quantity: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/cart/items/${itemId}`, { quantity });
  }

  removeFromCart(itemId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/cart/items/${itemId}`);
  }

  clearCart(): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/cart`);
  }

  // Order endpoints
  getOrders(params?: any): Observable<PaginatedResponse<Order>> {
    let httpParams = new HttpParams();
    if (params) {
      Object.keys(params).forEach(key => {
        if (params[key] !== null && params[key] !== undefined) {
          httpParams = httpParams.set(key, params[key].toString());
        }
      });
    }
    return this.http.get<PaginatedResponse<Order>>(`${this.apiUrl}/orders`, { params: httpParams });
  }

  getOrder(id: string): Observable<Order> {
    return this.http.get<Order>(`${this.apiUrl}/orders/${id}`);
  }

  getOrderByTrackingId(trackingId: string): Observable<Order> {
    return this.http.get<Order>(`${this.apiUrl}/orders/track/${trackingId}`);
  }

  createOrder(orderData: any): Observable<Order> {
    return this.http.post<Order>(`${this.apiUrl}/orders`, orderData);
  }

  updateOrderStatus(id: string, status: string): Observable<Order> {
    return this.http.patch<Order>(`${this.apiUrl}/orders/${id}/status`, { status });
  }

  // User endpoints (Admin only)
  getUsers(params?: any): Observable<PaginatedResponse<User>> {
    let httpParams = new HttpParams();
    if (params) {
      Object.keys(params).forEach(key => {
        if (params[key] !== null && params[key] !== undefined) {
          httpParams = httpParams.set(key, params[key].toString());
        }
      });
    }
    return this.http.get<PaginatedResponse<User>>(`${this.apiUrl}/users`, { params: httpParams });
  }

  getUser(id: string): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/users/${id}`);
  }

  updateUser(id: string, userData: Partial<User>): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/users/${id}`, userData);
  }

  deleteUser(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/users/${id}`);
  }

  // Dashboard statistics
  getDashboardStats(): Observable<any> {
    return this.http.get(`${this.apiUrl}/dashboard/stats`);
  }
}
