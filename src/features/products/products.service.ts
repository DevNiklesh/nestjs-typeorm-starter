import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Product } from 'src/db/entities/products.entity';
// import { Product } from './product.model';

@Injectable()
export class ProductsService {
    // private products: Product[] = [];
    
    constructor(@InjectRepository(Product) private productsRepository: Repository<Product>) {}

    async getProducts(): Promise<Product[]> {
        return await this.productsRepository.find({
            relations: ['variations']
        }); // SELECT * from "Products"
    }

    async getProductById(id: string): Promise<Product> {
        console.log(id);
        try {
            const product = await this.productsRepository.findOneOrFail({
                where: {
                    id
                },
                relations: ["variations"]
            }); // SELECT * from "Products" WHERE "Products".id = id;
            return product;
        } catch(err) {
            throw new NotFoundException(`Could not find the product with id: ${id}`);
        }
    }


    async getProductByIdWithoutRelations(id: string): Promise<Product> {
        console.log(id);
        try {
            const product = await this.productsRepository.findOneOrFail({
                where: {
                    id
                }
            }); // SELECT * from "Products" WHERE "Products".id = id;
            return product;
        } catch(err) {
            throw new NotFoundException(`Could not find the product with id: ${id}`);
        }
    }

    async createProduct(title: string, description: string, price: number): Promise<Product> {
        const newProduct = this.productsRepository.create({ title, description, price });
        
        return await this.productsRepository.save(newProduct);
    }

    async updateProduct(prodId: string, title: string, description: string, price: number): Promise<Product> {
        let product = await this.getProductById(prodId);

        product.title = title ? title : product.title;
        product.description = description ? description : product.description;
        product.price = price ? price : product.price;

        return this.productsRepository.save(product); // UPDATE
    }

    async deleteProduct(prodId: string): Promise<Product> {
        const product = await this.getProductById(prodId);

        return await this.productsRepository.remove(product);
    }

    // insertProduct(title: string, description: string, price: number) {
    //     const prodId = Math.random().toString();
    //     const newProduct = new Product(
    //         prodId,
    //         title,
    //         description,
    //         price
    //     );

    //     this.products.push(newProduct);
    //     return prodId;
    // }

    // getProducts() {
    //     return [...this.products];
    // }

    // getProductById(prodId: string) {
    //     const product = this.findProduct(prodId).product;
    //     return {...product};
    // }

    // updateProduct(prodId: string, title: string, description: string, price: number) {
    //     const {product, productIndex} = this.findProduct(prodId);
    //     this.products[productIndex] = {
    //         ...product, 
    //         title: title ? title : product.title,
    //         description: description ? description : product.description,
    //         price: price ? price : product.price,
    //     }

    // }

    // deleteProduct(prodId: string) {
    //     const { productIndex } = this.findProduct(prodId);
    //     this.products.splice(productIndex, 1);
    // }

    // private findProduct(prodId): { productIndex: number, product: Product } {
    //     const productIndex = this.products.findIndex((prod) => prod.id === prodId);
    //     const product = this.products[productIndex];
    //     if(!product) {
    //         throw new NotFoundException(`Could not find the product with id ${prodId}`);
    //     }
    //     return {productIndex , product};
    // }
}
