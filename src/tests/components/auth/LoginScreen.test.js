import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { startGoogleLogin, startLoginEmailPassword } from '../../../actions/auth';
import { LoginScreen } from '../../../components/auth/LoginScreen';

jest.mock('../../../actions/auth', () => ({
    startGoogleLogin: jest.fn(),
    startLoginEmailPassword: jest.fn()
}));

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const store = mockStore({
    auth: {},
    ui: {
        loading: false,
        msgError: null
    }
});
store.dispatch = jest.fn();

describe('Pruebas en <LoginScreen />', () => {
    let wrapper;
    const getWrapper = () => mount(
        <MemoryRouter initialEntries={['/auth/login']}>
            <Provider store={store}>
                <LoginScreen />
            </Provider>
        </MemoryRouter>
    );

    beforeEach( () => {
        wrapper = getWrapper();
        jest.clearAllMocks();
        store.clearActions();
    });

    test('Debe de mostrarse correctamente', () => {
        expect(wrapper).toMatchSnapshot();
    });

    test('Debe de funcionar el handleInputChange', () => {
        const input = wrapper.find('input').at(0);
        input.simulate('change', {
            target: { name: 'email', value: 'gabriel@gmail.com' }
        });
        expect(wrapper.find('input[name="email"]').prop('value')).toBe('gabriel@gmail.com');
    });

    test('Debe de estar deshabilitado el boton de login cuando este cargando UI', () => { 
        const store = mockStore({
            ui: { loading: true }
        });
        const wrapper = mount(
            <MemoryRouter>
                <Provider store={store}>
                    <LoginScreen />
                </Provider>
            </MemoryRouter>
        );
        const button = wrapper.find('button');
        expect(button.prop('disabled')).toBe(true);
    });
    
    test('Debe de hacer login con Google', () => { 
        wrapper.find('.google-btn').simulate('click');
        expect(startGoogleLogin).toHaveBeenCalled();
    });

    test('Debe de hacer login con email', () => {
        wrapper.find('form').simulate('submit', { preventDefault(){} });
        expect(startLoginEmailPassword).toHaveBeenCalledTimes(1);
        expect(startLoginEmailPassword).toHaveBeenCalledWith({
            email: '',
            password: ''
        });
    });
});