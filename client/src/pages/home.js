import Header from "../components/Header";
import React, { useState, useEffect } from "react";
import Chart_Vader from "../components/chart_vader/chart_vader";
import API from "../utils/API"
import "./home.css";
import axios from "axios"

//loading
import { trackPromise } from "react-promise-tracker";
import { render } from "react-dom";
import { usePromiseTracker } from "react-promise-tracker";
import Loader from "react-loader-spinner";
//loading

function Home(props) {

    const [getinput, setInput] = useState({});
    const [getData, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false); //sets the loading icon 
    const [trending, setTrending] = useState(null);

    useEffect(() => {
        loadTrending()
    }, [])
    function loadTrending() {
        API.searchTrending()
            .then(tweets => {
                console.log("***tweets", tweets)
                setTrending(tweets.data)
            })
            .catch(err => console.log(err));
    }
    useEffect(() => {
        console.log(getData);
        
        console.log(props.location.state);

    }, [])

    const handleSetInput = (event) => {
        setInput({ thekey: event.target.value });
    };

    //This function triggers the loading icon
    const LoadingIndicator = props => {
        const { promiseInProgress } = usePromiseTracker();
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

    
    // function handleLogout (event) {
    //     event.preventDefault()

    //     axios.post("/api/logout")
    //         .then(function (response) {
    //             console.log(response)
                
    //         })
    //     console.log(login1, login2, login3)
    // }



    const handleSubmit = (event) => {
        event.preventDefault();
        setIsLoading(true);
        trackPromise( //tracks the promise to set the loading icon
            API.searchTwit(getinput).then((res) => {
                setIsLoading(false)
                setData(res.data)
            })
        )
    };

    const renderTweetCollection = () => {
        let result = null;

        if (trending) {
            result = trending.map((tweet) => {
                return (
                    <div>
                        <li className="collection-item">{tweet.screen_name}</li>
                        <li className="collection-item">{tweet.created_at}</li>
                        <li className="collection-item">{tweet.text}</li>

                    </div>
                )
            });
        }

        return result;
    }

    return (
        <div className="searchAndSubmit">
            <Header  />
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
                <div className="row">
                    <div className="col s3">
                        <ul className="collection with-header">
                            <li className="collection-header"><h4>Trending on Twitter</h4></li>
                            {renderTweetCollection()}
                            
                        </ul>
                    </div>
                    <div className="col s9">
                        {
                            !isLoading ?
                                <Chart_Vader data={getData} /> :
                                <LoadingIndicator />
                        }
                    </div>
                </div>
            </div>

        </div>
    )
};

export default Home;