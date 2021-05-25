import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { configService } from './config/config.service';
import { ProductsModule } from './features/products/products.module';
import { VariationsController } from './features/variations/variations.controller';
import { VariationsService } from './features/variations/variations.service';
import { VariationsModule } from './features/variations/variations.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
    ProductsModule,
    VariationsModule
  ],
  controllers: [ AppController],
  providers: [ AppService],
})
export class AppModule {}
