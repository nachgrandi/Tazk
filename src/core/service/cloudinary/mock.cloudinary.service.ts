export default {
  /**
   * @param imagePath - Image's Local Path
   * @returns {Object} Cloudinary Response 
   */
  upload: async function (imagePath: string) {
      return {
        public_id: 'mock id',
        secure_url: 'mock url'
      };
  },
  delete: async function (publicId: string) {
      try {
          return null;
      }
      catch (e) {
          throw new Error();
      }
  }
};