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
  addProduct(
    @Body('title') prodTitle: string,
    @Body('description') prodDesc: string,
    @Body('price') prodPrice: number,
  ): { id: string } {
    const result = this.productsService.insertProduct(
      prodTitle,
      prodDesc,
      prodPrice,
    );
    return { id: result };
  }

  @Get()
  getAllProducts(): Product[] {
    return this.productsService.getProducts();
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
