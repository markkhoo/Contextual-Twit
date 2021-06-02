import React, { useState, useEffect } from 'react';
import { Bubble } from 'react-chartjs-2';
import './chart_vader.css';

function Chart_Vader() {
    const [getTest, setTest] = useState([
        {
            id: 8,
            created_at: 'Sun May 30 23:55:22 +0000 2021',
            id_str: '1399152484736667649',
            screen_name: 'hnsjhn_',
            followers_count: 1372,
            user_verified: false,
            is_quote_status: false,
            retweet_count: 34800,
            favorite_count: 0,
            hashtags: [],
            lang: 'en',
            text: 'RT @cynprel: ��Duality Cinematic Breakdown��  Earlier this week, Riot gave me the amazing opportunity to preview the new cinematic and ask…',
            watson_tones: [],
            vader_intensity: { neg: 0.128, neu: 0.638, pos: 0.234, compound: 0.4588 }
        },
        {
            id: 9,
            created_at: 'Sun May 30 23:55:21 +0000 2021',
            id_str: '1399152483205664769',
            screen_name: 'Krw1r',
            followers_count: 26,
            user_verified: false,
            is_quote_status: false,
            retweet_count: 122,
            favorite_count: 0,
            hashtags: [],
            lang: 'en',
            text: 'RT @ValorLeaks: How to redeem the Duality Player Card 101 | #VALORANT https://t.co/wTWsj4mRji',
            watson_tones: [],
            vader_intensity: { neg: -1, neu: 0, pos: 0, compound: -1 }
        }
    ]);
    // CHANGE THIS TO USE CONTEXT
    useEffect(() => {
        const holder = [];
        getTest.map((x) => {
            holder.push({
                x: new Date(Date.parse(x.created_at)),
                y: x.vader_intensity.compound,
                r: Math.log10(x.retweet_count) * 10
            });
        });
        setTest(holder);
    }, []);

    return (
        <div>
            <h1>Chart 1</h1>
            <div className="bubble">
                <Bubble
                    data={{
                        datasets: [{
                            label: 'First Dataset',
                            data: getTest,
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
        </div>
    )
}

export default Chart_Vader;