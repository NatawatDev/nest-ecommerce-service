import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { ProductsModule } from './products/products.module';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import * as multer from 'multer'

@Module({
  imports: [
    MulterModule.registerAsync({
      useFactory: () => ({
        storage: multer.memoryStorage(),
        limits: {
          fileSize: 50 * 1024 * 1024,
        },
      }),
    }),
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(process.env.MONGO_URI),
    ProductsModule,
    CloudinaryModule
  ]
})
export class AppModule {}
