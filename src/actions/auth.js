import { 
    createUserWithEmailAndPassword,
    getAuth,
    signInWithPopup,
    signInWithEmailAndPassword,
    signOut,
    updateProfile 
} from 'firebase/auth';
import { googleAuthProvider } from '../firebase/firebaseConfig';
import { finishLoadingAction, startLoadingAction } from './ui';
import { swalAlert } from '../helpers/swalToast';
import types from '../types/types';
import { notesLogout } from './notes';

export const startRegisterAction = ({ email, password, name }) => {
    return (dispatch) => {
        const auth = getAuth();
        dispatch( startLoadingAction() );
        createUserWithEmailAndPassword(auth, email, password)
        .then( async({ user }) => {
            await updateProfile(user, { displayName: name });
            dispatch( login(user.uid, user.displayName) );
        })
        .catch( e => swalAlert('Error!', e, 'error') )
        .finally( () => dispatch( finishLoadingAction() ) );
    };
};

export const startLoginEmailPassword = ({ email, password }) => {
    return (dispatch) => {
        const auth = getAuth();
        dispatch( startLoadingAction() );
        return signInWithEmailAndPassword(auth, email, password)
        .then( ({user}) => dispatch( login(user.uid, user.displayName) ) )
        .catch( e => swalAlert('Error!', e, 'error') )
        .finally( () => dispatch( finishLoadingAction() ) );
    };
};

export const startGoogleLogin = () => {
    return (dispatch) => {
        const auth = getAuth();
        signInWithPopup(auth, googleAuthProvider)
        .then( ({user}) => {
            dispatch( login(user.uid, user.displayName) )
        });
    }
}

export const login = (uid, displayName) => ({
    type: types.login,
    payload: {
        uid,
        displayName
    }
});

export const logout = () => ({
    type: types.logout
})

export const startLogout = () => {
    return async(dispatch) => {
        await signOut( getAuth() );
        dispatch( logout() );
        dispatch(  notesLogout() );
    }
}