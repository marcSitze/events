import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { logout } from '../../auth';

function Navigation(props) {
    const handleClick = () => {
        logout().then(data => data.json());
        return <Redirect to="/" />
    }

    return (
        <div>
            <div className="col-12 top-links">
                <Link onClick={handleClick} to="/logout" className="btn-nav">Logout</Link>
                <div className="nav-right">
                    <Link to="/myevents/create" className="btn-nav py-2">Create an event</Link>
                    <Link to="/myevents" className="btn-nav ml-4 py-2">View my events</Link>
                    <Link to="/" className="btn-nav ml-4 py-2">View all events</Link>
                </div>
            </div>
            <h2 className="text-center heading">{props.title}</h2>
        </div>
    )
}

export default Navigation;