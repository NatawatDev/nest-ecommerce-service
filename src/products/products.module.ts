import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose'
import { ProductsService } from './products.service';
import { CloudinaryModule } from '../cloudinary/cloudinary.module'
import { ProductsController } from './products.controller';
import { Product, ProductSchema } from './schemas/product.schema'

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Product.name , schema: ProductSchema }
    ]),
    CloudinaryModule
  ], 
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
