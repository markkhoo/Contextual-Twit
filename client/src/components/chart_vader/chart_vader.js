import React, { useState, useEffect } from 'react';
import { Bubble } from 'react-chartjs-2';
import './chart_vader.css';

function Chart_Vader(props) {
    const [getData, setData] = useState({});

    useEffect(() => {

    }, [])

    return (
        <div>
            <h1>Chart 1</h1>
            <Bubble
                data={{
                    datasets: [{
                        label: 'First Dataset',
                        data: [{
                            x: 20,
                            y: 30,
                            r: 15
                        }, {
                            x: 40,
                            y: 10,
                            r: 10
                        }],
                        backgroundColor: 'rgb(255, 99, 132)'
                    }]
                }}
                height={400}
                width={600}
                options={{
                    maintainAspectRatio: true
                }}
            />
        </div>
    )
}

export default Chart_Vader;