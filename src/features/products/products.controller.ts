import { Controller, Post, Body, Get, Param, Patch, Delete } from '@nestjs/common';

import { ProductsService } from './products.service';
import { Product } from 'src/db/entities/products.entity';

@Controller('products')
export class ProductsController {

    constructor(private readonly productsService: ProductsService) {}

    @Post()
    addProduct(
        @Body('title') title: string,
        @Body('description') description: string,
        @Body('price') price: number,
    ): Promise<Product> {
        return this.productsService.createProduct(
                    title,
                    description,
                    price
                );
    }

    @Get()
    getAllProducts(): Promise<Product[]> {
        return this.productsService.getProducts();
    }

    @Get(':id')
    getProductById(@Param('id') prodId: string): Promise<Product> {
        return this.productsService.getProductById(prodId);
    }

    @Patch(':id')
    updateProduct(
        @Param('id') prodId: string, 
        @Body('title') title:string, 
        @Body('description') description: string, 
        @Body('price') price: number
    ): Promise<Product> {
        return this.productsService.updateProduct(
            prodId, title, description, price
        );
    }

    @Delete(':id')
    deleteProduct(@Param('id') prodId: string): Promise<Product> {
        return this.productsService.deleteProduct(prodId);
    }
}
