import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
} from '@nestjs/common';

import { ProductsService } from './products.service';
import { Product } from './product.module';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  async addProduct(
    @Body('title') prodTitle: string,
    @Body('description') prodDesc: string,
    @Body('price') prodPrice: number,
  ): Promise<{ id: string }> {
    const result = await this.productsService.insertProduct(
      prodTitle,
      prodDesc,
      prodPrice,
    );
    return { id: result };
  }

  @Get()
  async getAllProducts(): Promise<Product[]> {
    const products = await this.productsService.getProducts();
    return products.map(p => ({
      id: p.id,
      title: p.title,
      description: p.description,
      price: p.price,
    }));
  }

  @Get(':id')
  getProduct(@Param('id') prodId: string): Product {
    return this.productsService.getSingleProduct(prodId);
  }

  @Patch(':id')
  patchProduct(
    @Param('id') prodId: string,
    @Body('title') prodTitle: string,
    @Body('description') prodDesc: string,
    @Body('price') prodPrice: number,
  ): Product {
    return this.productsService.patchProduct(
      prodId,
      prodTitle,
      prodDesc,
      prodPrice,
    );
  }

  @Delete(':id')
  deleteProduct(@Param('id') prodId: string): void {
    this.productsService.deleteProduct(prodId);
  }
}
