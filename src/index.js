import React from 'react';
import ReactDOM from 'react-dom';
import RouteManager from './components/RouteManager';
import './index.css';
import 'antd/dist/antd.css';

function App() {
    return (
        <div style={{ height: "100%" }}>
            <RouteManager />
        </div>
    );
}

ReactDOM.render(<App />, document.getElementById('root'));
