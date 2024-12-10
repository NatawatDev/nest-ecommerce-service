import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { Model } from 'mongoose'
import { InjectModel } from '@nestjs/mongoose'
import { CreateBannerDto } from './dto/create-banner.dto';
import { UpdateBannerDto, UpdateDisplayOrderDto } from './dto/update-banner.dto';
import { Banner, BannerDocument } from './schemas/banner.schema'
import { CloudinaryService } from '../cloudinary/cloudinary.service'
import { fileBannerFolder } from '../constant'

@Injectable()
export class BannersService {
  constructor(@InjectModel(Banner.name) private bannerModel: Model<BannerDocument>,
  private cloudinaryService: CloudinaryService) {}

  async create(createBannerDto: CreateBannerDto, file: Express.Multer.File) {
    try {
      const bannerCount = await this.bannerModel.countDocuments()

      if (bannerCount >= 3) {
        throw new BadRequestException('Cannot create more than 3 banners')
      }
  
      let imageUrl = ''
      if (file) {
        imageUrl = await this.cloudinaryService.uploadImage(file, fileBannerFolder)
      }
  
      const banner = new this.bannerModel({
        ...createBannerDto,
        displayOrder: bannerCount + 1,  
        imageUrl
      });
  
      return await banner.save()
    } catch (error) {
      throw error
    }
  }
  

  async findAll(): Promise<Banner[]> {
    try {      
      const bannerList = await this.bannerModel.find().exec()
      return bannerList || []
    } catch (error) {
      throw error
    }
  }

  async findOne(id: string): Promise<Banner> {
    try {
      const banner = await this.bannerModel.findById(id).exec()
      if (!banner) {
        throw new NotFoundException('Not found banner.')
      }
      return banner
    } catch (error) {
      throw error
    }    
  }

  async updateDisplayOrder(id: string, updateDisplayOrderDto: UpdateDisplayOrderDto) {
    try {
      const updatedDisplayOrder = await this.bannerModel.findByIdAndUpdate(id, { ...updateDisplayOrderDto, updatedAt: new Date() }, { new: true }).exec()
      if (!updatedDisplayOrder) {
        throw new NotFoundException('Banner not found')
      }
    } catch (error) {
      throw error
    }
  }

  async update(id: string, updateBannerDto: UpdateBannerDto, file: Express.Multer.File): Promise<Banner> {
    try {
      let imageUrl: string = ''
  
      const banner = await this.bannerModel.findById(id).exec()
      if (!banner) {
        throw new NotFoundException('Not found banner.')
      }
      if (!file) {
        imageUrl = banner.imageUrl
      } else {
        imageUrl = await this.cloudinaryService.uploadImage(file, fileBannerFolder)
      }

      banner.name = updateBannerDto.name || banner.name
      banner.description = updateBannerDto.description || banner.description
      banner.imageUrl = imageUrl
      banner.updatedAt = new Date()

      const updatedBanner = await banner.save()
  
      return updatedBanner
    } catch (error) {
      throw error
    }
  }

  async remove(id: string) {
    try {
      const bannerToDelete = await this.bannerModel.findById(id).exec()
      if (!bannerToDelete) {
        throw new NotFoundException('Banner not found.')
      }
    
      const displayOrderToDelete = bannerToDelete.displayOrder
    
      const result = await this.bannerModel.findByIdAndDelete(id).exec();
      if (!result) {
        throw new NotFoundException('id not found.')
      }
    
      await this.bannerModel.updateMany(
        { displayOrder: { $gt: displayOrderToDelete } },
        { $inc: { displayOrder: -1 } }
      ).exec()
    
      return { message: 'Delete successful' }
    } catch (error) {
      throw error
    }
  }
}
