import { Injectable } from '@angular/core';

import { Product } from '../model/Product';

@Injectable()
export class ProductService {
    products: Product[] = [
        { name: 'Чай', price: 13, total: 20 },
        { name: 'Кофе', price: 18, total: 20 },
        { name: 'Кофе с молоком', price: 21, total: 20 },
        { name: 'Сок', price: 15, total: 20 }
    ];

    constructor(){}

    getProducts(): Product[] {
        return this.products;
    }

    removeProduct(product: Product): Promise<Product> {
        let index = this.products.indexOf(product);
        if (this.products[index].total > 0) {
            this.products[index].total--;
            return Promise.resolve<Product>(product);
        } else {
            return Promise.reject(`No such product: ${ product.name }`);
        }
    }
}