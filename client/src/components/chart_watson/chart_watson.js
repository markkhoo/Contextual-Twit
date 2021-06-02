import { get } from 'mongoose';
import React, { useState, useEffect } from 'react';
import { Chart } from 'react-chartjs-2';
import './chart_watson.css';

function Chart_Watson(props) {
    const [getSet2, setSet2] = useState([]);
    const [getEmo50, setEmo50] = useState([]);
    const [getEmo75, setEmo75] = useState([]);


    useEffect(() => {
        const holdEmo50 = [];
        const holdEmo75 = [];

        getSet2.map((x) => {
            if (x.watson_tones) {
                x.watson_tones.map((y) => {


                });
            };
        });

        setEmo50(holdEmo50);
        setEmo75(holdEmo75);
    }, [getSet2]);

    useEffect(() => {
        setSet2(props.data);
    }, [props]);

    return (
        <div>

        </div>
    )
};

export default Chart_Watson;