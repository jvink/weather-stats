import React, { useEffect, useState } from 'react';
import { useGeolocation } from 'react-use';
import { Link } from 'react-router-dom';
import { DatePicker } from 'antd';
import moment from 'moment';

const { RangePicker } = DatePicker;

function Station() {
    const [data, setData] = useState({ meta: undefined, data: [] });
    const [mode, setMode] = useState(['month', 'month']);
    const [value, setValue] = useState([]);
    const geo = useGeolocation();

    useEffect(() => {
        if (!geo.loading && !geo.error) {
            const fetchData = async () => {
                const res = await fetch(`https://api.meteostat.net/v1/stations/nearby?lat=${geo.latitude}&lon=${geo.longitude}&limit=5&key=dPTiJZzl`);
                const data = await res.json();
                setData(data);
            };
            fetchData();
        }
    }, [geo]);

    const handlePanelChange = (value, mode) => {
        setValue(value);
        setMode([mode[0] === 'date' ? 'month' : mode[0], mode[1] === 'date' ? 'month' : mode[1]]);
    };

    const handleChange = value => {
        setValue(value);
    };

    return (
        <div style={{ display: "flex", height: "100%", justifyContent: "center", alignItems: "center" }}>
            {geo.error?.code === 1 && <span>Please allow geolocation</span>}
            {(value.length > 0 && geo.loading) && <span>Loading...</span>}
            <div style={{ display: "flex", flexDirection: "column" }}>
                <div>
                    <h2>
                        {value.length === 0 ? "Choose months:" : "Pick a weather station:"}
                    </h2>
                </div>
                <div style={{ marginBottom: "1em" }}>
                    {value.length > 0 && data.data.map(s => (
                        <div key={s.id}>
                            <Link to={`weather/${s.id}${value.length === 0 ? "" : `?from=${moment(value[0]).toISOString()}&until=${moment(value[1]).toISOString()}`}`}>
                                {s.name} ({s.distance} km.)
                            </Link>
                        </div>
                    ))}
                </div>
                <RangePicker
                    autoFocus
                    defaultPickerValue={[moment('01-2010', "MM-YYYY"), moment('01-2015', "MM-YYYY")]}
                    placeholder={['Start month', 'End month']}
                    format="MM-YYYY"
                    value={value}
                    mode={mode}
                    onChange={handleChange}
                    onPanelChange={handlePanelChange}
                />
            </div>
        </div>
    );
}

export default Station;