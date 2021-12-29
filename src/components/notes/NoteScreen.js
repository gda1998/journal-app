import React from 'react';
import { NotesAppBar } from './NotesAppBar';

export const NoteScreen = () => {
    return (
        <div className="notes__main-content">

            <NotesAppBar />
            <div className="notes__content">

                <input
                    type="text"
                    placeholder="Some awesome title"
                    className="notes__title-input"
                    autoComplete="off"
                />
                <textarea
                    placeholder="What's happened today?"
                    className="notes__textarea"
                ></textarea>

                <div className="notes__image">
                    <img
                        src="https://media.istockphoto.com/photos/picturesque-morning-in-plitvice-national-park-colorful-spring-scene-picture-id1093110112?k=20&m=1093110112&s=612x612&w=0&h=3OhKOpvzOSJgwThQmGhshfOnZTvMExZX2R91jNNStBY="
                        alt="imagen"
                    />
                </div>{/* /.notes__image */}

            </div>{/* /.notes__content */}

        </div>/* /.notes__main-content */
    );
}
