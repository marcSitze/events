import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getEvents } from '../../apiEvent';
import socket from '../../socketClient';

function Events() {
    const [events, setEvents] = useState([]);
    useEffect(() => {
        getEvents()
        .then(data => {
            socket.emit("getEvents", data.events);
            setEvents(data.events);

        })
        .catch(err => console.log(err));

    },[]);

    socket.on("getEvents", data => {
        console.log(data);
        setEvents(data);
    });

    socket.on("newEvent", data => {
        setEvents([...events, data]);
    });

   return (
        <div className="container overflow-scroll">
         {events.map(event => (
             <div className="col-md-6" key={event._id}>
             <div className="event">
                 <h3>{event.name}</h3>
                 <p>{event.description}</p>
                 <p>{event.adress}</p>
                 <p>Organisateur : {event.user.name}</p>
                 <p>{event.date}</p>
                 <div className="btn-container">
                     <button className="participate"><Link className="link" to={`/events/${event._id}`}>Participate</Link></button> 
                 </div>
             </div>
         </div>
         ))}
        </div>
    )
}

export default Events;