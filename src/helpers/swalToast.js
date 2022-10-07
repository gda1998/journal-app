import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

export const swalToast = (icon, title, position) => {
    const MySwal = withReactContent(Swal);
    MySwal.fire({
        icon,
        title,
        toast: true,
        position,
        showConfirmButton: false,
        timer: 5000,
        timerProgressBar: true,
    });
}

export const swalLoading = (title, text) => {
    const MySwal = withReactContent(Swal);
    MySwal.fire({
        title,
        text,
        allowOutsideClick: false,
        // onBeforeOpen: () => Swal.showLoading()
    });
}

export const swalAlert = (title, text, icon) => {
    const MySwal = withReactContent(Swal);
    MySwal.fire({ title, text, icon });
}