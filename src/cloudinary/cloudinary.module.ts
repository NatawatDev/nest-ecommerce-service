import { Module } from '@nestjs/common';
import { CloudinaryProvider } from './cloundinary.provider'
import { CloudinaryService } from './cloudinary.service';

@Module({
  providers: [CloudinaryProvider, CloudinaryService],
  exports: [CloudinaryService]
})
export class CloudinaryModule {}
