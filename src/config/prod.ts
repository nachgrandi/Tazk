export default {
  clientId: process.env.CLIENT_ID,
  mobileClientId: process.env.MOBILE_CLIENT_ID,
  DB: {
    URI: `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_SERVER}/tazk`
  }
};