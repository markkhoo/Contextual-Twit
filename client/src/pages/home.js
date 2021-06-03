import Header from "../components/Header";
import React, { useState, useEffect } from "react";
import Chart_Vader from "../components/chart_vader/chart_vader";
import API from "../utils/API"
import "./home.css";

//loading
import { trackPromise } from "react-promise-tracker";
import { render } from "react-dom";
import { usePromiseTracker } from "react-promise-tracker";
import Loader from "react-loader-spinner";
//loading

function Home() {

    const [getinput, setInput] = useState({});
    const [getData, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    useEffect(() => {
        console.log(getData);
    }, [getData])

    const handleSetInput = (event) => {
        setInput({ thekey: event.target.value });
    };

//loading
const LoadingIndicator = props => {
    const {promiseInProgress} = usePromiseTracker();
    return (

        promiseInProgress &&

        <div className="wrapper">
            <div class="loading">   
                <Loader
                    type="Circles"
                    color="#f06292"
                    height={50}
                    width={50}
                    timeout={5000} //3 secs
                />
                <h4>&#x1F60a; Analysing your data</h4>
                <Loader
                    type="Circles"
                    color="#f06292"
                    height={50}
                    width={50}
                    timeout={5000} //3 secs
                />
            </div>
        </div> 
            
    );  
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        setIsLoading(true);
        trackPromise(
        API.searchTwit(getinput).then((res) => {
            setIsLoading(false)
            setData(res.data)
        })
        )      
};

    return (
        <div className="searchAndSubmit">
            <Header />
            <form
                className="searchForm"
                onSubmit={handleSubmit}
            >
                <input
                    type="text"
                    name="search"
                    placeholder="Search Twitter"
                    onChange={handleSetInput}
                    className="inputText"
                    aria-label="Recipient's username"
                    aria-describedby="button-addon2"
                />
                <button
                    type="submit"
                    value="Search Tweets"
                    className="buttonSearchSubmit"
                    id="button-addon2"
                >
                    <img src="search2.svg" alt="search button" />
                </button>
            </form>
            <div className="container">
            {
                !isLoading ?
                    <Chart_Vader data={getData} /> :
                    <LoadingIndicator />
            }
            </div>
           
        </div>
    )
};

export default Home;