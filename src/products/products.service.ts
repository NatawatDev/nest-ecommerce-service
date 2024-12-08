import { Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose'
import { InjectModel } from '@nestjs/mongoose'
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product, ProductDocument } from './schemas/product.schema'

import { CloudinaryService } from '../cloudinary/cloudinary.service'
import { fileProductFolder } from '../constant'

@Injectable()
export class ProductsService {
  constructor(@InjectModel(Product.name) private productModel: Model<ProductDocument>,
  private cloudinaryService: CloudinaryService) {}  
  
  async create(createProductDto: CreateProductDto, file: Express.Multer.File): Promise<Product> {
    try {
      let imageUrl = ''
      if (file) {
        imageUrl = await this.cloudinaryService.uploadImage(file, fileProductFolder)  
      }

      const result = new this.productModel({...createProductDto, imageUrl});
      return await result.save();
    } catch (error) {
      throw error
    }
  }

  async findAll(limit: number = 10, offset: number = 0): Promise<Product[]> {
    try {      
      const productList = await this.productModel.find().limit(limit).skip(offset).exec()
      return productList || []
    } catch (error) {
      throw error
    }
  }

  async findOne(id: string): Promise<Product> {
    try {
      const result = await this.productModel.findById(id).exec()
      if (!result) {
        throw new NotFoundException('Not found product.')
      }
      return result
    } catch (error) {
      throw error
    }    
  }

  async searchByName(name: string): Promise<Product[]> {
    try {
      const productList = await this.productModel
      .find({ name: { $regex: name, $options: 'i' } })
      .exec()
      return productList || []
    } catch (error) {
      throw error
    }
  }

  async update(id: string, updateProductDto: UpdateProductDto): Promise<Product> {
    try {
      const updatedProduct = await this.productModel.findByIdAndUpdate(id, { ...updateProductDto, updatedAt: new Date } , { new: true }).exec()
      if (!updatedProduct) {
        throw new NotFoundException('Product not found for update.')
      }
      return updatedProduct
    } catch (error) {
      throw error
    }    
  }

  async remove(id: string) {
    try {
      const deletedProduct = await this.productModel.findByIdAndDelete(id).exec()
      if (!deletedProduct) {
        throw new NotFoundException('Product not found for delete.')
      }
      return { message: 'Delete successful' }
    } catch (error) {
      throw error
    }
  }
}
