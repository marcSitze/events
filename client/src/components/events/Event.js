import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

function Event({ event }) {
    const [nav, setNav] = useState('/')
    const { name, description, adress, date } = event;
    const location = useLocation();
    console.log(nav);
    setNav(location.pathname);
    return (
        <div className="col-md-6">
            <div className="event">
                <h3>{name}</h3>
                <p>{description}</p>
                <p>{adress}</p>
                <p>Organisateur : Pierre FIELD</p>
                <p>{date.split('T')[0]}</p>
                <div className="btn-container">
                    {nav === '/myevents' ?  <div><button className="participate">Delete</button>
                    <button className="participate"><Link to={`/myevents/${event._id}`}>view participants</Link></button></div>:  <button className="participate">Participate</button> }
                </div>
            </div>
        </div>
    )
}

export default Event;