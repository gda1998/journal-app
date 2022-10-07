import authReducer from '../../reducers/authReducer';
import types from '../../types/types';

describe('Pruebas en authReducer', () => {

    let state = {};
    const action = {
        type: types.login,
        payload: {
            uid: 123,
            displayName: 'Gabriel'
        }
    };

    beforeEach(() => {
        state = authReducer({}, action);
    });

    test('Debe de hacer correctamente login', () => {
        expect(state).toEqual({
            uid: 123,
            name: 'Gabriel'
        });
    });

    test('Debe de hacer correctamente el logout', () => {
        const newAction = { type: types.logout };
        const stateLogout = authReducer(state, newAction);
        expect(stateLogout).toEqual({});
    });

    test('should Debe de regresar el estado inicial', () => {
        const emptyAction = { type: 'lorem ipsum' };
        const state = authReducer({}, emptyAction);
        expect(state).toEqual({});
    });
});