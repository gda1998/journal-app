import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from '../../hooks/useForm';
import { NotesAppBar } from './NotesAppBar';
import { activeNoteAction, startDeleteNote } from '../../actions/notes';

export const NoteScreen = () => {
    // Redux
    const dispatch = useDispatch();
    const { active:note } = useSelector( state => state.notes );

    // useForm
    const [ formValues, handleInputChange, reset ] = useForm(note);
    const { title, body } = formValues;
    note.url && ( formValues.url = note.url );

    // useRef
    const activeId = useRef(note.id);

    // handleDelete
    const handleDelete = () => dispatch( startDeleteNote(note.id) );

    useEffect(() => {
        if( activeId.current !== note.id ){
            reset(note);
            activeId.current = note.id;
        }
    }, [note, reset]);

    useEffect(() => {
        dispatch( activeNoteAction(formValues.id, {...formValues}) );
    }, [dispatch, formValues]);
    

    return (
        <div className="notes__main-content">

            <NotesAppBar />
            <div className="notes__content">

                <input
                    autoComplete="off"
                    className="notes__title-input"
                    name="title"
                    onChange={ handleInputChange }
                    placeholder="Some awesome title"
                    type="text"
                    value={ title }
                />
                <textarea
                    className="notes__textarea"
                    name="body"
                    onChange={ handleInputChange }
                    placeholder="What's happened today?"
                    type="text"
                    value={ body }
                ></textarea>

                {
                    note.url &&
                    <div className="notes__image">
                        <img
                            src={ note.url }
                            alt="imagen"
                        />
                    </div>/* /.notes__image */
                }

            </div>{/* /.notes__content */}

            <button
                className="btn btn-danger"
                onClick={ handleDelete }
            >
                Delete
            </button>

        </div>/* /.notes__main-content */
    );
}
