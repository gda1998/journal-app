import 'setimmediate';
import cloudinary from 'cloudinary';
import fileUpload from '../../helpers/fileUpload';
import fileDelete from '../../helpers/fileDelete';
import createFile from '../../helpers/createFile';

cloudinary.config({
    cloud_name: process.env.REACT_APP_CLOUDINARY_NAME,
    api_key: process.env.REACT_APP_CLOUDINARY_API_KEY,
    api_secret: process.env.REACT_APP_CLOUDINARY_API_SECRET,
});

describe('Pruebas en el helper fileUpload', () => {

    test('Debe de cargar un archivo y retornar la URL', async () => {
        // Creamos un nuevo archivo con ese blob
        const file = await createFile();

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