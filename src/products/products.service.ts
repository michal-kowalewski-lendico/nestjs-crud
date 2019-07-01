import { Injectable, NotFoundException } from '@nestjs/common';

import { Product } from './product.module';

@Injectable()
export class ProductsService {
  private products: Product[] = [];

  insertProduct(title: string, desc: string, price: number): string {
    const productId = this.products.length.toString();
    const newProduct = new Product(productId, title, desc, price);
    this.products.push(newProduct);
    return productId;
  }

  getProducts(): Product[] {
    // to make a copy of an array
    // to make a copy of every object in an array add .map and transform every producy in a copy of itself
    return [...this.products];
  }

  getSingleProduct(prodId: string): Product {
    const product = this.products.find(p => p.id === prodId);
    if (!product) throw new NotFoundException('Could not find product.');
    return { ...product };
  }
}
