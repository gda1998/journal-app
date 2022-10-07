import configureStore from 'redux-mock-store';
import { mount } from 'enzyme';
import thunk from 'redux-thunk';
import { AuthRouter } from '../../routes/AuthRouter';
import { Provider } from 'react-redux';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

const mockStore = configureStore([thunk]);
const store = mockStore({
    auth: {},
    ui: {loading: false,
        msgError: null
    }
});

describe('Pruebas en <AuthRouter />', () => {
    const getWrapper = (store) => mount(
        <Provider store={store}>
            <MemoryRouter initialEntries={['/auth/login']}>
                <Routes>
                    <Route path="/auth/*" element={ <AuthRouter /> } />
                    <Route path="/" element={ <h1>JournalScreen</h1> } />
                </Routes>
            </MemoryRouter>
        </Provider>
    );

    beforeEach( () => {
        store.clearActions();
        // jest.clearAllMocks();
    });

    test('Se debe de mostrar el Login si no esta autenticado', () => {
        const wrapper = getWrapper(store);
        expect( wrapper.find('h3').exists() ).toBe(true);
    });

    test('should Se debe de mostrar el JournalScreen', () => { 
        const store = mockStore({
            auth: { uid: '123', name: 'Gabriel' },
        });
        const wrapper = getWrapper(store);
        expect( wrapper.find('h1').exists() ).toBe(true);
        expect( wrapper.find('h1').text() ).toBe('JournalScreen');
    });
});