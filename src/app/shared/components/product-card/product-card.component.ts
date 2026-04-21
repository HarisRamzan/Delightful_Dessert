import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Product } from '../../../core/models';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent {
  @Input() product!: Product;
  @Input() showActions = true;
  @Output() addToCart = new EventEmitter<Product>();
  @Output() viewDetails = new EventEmitter<Product>();

  onAddToCart(): void {
    this.addToCart.emit(this.product);
  }

  onViewDetails(): void {
    this.viewDetails.emit(this.product);
  }
}
