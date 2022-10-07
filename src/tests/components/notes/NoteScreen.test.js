import configureStore from 'redux-mock-store';
import { mount } from 'enzyme';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { NoteScreen } from '../../../components/notes/NoteScreen';
import types from '../../../types/types';

const mockStore = configureStore([thunk]);
const initialStore = {
    ui: { loading: false, msgError: null },
    notes: {
        active: { 
            id: '1234',
            title: 'I am a title',
            body: 'I am the note body',
            url: 'https://any.com'
        }
    }
};
const store = mockStore(initialStore);

describe('Pruebas en <NoteScreen />', () => { 
    let wrapper;
    const getWrapper = (store) => mount(
    <Provider store={store}>
        <NoteScreen />
    </Provider>);

    beforeEach( () => {
        wrapper = getWrapper(store);
        store.clearActions();
    });

    test('Debe de mostrarse correctamente', () => { 
        expect(wrapper).toMatchSnapshot();
    });

    test('Debe de disparar el activeNoteAction', () => { 
        wrapper.find('input[type="text"]').simulate('change', {
            target: { name: 'title', value: 'Hola Mundo' }
        });
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: types.notesActive,
            payload: {             
                id: '1234',
                title: 'Hola Mundo',
                body: 'I am the note body',
                url: 'https://any.com'
            }
        });
    });
});