import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { startLogout } from '../../../actions/auth';
import { startNewNoteAction } from '../../../actions/notes';
import { Sidebar } from '../../../components/journal/Sidebar';

jest.mock('../../../actions/auth', () => ({
    ...jest.requireActual(),
    startLogout: jest.fn()
}));

jest.mock('../../../actions/notes', () => ({
    ...jest.requireActual(),
    startNewNoteAction: jest.fn()
}));

const mockStore = configureStore([thunk]);
const initState = {
    ui: {},
    auth: { uid: '1234', name: 'testing' },
    notes: {
        active: {},
        notes: [{ id:'11111', date: 1647071655611 }, { id: '22222',date: 1647071655611 }]
    }
};
let store = mockStore(initState);

describe('Pruebas en <Sidebar />', () => {
    let wrapper;
    const getWrapper = (store) => mount(
        <Provider store={store}>
            <Sidebar />
        </Provider>
    );

    beforeEach(() => {
        wrapper = getWrapper(store);
        jest.clearAllMocks();
        store.clearActions();
    })

    test('Debe de mostrarse correctamente', () => { 
        expect(wrapper).toMatchSnapshot();
    });

    test('Debe de mostrarse el nombre del usuario', () => {
        const spanText = wrapper.find('span').at(0).text();
        expect(spanText).toBe('testing');
    });
    
    test('Debe de hacer el logout del sistema', () => {
        const store = mockStore(initState);
        store.dispatch = jest.fn();
        const wrapper = getWrapper(store);

        wrapper.find('button').at(0).simulate('click');
        expect(startLogout).toHaveBeenCalled();
    });

    test('Debe de llamar a startNewNoteAction para crear una nota', () => {
        const store = mockStore(initState);
        store.dispatch = jest.fn();
        const wrapper = getWrapper(store);

        wrapper.find('.journal__new-entry').simulate('click');
        expect(startNewNoteAction).toHaveBeenCalled();
    });
});