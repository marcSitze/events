import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { login, authenticate, isAuthenticated } from '../../auth';

function Login() {
    const [values, setValues] = useState({
        email: '',
        password: '',
        redirectToReferer: false
    });
    const [errors, setErrors] = useState([]);
    const { email, password } = values;
    const handleChange = e => {
        setValues({...values, [e.target.name]: e.target.value });
    }

    const handleSubmit = e => {
        e.preventDefault();
        login(values).then(data => {
            // console.log(data);
            setErrors(data.data);
            authenticate(data.token, () => {
                setValues({...values, redirectToReferer: true});
            });
        }).catch(err => console.log(err));
    };

    if(isAuthenticated()) {
        return <Redirect to="/" />
    }
    return (
        <div className="row auth-block">
             <div className="col-md-6 col-sm-2 col-xs-1 left-block"></div>
            <div className="col-md-6 col-sm-10 col-xs-10 right-block">
                <h2>Login your Account</h2>
                <div className="register-block">
            {errors ? errors.map(err => (<li className="alert alert-danger">{err.msg}</li>)): null}
            <form className="mb-3">
                <label htmlFor="email"></label>
                <input type="email" name="email" onChange={handleChange} value={email} placeholder="Enter an email" />

                <label htmlFor="password"></label>
                <input type="password" name="password" onChange={handleChange} value={password} placeholder="Enter a password" />
                    
                <input onClick={handleSubmit} type="submit" value="Login" />
                <Link to="/register" className="create-account">Create Account</Link>
            </form> 
            </div>
            </div>
        </div>
    )
}

export default Login;