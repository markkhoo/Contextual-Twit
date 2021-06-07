import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';

function Chart_Watson(props) {
    const [getSet2, setSet2] = useState([]);
    const [getLabel, setLabel] = useState([]);
    const [getEmo50, setEmo50] = useState([]);
    const [getEmo75, setEmo75] = useState([]);

    useEffect(() => {
        const holdLabel = [];
        const holdEmo50 = [];
        const holdEmo75 = [];

        getSet2.map((x) => {
            if (x.watson_tones) {
                x.watson_tones.map((y) => {
                    if (!holdLabel.includes(y.tone_name)) {
                        holdLabel.push(y.tone_name);
                        holdEmo50.push(0);
                        holdEmo75.push(0);
                    };

                    let scoreIndex = 0;
                    if (holdLabel.indexOf(y.tone_name) >= 0) {
                        scoreIndex = holdLabel.indexOf(y.tone_name);

                        holdEmo50[scoreIndex] += 1;

                        if (y.score >= 0.750000) {
                            holdEmo75[scoreIndex] += 1;
                        }
                    };
                });
            };
        });

        setLabel(holdLabel);
        setEmo50(holdEmo50);
        setEmo75(holdEmo75);
    }, [getSet2]);

    useEffect(() => {
        setSet2(props.data);
    }, [props]);

    return (
        <div className="chart">
            <h2 className="content_title">Tone Totals</h2>
            <Bar
                data={{
                    labels: getLabel,
                    datasets: [{
                        label: 'Tones with CI over 0.50',
                        data: getEmo50,
                        backgroundColor: 'rgba(54, 162, 235, 0.2)',
                        borderColor: 'rgb(54, 162, 235)',
                        borderWidth: 1
                    },
                    {
                        label: 'Tones with CI over 0.75',
                        data: getEmo75,
                        backgroundColor: 'rgba(255, 159, 64, 0.2)',
                        borderColor: 'rgb(255, 159, 64)',
                        borderWidth: 1
                    }]
                }}
                height={400}
                width={600}
                options={{
                    maintainAspectRatio: true,
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }}
            />
        </div>
    )
};

export default Chart_Watson;