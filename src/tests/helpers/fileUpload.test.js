import 'setimmediate';
import cloudinary from 'cloudinary';
import fileUpload from '../../helpers/fileUpload';
import fileDelete from '../../helpers/fileDelete';

cloudinary.config({
    cloud_name: process.env.REACT_APP_CLOUDINARY_NAME,
    api_key: process.env.REACT_APP_CLOUDINARY_API_KEY,
    api_secret: process.env.REACT_APP_CLOUDINARY_API_SECRET,
});

describe('Pruebas en el helper fileUpload', () => {

    test('Debe de cargar un archivo y retornar la URL', async () => {
        // Obtenemos la url de la img
        const resp = await fetch('https://pbs.twimg.com/profile_images/1321662922762825728/geIj9G3O_400x400.jpg');

        // Convertimos a blob la img
        const blob = await resp.blob();

        // Creamos un nuevo archivo con ese blob
        const file = new File([blob], 'foto.jpg');

        // Obtenemos la url donde se guardo la imagen
        const url = await fileUpload(file);
        expect(typeof url).toBe('string');
        fileDelete(url);
    });

    test('Debe de retornar un error', async () => {
        const file = new File([], 'foto.jgp');
        const url = await fileUpload(file);
        expect(url).toBe(null);
    });
});