import configureStore from 'redux-mock-store';
import { mount } from 'enzyme';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { JournalScreen } from '../../../components/journal/JournalScreen';

const mockStore = configureStore([thunk]);
const store = mockStore({
    auth: { uid: '1243', name: 'Gabriel' },
    ui: { loading: false, msgError: null },
    notes: {
        active: {},
        notes: [{ id:'11111', date: 1647071655611 }, { id: '22222',date: 1647071655611 }]
    }
});

describe('Pruebas en <JournalScreen />', () => { 
    let wrapper;
    const getWrapper = (store) => mount(
        <Provider store={store}>
            <MemoryRouter initialEntries={['/']}>
                <Routes>
                    <Route path="/" element={ <JournalScreen /> } />
                    <Route path="/auth/login" element={ <h1>LoginScreen</h1> } />
                </Routes>
            </MemoryRouter>
        </Provider>
    );

    beforeEach( () => {
        wrapper = getWrapper(store);
    });

    test('Se debe de mostrar correctamente', () => { 
        expect(wrapper).toMatchSnapshot();
    });

    test('Debe de retornar al login si no esta autenticado', () => {
        const store = mockStore({
            auth: {},
            ui: { loading: false, msgError: null }
        });
        wrapper = getWrapper(store);
        expect(wrapper.find('h1').exists()).toBe(true);
        expect(wrapper.find('h1').text()).toBe('LoginScreen');
    });

    test('Debe de mostrarse el Sidebar si esta autenticado', () => { 
        expect(wrapper.find('Sidebar').exists()).toBe(true);
    });
});