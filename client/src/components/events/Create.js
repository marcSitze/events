import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { isAuthenticated } from '../../auth';
import { createEvent } from '../../apiEvent';
import socket from '../../socketClient';
import Navigation from '../layout/Navigation';

function Create() {
    const [values, setValues] = useState({
        name: '',
        description: '',
        adress: '',
        date: ''
    });

    const [errors, setErrors] = useState([]);
    const { name, description, adress, date } = values;

    const handleChange = e => {
        setValues({...values, [e.target.name]: e.target.value });
    }

    const handleSubmit = e => {
        e.preventDefault();
        createEvent(values).then(data => {
            if(data.errors) {
                setErrors(data.errors);
            } else {
                setErrors([]);
                socket.emit('newEvent', data.event);
                return <Redirect to="/myevents" />
            }
        }).catch(err => console.error('THere was an error' + err));
    }
    if(!isAuthenticated()) {
        return <Redirect to="/login" />
    }
    return (
        <div className="row auth-block">
            <Navigation />
             <div className="col-md-6 col-sm-2 col-xs-1 left-block"></div>
            <div className="col-md-6 col-sm-10 col-xs-10 right-block">
                <h2>Create event</h2>
                <div className="register-block">
                {errors ? errors.map(err => (<li className="alert alert-danger" key={err.msg}>{err.msg}</li>)): null}
            <form>
                <label htmlFor="name"></label>
                <input onChange={handleChange} type="name" name="name" value={name} placeholder="Enter the name" />

                <label htmlFor="description"></label>
                <input onChange={handleChange} type="text" name="description" value={description} placeholder="Enter a description" />
            
                <label htmlFor="adress"></label>
                <input onChange={handleChange} type="text" name="adress" value={adress} placeholder="Enter a adress" />
            
                <label htmlFor="age"></label>
                <input onChange={handleChange} type="date" name="date" value={date} placeholder="Enter a date" />
            
                <input onClick={handleSubmit} type="submit" value="Create event" />
            </form> 
            </div>
            </div>
        </div>
    )
}

export default Create;