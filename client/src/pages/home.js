import Header from "../components/Header";
import React, { useState, useEffect } from "react";
import Chart_Vader from "../components/chart_vader/chart_vader";
import Chart_Watson from "../components/chart_watson/chart_watson";
import API from "../utils/API"

function Home() {

    const [getinput, setInput] = useState({});
    const [getData, setData] = useState([]);

    useEffect(() => {
        console.log(getData);
    }, [getData])

    const handleSetInput = (event) => {
        setInput({ thekey: event.target.value });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        API.searchTwit(getinput).then((res) => {
            setData(res.data)
        });
    };

    return (
        <div>
            <Header />
            <form
                className="input-group mb-3"
                onSubmit={handleSubmit}
            >
                <input
                    type="text"
                    name="search"
                    placeholder="Search Twitter"
                    onChange={handleSetInput}
                    className="form-control"
                    aria-label="Recipient's username"
                    aria-describedby="button-addon2"
                />
                <input
                    type="submit"
                    value="Search Tweets"
                    className="btn btn-outline-secondary"
                    id="button-addon2"
                />
            </form>
            <Chart_Vader data={getData}/>
            <Chart_Watson data={getData}/>
        </div>
    )
};

export default Home;