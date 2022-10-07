/**
 * @jest-environment node
 */
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase/firebaseConfig';
import { startUploadingImgAction } from '../../actions/notes';
import fileUpload from '../../helpers/fileUpload';

global.scrollTo = jest.fn(); 
jest.mock('../../helpers/fileUpload');

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const initState = {
    auth: { uid: 'TESTING' },
    notes: { active: {
        id: '1rFW7ZGtGaf8VyG4Bsz0',
        title: 'titulo',
        body: 'body',
    }}
};

let store = mockStore(initState);

describe('Pruebas en notes action', () => { 
    beforeEach( () => store = mockStore(initState) );

    test('startUploadingImgAction debe de actualizar el URL de la nota', async() => { 
        const file = [];
        fileUpload.mockReturnValue( Promise.resolve('https://soy-una-liga-cualquiera.jpg') );

        await store.dispatch( startUploadingImgAction(file) );

        const ref = await doc(db, `TESTING/journal/notes/`, '1rFW7ZGtGaf8VyG4Bsz0');
        const noteRef = await getDoc(ref);

        expect(noteRef.data().url).toBe('https://soy-una-liga-cualquiera.jpg');
    }, 30000);
});