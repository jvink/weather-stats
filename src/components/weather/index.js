import React, { useEffect, useState, useRef } from 'react';
import { useRouteMatch, useLocation } from 'react-router-dom';
import { Canvas, useThree, extend, useFrame } from 'react-three-fiber';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import BarRow from './BarRow';
import moment from 'moment';

extend({ OrbitControls })
const Controls = props => {
    const { gl, camera } = useThree()
    const ref = useRef()
    useFrame(() => ref.current.update())
    return <orbitControls ref={ref} args={[camera, gl.domElement]} {...props} />
}

function Weather() {
    const location = useLocation();
    const urlParams = new URLSearchParams(location.search);
    const from = moment(urlParams.get("from")).format("YYYY-MM") || undefined;
    const until = moment(urlParams.get("until")).format("YYYY-MM") || undefined;
    const match = useRouteMatch();
    const { stationId } = match.params;
    const [data, setData] = useState({ meta: undefined, data: [] });
    let matrix = [];

    useEffect(() => {
        if (stationId) {
            const fetchData = async () => {
                const res = await fetch(`https://api.meteostat.net/v1/history/monthly?station=${stationId}&start=${from}&end=${until}&key=dPTiJZzl`);
                const data = await res.json();
                setData(data);
            };
            fetchData();
        }
    }, [from, until, stationId]);

    const chunk = 12;
    let temparray = [];
    for (let i = 0, j = data.data.length; i < j; i += chunk) {
        temparray = data.data.slice(i, i + chunk);
        matrix.push(temparray);
    }

    return (
        <Canvas
            camera={{ position: [0, 4, 0], fov: 50 }}>
            <Controls
                enablePan
                enableZoom
                rotateSpeed={1}
            />
            {matrix.map((m, i) => <BarRow m={m} i={i} key={i} />)}
        </Canvas>
    );
}

export default Weather;