import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { startRegisterAction } from '../../../actions/auth';
import { RegisterScreen } from '../../../components/auth/RegisterScreen';
import types from '../../../types/types';

jest.mock('../../../actions/auth', () => ({
    ...jest.requireActual('../../../actions/auth'),
    startRegisterAction: jest.fn()
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
// store.dispatch = jest.fn(); // * Solo se usa cuando las acciones son asincronas


describe('Pruebas en <RegisterScreen />', () => {
    let wrapper;
    const getWrapper = (store) => mount(
        <Provider store={store}>
            <MemoryRouter>
                <RegisterScreen />
            </MemoryRouter>
        </Provider>);

    const targetObject = (name, value) => ({
        target: { name, value }
    });

    beforeEach( () => {
        wrapper = getWrapper(store);
        jest.clearAllMocks();
        store.clearActions();
    });

    test('Debe de mostrarse correctamente', () => { 
        expect(wrapper).toMatchSnapshot();
    });

    test('Debe de hacer el dispatch con setErrorAction si el email es invalido', () => { 
        wrapper.find('input').at(1).simulate('change', targetObject('email', 'abcd'));
        wrapper.find('form').simulate('submit', { preventDefault(){} });
        
        const actions = store.getActions();

        expect(actions[0]).toMatchObject({
            type: types.uiSetError,
            payload: 'Email Invalid'
        });
    });

    test('Debe de mostrar un error si el email no esta validado', () => { 
        const store = mockStore({
            auth: {},
            ui: {
                loading: false,
                msgError: 'Email Invalid'
            }
        });

        const wrapper = getWrapper(store);
        const errorDiv = wrapper.find('.auth__alert-error');
        expect(errorDiv.exists()).toBe(true);
        expect(errorDiv.text()).toBe('Email Invalid');
    });

    test('Debe de funcionar el handleInputChange del formulario', () => { 
        wrapper.find('input[name="name"]').simulate('change', targetObject('name', 'Gabriel Diaz'));
        expect(wrapper.find('input[name="name"]').prop('value')).toBe('Gabriel Diaz');
    });

    test('Debe de llamar al dispatch startRegisterAction si el formulario esta bien llenado', () => { 
        const store = mockStore({
            auth: {},
            ui: {
                loading: false,
                msgError: null
            }
        });
        store.dispatch = jest.fn();
        const wrapper = getWrapper(store);

        wrapper.find('input[name="name"]').simulate('change', targetObject('name', 'Gabriel Diaz'));
        wrapper.find('input[name="email"]').simulate('change', targetObject('email', 'gabriel@gmail.com'));
        wrapper.find('input[name="password"]').simulate('change', targetObject('password', '123456'));
        wrapper.find('input[name="password2"]').simulate('change', targetObject('password2', '123456'));

        wrapper.find('form').simulate('submit', { preventDefault(){} });

        expect(startRegisterAction).toHaveBeenCalled();
    });
});