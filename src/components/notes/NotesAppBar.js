import { useDispatch, useSelector } from 'react-redux';
import { startUpdateNote, startUploadingImgAction } from '../../actions/notes';

export const NotesAppBar = () => {
    // Redux
    const dispatch = useDispatch();
    const { active:note } = useSelector( state => state.notes );
    const handleUpdate = () => dispatch( startUpdateNote(note) );
    const handlePictureClick = () => document.querySelector('#fileSelector').click();
    
    const handleFileChange = ({target}) => {
        const file = target.files[0];
        file && dispatch( startUploadingImgAction(file) );
    }

    return (
        <div className="notes__appbar">
            <span>05 de Noviembre de 2021</span>

            <input
                id="fileSelector"
                onChange ={ handleFileChange }
                type="file"
                style={{ display: 'none' }}
            />

            <div>
                <button 
                    className="btn"
                    onClick={ handlePictureClick }
                >
                    Picture
                </button>
                <button 
                    className="btn"
                    onClick={ handleUpdate }
                >
                    Save
                </button>
            </div>
        </div>/* /.notes__appbar */
    );
}