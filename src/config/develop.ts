export default {
  keyFirebase: {
    projectId: process.env.FB_PROJECT_ID || '',
    privateKeyId: process.env.FB_PRIVATE_KEY_ID || '',
    privateKey: process.env.FB_PRIVATE_KEY || '',
    clientEmail: process.env.FB_CLIENT_EMAIL || '',
    clientId: process.env.FB_CLIENT_ID || ''
  },
  DB: {
    URI: 'mongodb://localhost:27017/tazk'
  }
};