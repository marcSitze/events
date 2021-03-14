import React from 'react';
import Events from '../components/events/Events';
import Navigation from './layout/Navigation';

function Dashboard() {

    return (
        <div className="row dashboard">
        <Navigation title="Events to come" />
        <Events />
        </div>
    )
}

export default Dashboard;