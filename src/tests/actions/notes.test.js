/**
 * @jest-environment node
 */
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { disableNetwork, doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase/firebaseConfig';
import { 
    startDeleteNote, 
    startLoadingNotes, 
    startNewNoteAction, 
    startUpdateNote, 
    startUploadingImgAction
} from '../../actions/notes';
import types from '../../types/types';

const middlewares = [thunk]; // add your middlewares like `redux-thunk`
const mockStore = configureStore(middlewares);
const initState = {
    auth: { uid: 'TESTING' }
};

let store = mockStore(initState);

describe('Pruebas en notes actions', () => {

    beforeEach(() => {
        store = mockStore(initState);
    });

    afterAll(() => disableNetwork(db));

    test('startNewNoteAction debe de agregar una nueva accion', async () => {
        await store.dispatch(startNewNoteAction());
        const actions = store.getActions();

        const payload = {
            id: expect.any(String),
            title: '',
            body: '',
            date: expect.any(Number)
        };

        expect(actions[0]).toEqual({
            type: types.notesActive,
            payload
        });

        expect(actions[1]).toEqual({
            type: types.notesAddNew,
            payload
        });

        // Eliminamos las notas que se crearon de prueba
        await store.dispatch( 
            startDeleteNote(actions[0].payload.id) 
        );
    });

    test('Se deben de cargar todas las notas', async() => { 
        await store.dispatch( startLoadingNotes('TESTING') );
        const actions = store.getActions();

        const expected = {
            id: expect.any(String),
            title: expect.any(String),
            body: expect.any(String),
            date: expect.any(Number)
        };

        expect(actions[0]).toEqual({
            type: types.notesLoad,
            payload: expect.any(Array)
        });

        expect(actions[0].payload.length).toBe(2);
        expect(actions[0].payload[0]).toMatchObject(expected);
    });

    test('Se debe de actualizar la nota', async() => { 
        const note = {
            id: '1rFW7ZGtGaf8VyG4Bsz0',
            title: 'titulo',
            body: 'body'
        };

        await store.dispatch( startUpdateNote(note) );
        const actions = store.getActions();

        const ref = doc(db, `TESTING/journal/notes/`, note.id);
        const noteRef = await getDoc(ref);

        expect(actions[0].type).toBe(types.notesUpdate);
        expect(note.title).toBe(noteRef.data().title);
    });
});