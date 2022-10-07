import types from '../../types/types';

describe('Pruebas en types.js', () => {
    const typesTest = {
        login: '[Auth] Login',
        logout: '[Auth] Logout',

        uiSetError: '[UI] SetError',
        uiRemoveError: '[UI] RemoveError',
        uiStartLoading: '[UI] StartLoading',
        uiFinishLoading: '[UI] FinishLoading',

        notesAddNew: '[Notes] New note',
        notesActive: '[Notes] Set active note',
        notesLoad: '[Notes] Load notes',
        notesUpdate: '[Notes] Update note',
        notesFileUrl: '[Notes] Update note image url',
        notesDelete: '[Notes] Delete note',
        notesLogoutCleaning: '[Notes] Logout Cleaning'
    };

    test('Debe de coincidir el objeto JSON', () => {
        expect(typesTest).toEqual(types);
    });
});