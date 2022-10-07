import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthRouter } from './AuthRouter';
import { JournalScreen } from '../components/journal/JournalScreen';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useDispatch } from 'react-redux';
import { login } from '../actions/auth';
import { startLoadingNotes } from '../actions/notes';

export const AppRouter = () => {
    const dispatch = useDispatch();
    const [checking, setChecking] = useState(true);

    useEffect(() => {
        const auth = getAuth();
        onAuthStateChanged(auth, async(user) => {

            if(user?.uid){
                dispatch( login(user.uid, user.displayName) );
                dispatch( startLoadingNotes(user.uid) );
            }
            setChecking(false);

        });
    }, [dispatch, setChecking]);

    if(checking) return (<h1>Please wait...</h1>);

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/auth/*" element={ <AuthRouter /> } />
                <Route path="/" element={ <JournalScreen /> } />
                <Route path="/*" element={ <Navigate to="/auth/login" replace /> } />
            </Routes>
        </BrowserRouter>
    );
}