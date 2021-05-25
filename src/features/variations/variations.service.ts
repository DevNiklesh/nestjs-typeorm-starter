import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Variation } from 'src/db/entities/variation.entity';
import { ProductsService } from '../products/products.service';

@Injectable()
export class VariationsService {

    constructor(
        @InjectRepository(Variation) private variationsRepository: Repository<Variation>,
        private productsSerivce: ProductsService
    ) {}

    async createVariation(title: string, price: number, productId: string): Promise<Variation> {
        console.log(productId);
        const product = await this.productsSerivce.getProductByIdWithoutRelations(productId);
        console.log(product);
        const newVariation = this.variationsRepository.create({ title, price, product });
        
        return await this.variationsRepository.save(newVariation);
    }
}
