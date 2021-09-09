export default {
  jwtSecret: process.env.JWT_SECRET,
  DB: {
    URI: `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_SERVER}/tazk`
  }
};