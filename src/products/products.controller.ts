import { Controller, Get, Post, Body, Patch, Param, Query, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { fileUploadOptions } from '../config/file'

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @UseInterceptors( FileInterceptor('file', fileUploadOptions) )
  create(@Body() createProductDto: CreateProductDto, @UploadedFile() file: Express.Multer.File) {
    return this.productsService.create(createProductDto, file)
  }

  @Get()
  findAll(@Query('limit') limit?: string, @Query('offset') offset?: string) {
    return this.productsService.findAll(+limit, +offset);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(id);
  }

  @Get('search')
  searchByName(@Query('name') name: string) {
    return this.productsService.searchByName(name)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(id, updateProductDto);
  }
}
