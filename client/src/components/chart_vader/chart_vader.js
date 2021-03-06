import React, { Fragment, useState, useEffect } from 'react';
import { Bubble } from 'react-chartjs-2';
import './chart_vader.css';

function Chart_Vader(props) {
    const [getDat1, setDat1] = useState([]);
    const [getSet1, setSet1] = useState([]);

    useEffect(() => {
        const holder = [];
        getSet1.map((x) => {
            holder.push({
                x: new Date(Date.parse(x.created_at)),
                y: x.vader_intensity.compound,
                r: Math.max(Math.log10(x.retweet_count) * 10, 3)
            });
        });
        setDat1(holder);
    }, [getSet1]);

    useEffect(() => {
        setSet1(props.data);
    }, [props]);

    return (
        <Fragment>
        <h2 className="content_title">Polarity and Engagement</h2>
        <div className="chart">
            <div className="bubble">
                <Bubble
                    data={{
                        datasets: [{
                            label: 'Most Recent Tweets',
                            data: getDat1,
                            backgroundColor: 'rgb(255, 99, 132)'
                        }]
                    }}
                    height={400}
                    width={600}
                    options={{
                        maintainAspectRatio: true,
                        scales: {
                            y: [
                                {
                                    ticks: {
                                        min: -1,
                                        max: 1
                                    }
                                }
                            ],
                            x: {
                                ticks: {
                                    // Time in Axes
                                    callback: function (value, index, values) {
                                        return (
                                            new Date(value)
                                        );
                                    }
                                }
                            }
                        }
                    }}
                />
            </div>
        </div>
    </Fragment>
    )
};

export default Chart_Vader;