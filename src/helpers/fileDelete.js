// import cloudinary from 'cloudinary';
import { v2 as cloudinary } from 'cloudinary';
// const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true,
});

const fileDelete = async(url) => {
    const segments = url.split('/');
    const fileName = segments[segments.length - 1];
    // Get the filename extension and delete it, just keep the filename
    const imageName = fileName.replace(/[^.]+$/.exec(fileName), '');
    console.log("🚀 ~ file: fileDelete.js ~ line 15 ~ fileDelete ~ imageName", imageName)
    // Delete the image
    // await cloudinary.v2.api.delecte_resources(`assets/${imageName}`, {}, () => { });
}

export default fileDelete;