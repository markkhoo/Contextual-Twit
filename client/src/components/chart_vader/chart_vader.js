import React, { useState, useEffect } from 'react';
import { Bubble } from 'react-chartjs-2';
import './chart_vader.css';

function Chart_Vader(props) {
    const [getDat1, setDat1] = useState([]);
    const [getTest, setTest] = useState([]);

    useEffect(() => {
        const holder = [];
        getTest.map((x) => {
            holder.push({
                x: new Date(Date.parse(x.created_at)),
                y: x.vader_intensity.compound,
                r: Math.max(Math.log10(x.retweet_count) * 10 , 3)
            });
        });
        setDat1(holder);
    }, [getTest]);

    useEffect(() => {
        setTest(props.data);
    },[props]);

    return (
        <div>
            <h1>Chart 1</h1>
            <Bubble
                data={{
                    datasets: [{
                        label: 'First Dataset',
                        data: getDat1,
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
                                // time: {
                                //     displayFormats: {
                                //         second: 'h:mm:ss a'
                                //     }
                                // }
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