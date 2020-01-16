import React from 'react';
import {
    Switch,
    Route,
    HashRouter
} from 'react-router-dom';
import Station from './station';
import Weather from './weather';

function RouteManager() {
    return (
        <HashRouter>
            <Switch>
                <Route path="/weather/:stationId">
                    <Weather />
                </Route>
                <Route path="/">
                    <Station />
                </Route>
            </Switch>
        </HashRouter>
    );
}

export default RouteManager;