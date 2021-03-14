import React, { useState } from 'react';
import { participateEvent } from '../../apiEvent';
import socket from '../../socketClient';

function Participate({ match }) {
    const [motivation, setMotivation] = useState('');
    const  [error, setError] = useState('');
    const eventId = match.params.id;
    
    const handleChange = e => {
        setMotivation(e.target.value);
    }

    const handleSubmit = e => {
        socket.emit('participate', eventId);
        e.preventDefault();
        participateEvent(motivation, eventId)
        .then(data => {
            console.log(data);
            if(data.msg){
                setError(data.msg);
            }else{
                socket.emit("participate", data.event);
            }
        return data;
        })
        .catch(err => console.log(err));
    };
    return (
        <div className="row auth-block">
        <div className="col-md-6 col-sm-2 col-xs-1 left-block"></div>
        <div className="col-md-6 col-sm-10 col-xs-10 right-block">
        <h2 className="title-re">Register to an event</h2>
        <div className="register-block">
        {error ? <p className="alert alert-danger">{error}</p>: null }
        <form className="mb-3">
            <label htmlFor="motivation"></label>
            <input type="text" name="motivation" onChange={handleChange} value={motivation} placeholder="Enter your motivation" />
            <input onClick={handleSubmit} className="mt-2" type="submit" value="Participate" />
        </form> 
        </div>
        
        </div>
    </div>
    )
}

export default Participate;