import React, { useRef, useState } from 'react';
import { Dom } from 'react-three-fiber';
import { a, useSpring } from 'react-spring/three';

function Bar({ z, i, j, color }) {
    const ref = useRef();
    const [hover, setHover] = useState(false);
    const factor = 20;
    const hoverStyle = useSpring({
        scale: hover ? [2, 2, 1] : [1, 1, 1]
    });
    const handleHover = () => {
        setHover(true);
        setTimeout(() => {
            setHover(false);
        }, 1000);
    };

    if (z.temperature_mean !== null) {
        return (
            <a.mesh scale={hoverStyle.scale} ref={ref} key={j} position={[(i / 2), j / -4, z.temperature_mean / (factor * 2)]} onPointerOver={handleHover}>
                {hover && <Dom><span style={{ fontSize: 8, marginTop: j / -4 }}>{z.temperature_mean}</span></Dom>}
                <meshBasicMaterial attach="material" color={color} />
                <boxBufferGeometry attach="geometry" args={[0.1, 0.1, z.temperature_mean / factor]} />
            </a.mesh>
        );
    } else {
        return <></>;
    }
}

export default Bar;