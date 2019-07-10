import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Product } from './product.module';

@Injectable()
export class ProductsService {
  private products: Product[] = [];

  constructor(
    @InjectModel('Product') private readonly productModel: Model<Product>,
  ) {}

  async insertProduct(title: string, desc: string, price: number) {
    const newProduct = new this.productModel({
      title,
      description: desc,
      price,
    });
    const result = await newProduct.save();
    return result.id as string;
  }

  async getProducts() {
    // to make a copy of an array
    // to make a copy of every object in an array add .map and transform every producy in a copy of itself
    const products = await this.productModel.find().exec();
    return products.map(({ id, title, description, price }) => ({
      id,
      title,
      description,
      price,
    }));
  }

  async getSingleProduct(prodId: string) {
    const product = await this.findProduct(prodId);
    return {
      id: product.id,
      title: product.title,
      description: product.description,
      price: product.price,
    };
  }

  async patchProduct(
    prodId: string,
    prodTitle: string,
    prodDesc: string,
    prodPrice: number,
  ): Promise<Product> {
    const product = await this.findProduct(prodId);

    if (prodTitle) product.title = prodTitle;
    if (prodDesc) product.description = prodDesc;
    if (prodPrice) product.price = prodPrice;

    return await product.save();
  }

  async deleteProduct(prodId: string) {
    try {
      const result = await this.productModel.deleteOne({ _id: prodId }).exec();
      if (result.n === 0)
        throw new NotFoundException('Could not find product.');
    } catch (error) {
      throw new NotFoundException('Could not find product.');
    }
  }

  private async findProduct(prodId: string): Promise<Product> {
    let product;
    try {
      product = await this.productModel.findById(prodId).exec();
    } catch (error) {
      throw new NotFoundException('Could not find product.');
    }
    if (!product) throw new NotFoundException('Could not find product.');
    return product;
  }
}
