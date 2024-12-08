import { Controller, Get, Post, Body, Param, Put, Patch, Delete, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { BannersService } from './banners.service';
import { CreateBannerDto } from './dto/create-banner.dto';
import { UpdateBannerDto, UpdateDisplayOrderDto } from './dto/update-banner.dto';

import { fileUploadOptions } from '../config/file'

@Controller('banners')
export class BannersController {
  constructor(private readonly bannersService: BannersService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file', fileUploadOptions))
  create(@Body() createBannerDto: CreateBannerDto, @UploadedFile() file: Express.Multer.File) {
    return this.bannersService.create(createBannerDto, file)
  }

  @Get()
  findAll() {
    return this.bannersService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bannersService.findOne(id)
  }

  @Put(':id')
  @UseInterceptors(FileInterceptor('file', fileUploadOptions))
  update(@Param('id') id: string, @Body() updateBannerDto: UpdateBannerDto, file: Express.Multer.File) {
    return this.bannersService.update(id, updateBannerDto, file)
  }
  
  @Patch('displayOrder/:id')
  updateDisplayOrder(@Param('id') id: string, @Body() updateDisplayOrderDto: UpdateDisplayOrderDto ) {
    return this.bannersService.updateDisplayOrder(id ,updateDisplayOrderDto)
  }

  @Delete(':id') 
  remove(@Param('id') id: string) {
    return this.bannersService.remove(id)
  }
}
