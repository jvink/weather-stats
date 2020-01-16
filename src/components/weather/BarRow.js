import React, { useRef, useEffect } from 'react';
import Bar from './Bar';
import colormap from 'colormap';
import { Dom } from 'react-three-fiber';

let colors = colormap({
    colormap: 'jet',
    nshades: 30,
    format: 'hex',
    alpha: 1
});

function BarRow({ m, i }) {
    const ref = useRef();

    useEffect(() => {
        ref.current.rotation.x = 270 * (Math.PI / 180);
    }, []);

    return (
        <group key={i}>
            {i === 0 && m.map((month, index) => <Dom key={index} position={[-0.2, 0, index / 4]}>{month.month.split('-')[1]}</Dom>)}
            <group ref={ref} position={[i / 20, 0, 0]}>
                <Dom position={[i / 2, 0 + 0.4, 0]}>{m[0].month.split('-')[0]}</Dom>
                {m.map((z, j) => <Bar key={j} i={i} j={j} z={z} color={colors[Math.round(z.temperature_mean) + 5]} />)}
            </group>
        </group>
    );
}

export default BarRow;