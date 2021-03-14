import React from 'react';

function Participant({ participant }) {
    return (
        <div className="col-md-6">
            <div className="event">
                <h3>{participant.participant.name}</h3>
                <p>{participant.participant.age}</p>
                <p>{participant.motivation}</p>
            </div>
        </div>
    )
}

export default Participant;