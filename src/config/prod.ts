export default {
  jwtSecret: process.env.JWT_SECRET,
  DB: {
    URI: process.env.MONGODB_URI || `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_SERVER}/tazk`
  }
};