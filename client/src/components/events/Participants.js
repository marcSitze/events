import React, { useState, useEffect } from 'react';
import Navigation from '../layout/Navigation'
import Participant from './Participant';
import { getParticipants } from '../../apiEvent';
import socket from '../../socketClient';

function Participants(props) {
    const [event, setEvent] = useState({});
    const eventId = props.match.params.id;

    useEffect(() => {
        socket.on('participate', data => {
            setEvent(data);
        });
        getParticipants(eventId)
        .then(data => {
            setEvent(data.event);
        })
        .catch(err => console.log(err));
    }, [eventId]);

   return (
        <div className="row dashboard">
        <Navigation title={`Participants: ${event.name}`} />
        {event && event.participants ? event.participants.map(participant => (<Participant participant={participant} key={participant._id} />)): null }
        </div>
    )
}

export default Participants;