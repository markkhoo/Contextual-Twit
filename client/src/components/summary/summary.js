import React, { useState, useEffect } from 'react';
import './summary.css';

function Summary(props) {
    const [getSet3, setSet3] = useState([]);
    const [getCoun, setCoun] = useState([]);
    const [getVeri, setVeri] = useState([]);
    const [getPosC, setPosC] = useState([]);
    const [getNeuC, setNeuC] = useState([]);
    const [getNegC, setNegC] = useState([]);

    useEffect(() => {
        setSet3(props.data);
    }, [props]);

    useEffect(() => {
        let tweetCount = 0;
        let verifiedCount = 0;
        let posCount = 0;
        let neuCount = 0;
        let negCount = 0;

        getSet3.map((x) => {
            tweetCount += 1;

            if (x.user_verified) {
                verifiedCount += 1;
            };

            if (x.vader_intensity.compound > 0.050) {
                posCount += 1;
            } else if (x.vader_intensity.compound < -0.050) {
                negCount += 1;
            } else {
                neuCount += 1;
            };
        });

        setCoun(tweetCount);
        setVeri(verifiedCount);
        setPosC(posCount);
        setNeuC(neuCount);
        setNegC(negCount);
    }, [getSet3]);

    return (
        <div>
            <h2 className="content_title">Summary Stats</h2>
            <p>Total Tweets fetched: {getCoun}</p>
            <p>Tweets from verified accounts: {getVeri}</p>
            <p>Positive Tweets: {getPosC}</p>
            <p>Neutral Tweets: {getNeuC}</p>
            <p>Negative Tweets: {getNegC}</p>
        </div>
    )
};

export default Summary;