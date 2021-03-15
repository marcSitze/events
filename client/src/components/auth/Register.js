import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { register, authenticate, isAuthenticated } from '../../auth';

function Register() {
    const [values, setValues] = useState({
        email: '',
        password: '',
        name: '',
        age: '',
        redirectToReferer: false
    });
    const [errors, setErrors] = useState([]);
    const { email, password, name, age } = values;

    const handleChange = e => {
        setValues({...values, [e.target.name]: e.target.value });
    }

    const handleSubmit = e => {
        e.preventDefault();
        register(values).then(data => {
            // console.log(data);
            setErrors(data.data);
            authenticate(data.token, () => {
                setValues({...values, redirectToReferer: true });
            });
        }).catch(err => console.error('THere was an error' + err));
    }
    if(isAuthenticated()) {
        return <Redirect to="/" />
    }
    return (
        <div className="row auth-block">
             <div className="col-md-6 col-sm-2 col-xs-1 left-block"></div>
             <div className="col-md-6 col-sm-10 col-xs-10 right-block">
                <h2>Create your account</h2>
                <div className="register-block">
                {errors ? errors.map(err => (<li className="alert alert-danger" key={err.msg}>{err.msg}</li>)): null}
            <form>
                <label htmlFor="email"></label>
                <input onChange={handleChange} type="email" name="email" value={email} placeholder="Enter an email" />

                <label htmlFor="password"></label>
                <input onChange={handleChange} type="password" name="password" value={password} placeholder="Enter a password" />
            
                <label htmlFor="name"></label>
                <input onChange={handleChange} type="name" name="name" value={name} placeholder="Enter a name" />
            
                <label htmlFor="age"></label>
                <input onChange={handleChange} type="text" name="age" value={age} placeholder="Enter your age" />
            
                <input onClick={handleSubmit} type="submit" value="Create an account" />
            </form> 
            </div>
            </div>
        </div>
    )
}

export default Register;