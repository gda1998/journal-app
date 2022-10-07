import dayjs from 'dayjs';
import { useDispatch } from 'react-redux';
import { activeNoteAction } from '../../actions/notes';


export const JournalEntry = ({ id, title, body, date, url }) => {
    const noteDate = dayjs(date);
    const dispatch = useDispatch();
    const handleEntryClick = () => dispatch( activeNoteAction(id, { title, body, date, url }) );

    return (
        <div 
            className="journal__entry pointer animate__animated animate__fadeIn animate__faster"
            onClick={ handleEntryClick }
        >

            { url && 
                <div 
                    className="journal__entry-picture"
                    style={{ 
                        backgroundSize: 'cover',
                        backgroundImage: `url(${ url })`
                    }}
                >
                </div>/* /.journal__entry-picture */
            }


            <div className="journal__entry-body">
                <p className="journal__entry-title">
                    { title }
                </p>
                <p className="journal__entry-content">
                    { body }
                </p>
            </div>{/* /.journal__entry-body */}

            <div className="journal__entry-date-box">
                <span>{ noteDate.format('dddd') }</span>
                <h4>{ noteDate.format('DD') }</h4>
            </div>{/* /.journal__entry-date-box */}

        </div>/* /.journal__entry */
    );
}