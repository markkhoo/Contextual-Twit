import Header from "../components/Header";
import React, { useState, useEffect } from "react";
import Chart_Vader from "../components/chart_vader/chart_vader";
import API from "../utils/API"

//loading
import { trackPromise } from "react-promise-tracker";
//loading

function Home() {

    const [getinput, setInput] = useState({});
    const [getData, setData] = useState([]);

    useEffect(() => {
        console.log(getData);
    }, [getData])

    const handleSetInput = (event) => {
        setInput({ thekey: event.target.value });
    };

    //loading
    
    //loading
    const handleSubmit = (event) => {
        event.preventDefault();
        trackPromise(//loading----TRACKS THE PROMISE
        API.searchTwit(getinput).then((res) => {
            setData(res.data);
        //});
    }))};

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
        </div>
    )
};

export default Home;