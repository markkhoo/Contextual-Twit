import React, { useState, useEffect } from 'react';
import { Bubble } from 'react-chartjs-2';
import './chart_vader.css';
import moment from 'moment';

//loading
import { trackPromise } from "react-promise-tracker";
import { render } from "react-dom";
import { usePromiseTracker } from "react-promise-tracker";
import Loader from "react-loader-spinner";
//loading

function Chart_Vader(props) {
    const [getDat1, setDat1] = useState([]);
    const [getSet1, setSet1] = useState([]);

    useEffect(() => {
        const holder = [];
        getSet1.map((x) => {
            holder.push({
                x: new Date(Date.parse(x.created_at)),
                y: x.vader_intensity.compound,
                r: Math.max(Math.log10(x.retweet_count) * 10 , 3)
            });
        });
        setDat1(holder);
        console.log("****--")
        console.log(getDat1)
    }, [getSet1]);

    useEffect(() => {
        setSet1(props.data);
    },[props]);

    //loading
    //  const LoadingIndicator = props => {
    //     const {promiseInProgress} = usePromiseTracker();
    //     return (
            
    //         promiseInProgress &&
    //     <div>
    //         <h5>Hey some async call in progress ! </h5>
    //             <Loader
    //                 type="Bars"
    //                 color="#10BFFF"
    //                 height={100}
    //                 width={100}
    //                 timeout={5000} //3 secs
    //             />
    //     </div>        
    //     );  
    //     }
    //loading

    return (
        <div className='vaderChart'>
            <h2>Polarity Score</h2>
            
            <Bubble
                data={{
                    datasets: [{
                        label: 'First Dataset',
                        data: getDat1,
                        backgroundColor: 'rgb(255, 99, 132)',
                        borderWidth: 3
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
                                        second: 'h:mm:ss a'
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