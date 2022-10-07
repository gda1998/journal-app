import {
    setErrorAction,
    removeErrorAction,
    startLoadingAction,
    finishLoadingAction
} from '../../actions/ui';
import types from '../../types/types';

describe('Pruebas en UI Actions', () => {
    test('should Todas las acciones debe de funcionar', () => {
        const errorMessage = 'HELP!!!';
        const setErrorActionObj = setErrorAction(errorMessage);
        const removeErrorActionObj = removeErrorAction();
        const startLoadingActionObj = startLoadingAction();
        const finishLoadingActionObj = finishLoadingAction();

        expect(setErrorActionObj).toEqual({
            type: types.uiSetError,
            payload: errorMessage
        });

        expect(removeErrorActionObj).toEqual({
            type: types.uiRemoveError
        });

        expect(startLoadingActionObj).toEqual({
            type: types.uiStartLoading
        });

        expect(finishLoadingActionObj).toEqual({
            type: types.uiFinishLoading
        });

    });
});