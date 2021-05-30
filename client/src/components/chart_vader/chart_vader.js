import React, { useState, useEffect } from 'react';
import { Bubble } from 'react-chartjs-2';
import './chart_vader.css';

function Chart_Vader(props) {
    const [getData, setData] = useState({});
    const [getTest, setTest] = useState(0);

    useEffect(() => {
        setTest( Date.parse('Sun May 30 00:54:20 +0000 2021' )); // nonstandard date string
        console.log(getTest);
    }, [getTest]);

    return (
        <div>
            <h1>Chart 1</h1>
            <Bubble
                data={{
                    datasets: [{
                        label: 'First Dataset',
                        data: [{
                            x: Date.parse('Sun May 30 00:54:20 +0000 2021'),
                            y: -0.75,
                            r: 15
                        }, {
                            x: Date.parse('Sun May 30 00:53:16 +0000 2021'),
                            y: .9,
                            r: 10
                        }],
                        backgroundColor: 'rgb(255, 99, 132)'
                    }]
                }}
                height={400}
                width={600}
                options={{
                    maintainAspectRatio: true,
                    scales: {
                        xAxes: [
                            {
                                type: 'time',
                                time: {
                                    displayFormats: {
                                        quarter: 'MMM YYYY'
                                    }
                                }
                            }
                        ],
                        yAxes: [
                            {
                                ticks: {
                                    min: -1,
                                    max: 1
                                }
                            }
                        ]
                    }
                }}
            />
        </div>
    )
}

export default Chart_Vader;