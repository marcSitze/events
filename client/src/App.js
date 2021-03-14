import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Dashboard from './components/Dashboard';
import Events from './components/events/Events';
import CreateEvent from './components/events/Create';
import MyEvents from './components/events/MyEvents';
import PrivateRoute from './auth/PrivateRoute';
import Participants from './components/events/Participants';
import Participate from './components/events/Participate';

function App() {
  return (
    <div className="container">
      {/* <Dashboard /> */}
  <Router>
    <Switch>
    <PrivateRoute path="/" exact component={Dashboard} />
    <Route path="/login" component={Login} />
    <Route path="/register" exact component={Register} />
    <PrivateRoute path="/events" exact component={Events} />
    <PrivateRoute path="/events/:id" exact component={Participate} />
    <Route path="/myevents" exact component={MyEvents} />
    <PrivateRoute path="/myevents/create" exact component={CreateEvent} />
    <PrivateRoute path="/myevents/:id" exact component={Participants} />
    <PrivateRoute path="/logout" />
    <Route path="*">
        <div>404 Not Found</div>
    </Route>
    </Switch>
  </Router>
  </div> 
  );
}

export default App;
