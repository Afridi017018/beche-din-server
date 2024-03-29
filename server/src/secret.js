require('dotenv').config();

const port = process.env.PORT || 4000;
const mongoUrl = process.env.MONGO_URL;
const jwtSecret = process.env.JWT_SECRET;
const cloudName = process.env.CLOUD_NAME;
const apiKey = process.env.API_KEY;
const apiSecret = process.env.API_SECRET;


module.exports = {port, mongoUrl, jwtSecret, cloudName, apiKey, apiSecret};