import { v2 } from 'cloudinary';

const cloudinary = v2;

cloudinary.config({
    cloud_name: 'tazk-app',
    api_key: '746573947883533',
    api_secret: 'zwyiUuMtF-ygzJGuYe4_kFfP284'
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