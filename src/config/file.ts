import { BadRequestException } from '@nestjs/common';
import { diskStorage } from 'multer'

export const fileUploadOptions = {
  storage: diskStorage({
    destination: './uploads',
    filename: (req, file, cb) => {
      cb(null, file.originalname);
    },
  }),
  fileFilter: (req, file, callback) => {
    if (!file.mimetype.match(/\/(jpg|jpeg|png)$/)) {
      return callback(new BadRequestException('Only image files (jpg, jpeg, png) are allowed'), false);
    }
    callback(null, true);
  },
  limits: {
    fileSize: 50 * 1024 * 1024
  },
};
