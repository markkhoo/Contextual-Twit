import React, { useState, useEffect } from 'react';
import './data_container.css';

function Data_Container(props) {
    const [getSet4, setSet4] = useState([]);
    const [getDatR, setDatR] = useState([]);

    useEffect(() => {
        const allRows = [];

        getSet4.map((x) => {
            let created_at = x.created_at;
            let is_quote = x.is_quote_status;
            let is_varif = x.user_verified;
            let retweet_count = x.retweet_count;
            let vader_pos = x.vader_intensity.pos;
            let vader_neu = x.vader_intensity.neu;
            let vader_neg = x.vader_intensity.neg;
            let vader_com = x.vader_intensity.compound;
            const watson_tones = [];
            const hashtags = [];
            const user = x.screen_name;
            let link = `https://twitter.com/${x.screen_name}/status/${x.id_str}`;
            let text = x.text;

            x.watson_tones.map((y) => {
                watson_tones.push(
                    ` [${y.tone_name}:${y.score}]`
                )
            });

            x.hashtags.map((z) => {
                hashtags.push(
                    ` #${z.text}`
                );
            });

            allRows.push({
                key: x.id_str,
                created_at: created_at,
                is_quote: is_quote,
                is_varif: is_varif,
                retweet_count: retweet_count,
                vader_pos: vader_pos,
                vader_neu: vader_neu,
                vader_neg: vader_neg,
                vader_com: vader_com,
                watson_tones: watson_tones.toString(),
                hashtags: hashtags.toString(),
                user: user,
                link: link,
                text: text
            });

        });

        setDatR(allRows);

    }, [getSet4]);

    useEffect(() => {
        setSet4(props.data);
    }, [props]);

    return (
        <div>
            <h2 className="content_title">Raw Tweets</h2>
            <table className="tweet_table">
                <thead>
                    <tr>
                        <th>Date Created</th>
                        <th>Is Quote Status</th>
                        <th>Is from Verified</th>
                        <th>Total Retweets</th>
                        <th>Vader Positive Score</th>
                        <th>Vader Neutral Score</th>
                        <th>Vader Negative Score</th>
                        <th>Vader Compound Score</th>
                        <th>Watson Tones</th>
                        <th>Hashtags</th>
                        <th>User</th>
                        <th>Link</th>
                        <th>Analyzed Text</th>
                    </tr>
                </thead>
                <tbody>
                    {getDatR.map(i => {
                        return (
                            <tr key={i.key}>
                                <td>{i.created_at}</td>
                                <td>{i.is_quote ? "✔️" : ""}</td>
                                <td>{i.is_varif ? "✔️" : ""}</td>
                                <td>{i.retweet_count}</td>
                                <td>{i.vader_pos}</td>
                                <td>{i.vader_neu}</td>
                                <td>{i.vader_neg}</td>
                                <td>{i.vader_com}</td>
                                <td>{i.watson_tones}</td>
                                <td>{i.hashtags}</td>
                                <td>{i.user}</td>
                                <td><a
                                    href={i.link}
                                    target="_blank"
                                    rel="noreferrer noopener"
                                >go to tweet</a></td>
                                <td>{i.text}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
};

export default Data_Container;