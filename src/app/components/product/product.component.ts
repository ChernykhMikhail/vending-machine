import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Product } from '../../model/Product';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  @Input() product: Product;
  @Output() buyEvent: EventEmitter<Product> = new EventEmitter<Product>();

  constructor() { }

  ngOnInit() {
  }

  onBuy(){
    this.buyEvent.emit(this.product);
  }
}
