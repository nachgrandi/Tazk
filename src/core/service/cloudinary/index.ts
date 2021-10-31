import cloudinary from '../cloudinary/cloudinary.service';
import mockCloudinary from '../cloudinary/mock.cloudinary.service';

const environment: string = process.env.NODE_ENV || 'dev';

export const cloudinaryService = environment == 'dev' ? mockCloudinary : cloudinary;