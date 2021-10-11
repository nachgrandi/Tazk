export default {
  clientId: process.env.CLIENT_ID,
  mobileClientId: process.env.MOBILE_CLIENT_ID,
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
  DB: {
    URI: `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_SERVER}/tazk`
  }
};