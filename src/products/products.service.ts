import { Injectable, NotFoundException } from '@nestjs/common';

import { Product } from './product.module';

@Injectable()
export class ProductsService {
  private products: Product[] = [];

  insertProduct(title: string, desc: string, price: number): string {
    const productId = Math.random().toString();
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
    const product = this.findProduct(prodId)[0];
    return { ...product };
  }

  patchProduct(
    prodId: string,
    prodTitle: string,
    prodDesc: string,
    prodPrice: number,
  ): Product {
    const [product, index] = this.findProduct(prodId);
    const updatedProduct = { ...product };
    if (prodTitle) updatedProduct.title = prodTitle;
    if (prodDesc) updatedProduct.description = prodDesc;
    if (prodPrice) updatedProduct.price = prodPrice;

    this.products[index] = updatedProduct;
    return this.products[index];
  }

  deleteProduct(prodId: string): void {
    const [_, index] = this.findProduct(prodId);
    this.products.splice(index, 1);
  }

  private findProduct(prodId: string): [Product, number] {
    const productIndex = this.products.findIndex(p => p.id === prodId);
    const product = this.products[productIndex];
    if (!product) throw new NotFoundException('Could not find product.');
    return [product, productIndex];
  }
}
