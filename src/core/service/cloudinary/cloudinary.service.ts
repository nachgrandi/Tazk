import { v2 } from 'cloudinary';
import config from '../../../config/config';

const cloudinary = v2;

cloudinary.config({
    cloud_name: config.cloudName,
    api_key: config.apiKey,
    api_secret: config.apiSecret
});


export default {
    /**
     * @param imagePath - Image's Local Path
     * @returns {Object} Cloudinary Response 
     */
    upload: async function (imagePath: string) {
        return await cloudinary.uploader.upload(imagePath, {
            folder: 'task-image/'
        });
    },
    delete: async function (publicId: string) {
        try {
            return await cloudinary.uploader.destroy(publicId);
        }
        catch (e) {
            throw new Error();
        }
    }
};