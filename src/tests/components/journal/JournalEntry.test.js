import configureStore from 'redux-mock-store';
import { mount } from 'enzyme';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { JournalEntry } from '../../../components/journal/JournalEntry';
import { activeNoteAction } from '../../../actions/notes';

const mockStore = configureStore([thunk]);
const store = mockStore({});
store.dispatch = jest.fn();

const note = {
    id: '1234',
    title: 'I am a title',
    body: 'I am the body',
    date: '13859454',
    url: 'https://any.com'
}

describe('Prueba en <JournalEntry />', () => {
    let wrapper;
    const getWrapper = (store) => mount(
        <Provider store={store}>
            <JournalEntry {...note} />
        </Provider>
    );

    beforeEach( () => wrapper = getWrapper(store));

    test('Debe de mostrarse correctamente', () => { 
        expect(wrapper).toMatchSnapshot();
    });

    test('Debe de llamarse el action activeNoteAction', () => { 
        wrapper.find('.journal__entry').simulate('click');
        expect(store.dispatch).toHaveBeenCalledWith(
            activeNoteAction(note.id, note)
        );
    });
});