import { Module } from '@nestjs/common';

import { AppController } from './app.controller'
import { AppService } from './app.service'

import { ProductsModule } from './products/products.module'
import { ImagesModule } from './images/images.module'
import { CategoriesModule } from './categories/categories.module'
import { ConfigModule } from './config/config.module'

@Module({
  imports: [
    ConfigModule,
    ProductsModule,
    ImagesModule,
    CategoriesModule
  ],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {}

