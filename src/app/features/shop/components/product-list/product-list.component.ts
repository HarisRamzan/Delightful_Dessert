import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../../core/services/api.service';
import { Product, Category } from '../../../../core/models';
import { Store } from '@ngrx/store';
import * as CartActions from '../../../../store/cart/cart.actions';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  categories: Category[] = [];
  loading = false;
  
  // Filters
  selectedCategory: string = '';
  selectedSubcategory: string = '';
  searchQuery: string = '';
  minPrice: number = 0;
  maxPrice: number = 1000;
  
  // Pagination
  pageNumber = 1;
  pageSize = 12;
  totalPages = 1;
  totalCount = 0;

  constructor(
    private apiService: ApiService,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.loadCategories();
    this.loadProducts();
  }

  loadCategories(): void {
    this.apiService.getCategories().subscribe({
      next: (categories) => {
        this.categories = Array.isArray(categories) ? categories : [];
      },
      error: (error) => {
        console.error('Error loading categories:', error);
        this.categories = [];
      }
    });
  }

  loadProducts(): void {
    this.loading = true;
    const params = {
      pageNumber: this.pageNumber,
      pageSize: this.pageSize,
      categoryId: this.selectedCategory || undefined,
      subcategoryId: this.selectedSubcategory || undefined,
      searchTerm: this.searchQuery || undefined,
      minPrice: this.minPrice,
      maxPrice: this.maxPrice
    };

    this.apiService.getProducts(params).subscribe({
      next: (response) => {
        this.products = Array.isArray(response.items) ? response.items : [];
        this.totalPages = response.totalPages || 1;
        this.totalCount = response.totalCount || 0;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading products:', error);
        this.products = [];
        this.loading = false;
      }
    });
  }

  onAddToCart(product: Product): void {
    this.store.dispatch(CartActions.addToCart({ productId: product.id, quantity: 1 }));
  }

  onCategoryChange(): void {
    this.selectedSubcategory = '';
    this.pageNumber = 1;
    this.loadProducts();
  }

  onSubcategoryChange(): void {
    this.pageNumber = 1;
    this.loadProducts();
  }

  onSearch(): void {
    this.pageNumber = 1;
    this.loadProducts();
  }

  onPageChange(page: number): void {
    this.pageNumber = page;
    this.loadProducts();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  clearFilters(): void {
    this.selectedCategory = '';
    this.selectedSubcategory = '';
    this.searchQuery = '';
    this.minPrice = 0;
    this.maxPrice = 1000;
    this.pageNumber = 1;
    this.loadProducts();
  }

  get selectedCategoryData(): Category | undefined {
    return this.categories.find(c => c.id === this.selectedCategory);
  }
}
