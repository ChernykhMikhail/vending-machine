import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import { Product } from '../model/Product';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class ProductService {

    constructor(private http: Http) {}
    private headers: Headers = new Headers({'Content-Type':'application/json'});
    getProducts(): Promise<Product[]> {
        const url = 'http://localhost:8080/api/product';
        return this.http.get(url, {headers: this.headers})
            .toPromise()
            .then(response => response.json() as Product[]) // NO .data !!!
            .catch( error => Promise.reject(error) );
    }

    removeProduct(product: Product): Promise<void> {
        const url = `http://localhost:8080/api/product/${ product.id }`;
        return this.http.delete(url, {headers: this.headers}).toPromise()
            .then( () => { product.quantity--; Promise.resolve(null) })
            .catch ( error => Promise.reject(`No such product: ${ product.name }`));
    }
}
