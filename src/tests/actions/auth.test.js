import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { login, logout, startLoginEmailPassword, startLogout } from '../../actions/auth';
import types from '../../types/types';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const initState = {};

let store = mockStore(initState);

describe('Pruebas en auth actions', () => { 

    beforeEach( () => store = mockStore(initState) );

    test('Login y Logout deben de crear la accion respectiva', () => { 
        const loginObj = login('1234', 'Gabriel'); 
        const expectLogin = {
            type: types.login,
            payload: {
                uid: '1234',
                displayName: 'Gabriel'
            }
        };

        const expectLogout = { type: types.logout };

        expect(loginObj).toEqual(expectLogin);
        expect( logout() ).toEqual( expectLogout );
    });

    test('should startLogout debe de funcionar correctamente', async() => { 
        await store.dispatch( startLogout() );
        const actions = store.getActions();
        expect(actions.length).toBe(2);
        expect(actions[0]).toEqual({ type: types.logout });
        expect(actions[1]).toEqual({ type: types.notesLogoutCleaning });
    });

    test('startLoginEmailPassword debe de funcionar correctamente', async() => { 
        await store.dispatch( startLoginEmailPassword({
            email: 'test@testing.com',
            password: '123456'
        }));

        const actions = store.getActions();
        expect(actions[0]).toEqual({ type: types.uiStartLoading });
        expect(actions[1]).toEqual({ 
            type: types.login,
            payload: {
                uid: expect.any(String),
                displayName: null
            }
        });
        expect(actions[2]).toEqual({ type: types.uiFinishLoading });
    });
});