import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Variation } from 'src/db/entities/variation.entity';
import { VariationsController } from './variations.controller';
import { VariationsService } from './variations.service';

import { ProductsModule } from '../products/products.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([Variation]),
        ProductsModule
    ],
    controllers: [VariationsController],
    providers: [VariationsService]
})
export class VariationsModule {}
