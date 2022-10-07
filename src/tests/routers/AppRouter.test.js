import configureStore from 'redux-mock-store';
import { mount } from 'enzyme';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { AppRouter } from '../../routes/AppRouter';
import { act } from '@testing-library/react';
import { login } from '../../actions/auth';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

jest.mock('../../actions/auth', () => ({
    ...jest.requireActual('../../actions/auth'),
    login: jest.fn()
}));

const mockStore = configureStore([thunk]);
const initialStore = {
    auth: { uid: '', name: '' },
    ui: { loading: false, msgError: null },
    notes: { 
        active: {}, 
        notes: [{id: '123'}, {id: '456'}] 
    }
};
const store = mockStore(initialStore);
store.dispatch = jest.fn();

describe('Pruebas en <AppRouter />', () => {
    let wrapper;
    const getWrapper = (store) => mount(
        <Provider store={store}>
            <AppRouter checking={false} />
        </Provider>
    );

    test('Debe de ejecutarse el login action cuando el usuario este autenticado', async() => {
        await act( async() => {
            const { user } = await signInWithEmailAndPassword(getAuth(), 'test@testing.com', '123456');
            wrapper = getWrapper(store);
        });
        expect(login).toHaveBeenCalled();
    });
});