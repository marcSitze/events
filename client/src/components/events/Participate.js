import React, { useState } from 'react';
import { participateEvent } from '../../apiEvent';
import socket from '../../socketClient';

function Participate({ match }) {
    const [motivation, setMotivation] = useState('');
    const [message, setMessage] = useState({
        description: '',
        alert: ''
    });

    const eventId = match.params.id;
    
    const handleChange = e => {
        setMotivation(e.target.value);
    }

    const handleSubmit = e => {
        e.preventDefault();
        participateEvent(motivation, eventId)
        .then(data => {
            console.log(data);
            if(data.error){
                setMessage({description: data.error, alert: "danger"});
                setTimeout(() => {
                    setMessage({description: '', alert: ''});
                }, 3000);
            }else{
                socket.emit("participate", data.event);
                setMessage({description: 'registration successfull', alert: "success"});
                setTimeout(() => {
                    setMessage({description: '', alert: ''});
                }, 3000);
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
        {message.description ? <p className={`alert alert-${message.alert}`}>{message.description}</p>: null }
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