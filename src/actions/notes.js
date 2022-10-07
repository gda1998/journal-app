import { db } from '../firebase/firebaseConfig';
import types from '../types/types';
import {
    addDoc,
    collection,
    doc,
    updateDoc,
    deleteDoc,
    // getDoc
} from 'firebase/firestore';
import Swal from 'sweetalert2';
import { swalAlert, swalLoading } from '../helpers/swalToast';
import loadNotes from '../helpers/loadNotes';
import fileUpload from '../helpers/fileUpload';
// import fileDelete from '../helpers/fileDelete';

export const startNewNoteAction = () => {
    return (dispatch, getState) => {
        const { uid } = getState().auth;
        const newNote = {
            title: '',
            body: '',
            date: new Date().getTime()
        };

        const notesRef = collection(db, `${uid}/journal/notes`);
        return addDoc(notesRef, newNote)
            .then(docRef => {
                dispatch(activeNoteAction(docRef.id, newNote));
                dispatch(addNewNoteAction(docRef.id, newNote));
            })
            .catch(console.error);
    }
}

export const activeNoteAction = (id, note) => ({
    type: types.notesActive,
    payload: { id, ...note }
});

export const addNewNoteAction = (id, note) => ({
    type: types.notesAddNew,
    payload: { id, ...note }
});

export const startLoadingNotes = (uid) => {
    return async (dispatch) => {
        const notes = await loadNotes(uid);
        dispatch(setNotesAction(notes));
    }
}

export const setNotesAction = (notes) => ({
    type: types.notesLoad,
    payload: notes
});

export const startUpdateNote = (note) => {
    return (dispatch, getState) => {
        const { uid } = getState().auth;
        !note.url && (note.url = null);
        const noteRef = doc(db, `${uid}/journal/notes/`, note.id);
        updateDoc(noteRef, note);
        dispatch(refreshNoteAction(note));
        swalAlert('Updated!', 'The note was updated', 'success');
    }
}

export const refreshNoteAction = (note) => ({
    type: types.notesUpdate,
    payload: note
});

export const startUploadingImgAction = (file) => {
    return async (dispatch, getState) => {
        const { active: activeNote } = getState().notes;
        swalLoading('Uploading', 'Please wait...');

        const fileUrl = await fileUpload(file);
        activeNote.url = fileUrl;

        Swal.close();
        await dispatch(startUpdateNote(activeNote));
    }
}

export const startDeleteNote = (id) => {
    return async (dispatch, getState) => {
        const { uid } = getState().auth;
        try {
            const ref = await doc(db, uid, `journal/notes/${id}`);
            // const noteRef = await getDoc(ref);

            // Delete the image from cloudinary and from the db
            // fileDelete(noteRef.data().url)
            await deleteDoc(ref);

            dispatch(deleteNote(id));
        } catch (error) {
            console.error('Error al eliminar la nota: ', error);
        }
    }
}

export const deleteNote = (id) => ({
    type: types.notesDelete,
    payload: id
});

export const notesLogout = () => ({
    type: types.notesLogoutCleaning
})