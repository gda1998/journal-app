import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { NoteScreen } from '../notes/NoteScreen';
import { Sidebar } from './Sidebar';
import { NothingSelected } from './NothingSelected';

export const JournalScreen = () => {
    const { auth, notes } = useSelector( state => state );
    return Object.keys(auth).length === 0 
    ? <Navigate to="/auth/login" />
    : (
        <div className="journal__main-content animate__animated animate__fadeIn animate__faster">
            <Sidebar />
            <main>
                {
                    notes.active === null ? <NothingSelected /> : <NoteScreen />
                }
            </main>
        </div>
    );
}
