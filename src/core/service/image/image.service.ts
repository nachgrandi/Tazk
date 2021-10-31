import ImageDto from '../../dto/image.dto';
import { cloudinaryService } from '../cloudinary/index';
import fs from 'fs';

const uploadImage =  async ( 
  path: string
) => {
  const imagePath = path;
        
  const result = await cloudinaryService.upload(imagePath);

  await fs.unlink(imagePath, (err) => {
    if (err) throw err;
  });

  const image: ImageDto = {
    publicId: result.public_id,
    url: result.secure_url
  };
  
  return image;
};

const deleteImage =  async ( 
  publicId: string
) => {     
  return await cloudinaryService.delete(publicId);
};

export const ImageService = {
  uploadImage,
  deleteImage
};
