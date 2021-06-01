import Header from "../components/Header";
import React, { useState } from "react";
import Chart_Vader from "../components/chart_vader/chart_vader";
import API from "../utils/API"

function Home() {

    const [input, setInput] = useState("");
    const [twit, setTwit] = useState([]);
    
    function handleTwitSearch() {
        //get twit data from server route
        API.searchTwit(input).then((res) => {
            setTwit(res.data)
            console.log("*******---", res)
        });
    };

    const handleSetInput = (event) => {
        console.log("*********input", event.target.value);
        setInput(event.target.value)
      }

    return (

        <div>
            <Header />
            <div className="input-group mb-3">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Search Twitter"
                    aria-label="Recipient's username"
                    aria-describedby="button-addon2"
                    onChange={handleSetInput}
                />
                <div className="input-group-append">
                    <button onClick={handleTwitSearch} className="btn btn-outline-secondary" type="button" id="button-addon2">Search Twitter</button>
                </div>
            </div>
            <Chart_Vader />

        </div>
    )
}

export default Home;