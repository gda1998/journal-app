import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import authReducer from '../reducers/authReducer';
import uiReducer from '../reducers/uiReducer';
import notesReducer from '../reducers/notesReducer';

const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const reducers = combineReducers({
    auth: authReducer,
    ui: uiReducer,
    notes: notesReducer
});

const store = createStore(
    reducers,
    composeEnhancers( applyMiddleware(thunk) )
);

export default store;