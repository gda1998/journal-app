import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import { useDispatch, useSelector } from 'react-redux';
import { startUpdateNote, startUploadingImgAction } from '../../actions/notes';

export const NotesAppBar = () => {
    // Date now
    dayjs.extend(localizedFormat);

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
            <span>{ dayjs().format('LL') }</span>

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