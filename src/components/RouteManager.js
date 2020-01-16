import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from 'react-router-dom';
import Station from './station';
import Weather from './weather';

function RouteManager() {
    return (
        <Router>
            <Switch>
                <Route path="/weather/:stationId">
                    <Weather />
                </Route>
                <Route path="/">
                    <Station />
                </Route>
            </Switch>
        </Router>
    );
}

export default RouteManager;