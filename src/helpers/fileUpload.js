/**
 * @param  {File} file
 * @returns  {String|null}
 */
const fileUpload = async(file) => {
    const cloudUrl = 'https://api.cloudinary.com/v1_1/gda1998/upload';

    // Preparacion de los datos
    const formData = new FormData();
    formData.append('upload_preset', 'react-journal');
    formData.append('file', file);

    try {
        const response = await fetch(cloudUrl, {
            method: 'POST',
            body: formData
        });

        if (response.ok) {
            const cloudResp = await response.json();
            return cloudResp.secure_url;
        } else return null;
        // else throw await response.json();

    } catch (error) {
        console.error(error);
    }
}

export default fileUpload;