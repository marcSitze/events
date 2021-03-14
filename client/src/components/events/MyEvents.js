import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navigation from '../layout/Navigation'
import { getMyEvents, deleteEvent } from '../../apiEvent';
import socket from '../../socketClient';

function MyEvents({ match }) {
    const [myevents, setMyEvents] = useState([]);

    useEffect(() => {
        getMyEvents()
        .then(data => {
                setMyEvents(data.events);
                // console.log(myevents);
        });

        socket.on("deleteEvent", data => {
            console.log(data);
            setMyEvents(data.events);
        });
    
    }, [])

    const handleDelete = (eventId) => {
        deleteEvent(eventId)
        .then(res => {
            // console.log(res.events);
            console.log('event deleted');
            socket.emit("deleteEvent", res);
        })
        .catch(err => console.error(err));
       
    }
   return (
        <div className="row dashboard">
        <Navigation title="My events" />
        {myevents.map(event => (
            <div className="col-md-6" key={event._id}>
            <div className="event">
                <h3>{event.name}</h3>
                <p>{event.description}</p>
                <p>{event.adress}</p>
                <p>{event.date.split('T')[0]}</p>
                <div className="btn-container">
                    <button onClick={e => handleDelete(event._id) } className="delete link">Delete</button>
                    <button className="participate"><Link className="link" to={`/myevents/${event._id}`}>view participants</Link></button>
                </div>
            </div>
        </div>
        ))}
        </div>
    )
}

export default MyEvents;