const createFile = async() => {
    // Obtenemos la url de la img
    const resp = await fetch('https://pbs.twimg.com/profile_images/1321662922762825728/geIj9G3O_400x400.jpg');

    // Convertimos a blob la img
    const blob = await resp.blob();

    // Creamos un nuevo archivo con ese blob
    return new File([blob], 'foto.jpg');
}

export default createFile