require('dotenv').config();

const port = process.env.PORT || 4000;
const mongoUrl = process.env.MONGO_URL;
const jwtSecret = process.env.JWT_SECRET;


module.exports = {port, mongoUrl, jwtSecret};