import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose'
import { MulterModule } from '@nestjs/platform-express';
import * as cors from 'cors';

import { AppController } from './app.controller'
import { AppService } from './app.service'

import { ProductsModule } from './products/products.module'
import { ImagesModule } from './images/images.module'
import { CategoriesModule } from './categories/categories.module'

import { _DB_URI } from './config'

@Module({
  imports: [
    MongooseModule.forRoot(_DB_URI,  {
      useNewUrlParser: true,
      connectionFactory: connection => {
        connection.plugin(require('mongoose-autopopulate'));
        return connection;
      }
    }),
    MulterModule.register({
      dest: './uploads',
    }),
    ProductsModule,
    ImagesModule,
    CategoriesModule
  ],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
      consumer
          .apply(cors())
          .forRoutes({
              path: '*',
              method: RequestMethod.ALL
          })
  }
}

