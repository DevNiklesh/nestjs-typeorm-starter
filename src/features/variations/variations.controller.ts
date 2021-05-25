import { Body, Controller, Post } from '@nestjs/common';

import { Variation } from 'src/db/entities/variation.entity';
import { VariationsService } from './variations.service';

@Controller('variations')
export class VariationsController {

    constructor(private readonly variationsService: VariationsService) {}

    @Post()
    addVariation(
        @Body('title') title: string,
        @Body('price') price: number,
        @Body('productId') productId: string,
    ): Promise<Variation> {
        console.log(productId);
        return this.variationsService.createVariation(
                    title,
                    price,
                    productId
                );
    }

}
