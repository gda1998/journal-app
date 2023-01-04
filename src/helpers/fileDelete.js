import cloudinary from 'cloudinary/lib/cloudinary';
import { swalAlert } from './swalToast';

cloudinary.config({
    cloud_name: process.env.REACT_APP_CLOUDINARY_NAME,
    api_key: process.env.REACT_APP_CLOUDINARY_API_KEY,
    api_secret: process.env.REACT_APP_CLOUDINARY_API_SECRET,
});

/**
 * @param  {String} url
 * @returns  {Promise<String>}
 */
const fileDelete = async(url) => {
    const segments = url.split('/');
    const fileName = segments[segments.length - 1];
    // Get the filename extension and delete it, just keep the filename
    const imageName = fileName.replace(/[^.]+$/.exec(fileName), '').split('.')[0];

    const { result } = await cloudinary.uploader.destroy(imageName);
    return result === 'ok' ? '' : `Error trying delete the image: ${result}`;
}

export default fileDelete;