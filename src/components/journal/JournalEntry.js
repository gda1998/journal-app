import React from 'react';

export const JournalEntry = () => {
    return (
        <div className="journal__entry pointer">

            <div 
                className="journal__entry-picture"
                style={{ 
                    backgroundSize: 'cover',
                    backgroundImage: 'url(https://images.ctfassets.net/hrltx12pl8hq/3MbF54EhWUhsXunc5Keueb/60774fbbff86e6bf6776f1e17a8016b4/04-nature_721703848.jpg?fit=fill&w=480&h=270)'
                }}
            >

            </div>{/* /.journal__entry-picture */}

            <div className="journal__entry-body">
                <p className="journal__entry-title">
                    Un nuevo día
                </p>
                <p className="journal__entry-content">
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                </p>
            </div>{/* /.journal__entry-body */}

            <div className="journal__entry-date-box">
                <span>Monday</span>
                <h4>28</h4>
            </div>{/* /.journal__entry-date-box */}

        </div>/* /.journal__entry */
    );
}
