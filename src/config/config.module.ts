import { Module, Global, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { MongooseModule } from '@nestjs/mongoose'
import { diskStorage } from 'multer'
import * as cors from 'cors';
import { prepareSafeFilename } from 'src/shared/utils/prepare-safe-filename.util';

import { _DB_URI } from './db.config'

@Global()
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
          storage: diskStorage({
              destination: './uploads',
              filename: (_, file, cb) => {
                  const saveFileName = prepareSafeFilename(file.originalname)
                  return cb(null, saveFileName)
              }
          })
      }),
  ],
  exports: [MulterModule]
})

export class ConfigModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer
      .apply(cors())
      .forRoutes({
          path: '*',
          method: RequestMethod.ALL
      })
  }
}
