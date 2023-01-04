import createFile from '../../helpers/createFile';
import fileDelete from '../../helpers/fileDelete';
import fileUpload from '../../helpers/fileUpload';


describe('Pruebas en el helper fileDelete', () => {
    test('should Debe de mostrar el error de archivo inexistente', async () => { 
        const result = await fileDelete('https://ruta-imaginaria.jpg');
        expect(result).toBe('Error trying delete the image: not found');
    });

    test('Debe de eliminar un archivo exitosamente', async () => {
        const file = await createFile(); 
        const url = await fileUpload(file);
        const result = await fileDelete(url);
        expect(result).toBe('');
    });
});