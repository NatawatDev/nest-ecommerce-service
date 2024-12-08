import { Injectable } from '@nestjs/common'
import * as cloudinary from 'cloudinary'

@Injectable()
export class CloudinaryService {
  async uploadImage(file: Express.Multer.File, folder: string): Promise<string> {
    return new Promise((resolve, reject) => {
      cloudinary.v2.uploader.upload(file.path, { folder: folder }, (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result.secure_url)
        }
      });
    });
  }
}