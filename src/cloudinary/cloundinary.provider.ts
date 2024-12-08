import { v2 } from 'cloudinary'
import { cloudinaryProvider } from '../constant'

export const CloudinaryProvider = {
  provide: cloudinaryProvider,
  useFactory: () => {
    return v2.config({
      cloud_name: process.env.CLOUDINARY_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_SECRET_KEY
    })
  }
}
