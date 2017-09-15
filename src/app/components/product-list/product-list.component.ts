import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { Product } from '../../model/Product';
import { ProductService } from '../../service/ProductService';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products: Product[];
  @Output() selectedProduct: EventEmitter<Product> = new EventEmitter<Product>();

  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.products = this.productService.getProducts();
  }

  onBuyEvent(product: Product): void {
    this.selectedProduct.emit(product)
    // this.productService.removeProduct(product)
    //         .then( (prod) => this.selectedProduct.emit(prod) )
    //         .catch( (reason) => console.error(reason) );
  }
}
