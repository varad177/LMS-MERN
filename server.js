import app from './app.js'

import { config } from 'dotenv'
import connectionToDB from './config/dbConnection.js';
import cloudinary from 'cloudinary'
import Razorpay from 'razorpay'

config();

cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRETE
});

export const razorpay = new Razorpay({
    key_id : process.env.ROZORPAY_KEY_ID,
    key_secret:process.env.ROZORPAY_SECRETE
})

const PORT = process.env.PORT || 5001
app.listen(PORT, async () => {
    await connectionToDB();
    console.log(`app is running at http:localhoat:${PORT}`);
})