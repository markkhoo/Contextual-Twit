import Header from "../components/Header";
import React, { useState, useEffect, useContext } from "react";
import Summary from "../components/summary/summary";
import Chart_Vader from "../components/chart_vader/chart_vader";
import Chart_Watson from "../components/chart_watson/chart_watson";
import Data_Container from "../components/data_container/data_container";
import API from "../utils/API"
import "./home.css";
import axios from "axios"

import { Link } from "react-router-dom";
import { MenuContext } from 'react-flexible-sliding-menu';
import "../components/Header.css";

//loading
import { trackPromise } from "react-promise-tracker";
// import { render } from "react-dom";
import { usePromiseTracker } from "react-promise-tracker";
import Loader from "react-loader-spinner";
//loading

function Home(props) {

    const { toggleMenu } = useContext(MenuContext);
    const [getinput, setInput] = useState({});
    const [getData, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false); //sets the loading icon 
    const [trending, setTrending] = useState(null);

    useEffect(() => {
        loadTrending()
    }, []);

    const loadTrending = () => {
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

    function handleLogout(event) {
        // event.preventDefault()
        axios.post("/api/logout")

            .then(function (response) {
                console.log(response)

            })
    }
    //This function triggers the loading icon
    const LoadingIndicator = props => {
        const { promiseInProgress } = usePromiseTracker();
        return (
            promiseInProgress &&
            <div className="wrapper">
                <div className="loading">
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
        };
//renders the trending tweets    
    const renderTweetCollection = () => {
        let result = null;
        if (trending) {
            result = trending.map((tweet) => {
                return (
                    <div>
                        <ul>
                            <li className="collection-item avatar">
                                <h5><i className="fab fa-twitter"></i>
                                {tweet.screen_name} </h5>
                                <br></br>
                                <p> { tweet.created_at} <br/>
                                <br></br>
                                    { tweet.text}
                                </p>                                
                            </li>
                        </ul>
                    </div>
                )
            });
        }
        return result;
    };
    return (
        <div className="searchAndSubmit">
              <div>
                <div className="jumbotron jumbotron-fluid text-center">
                    <div className="container">
                        {/* <h1 className="display-4">Welcome to Contextual Twit</h1> */}
                        <img src="logo2.png" alt="logo" />
                        <p className="lead">Search twitter and let us analyze its meaning!!</p>
                    </div>
                </div>
                <nav>
                    <div className="nav-wrapper">
                        <div className="hamburger-box" onClick={toggleMenu}>
                            <div className="hamburger-inner"></div>
                        </div>
                        {/* <a href="#" data-target="mobile-demo" className="sidenav-trigger"><i className="material-icons">menu</i></a> */}
                        <ul className="hide-on-med-and-down">
                            <li>
                                <Link
                                    to="/"
                                    className={
                                        window.location.pathname === "/" || window.location.pathname === "/home"
                                            ? "nav-link active"
                                            : "nav-link"
                                    }
                                >
                                    Home
                        </Link>
                            </li>

                            <li>
                                <Link
                                    onClick={handleLogout}
                                    to="/login"
                                    className={
                                        window.location.pathname === "/login" || window.location.pathname === "/logout"
                                            ? "nav-link active"
                                            : "nav-link"
                                    }
                                >
                                    Logout
                        </Link>
                            </li>
                        </ul>
                    </div>
                </nav>

                <ul className="sidenav" id="mobile-demo">
                    <li><a href="sass.html">Sass</a></li>
                    <li><a href="badges.html">Components</a></li>
                    <li><a href="collapsible.html">Javascript</a></li>
                    <li><a href="mobile.html">Mobile</a></li>
                </ul>
            </div>
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
            <div className="content">
                <div className="content_left">
                    <h2 className="content_title">Trending on Twitter</h2>
                    <div className="collection with-header">
                        {/* <li className="collection-header"></li> */}
                        {renderTweetCollection()}

                    </div>
                </div>
                <div className="content_right">
                    {
                        !isLoading ?
                            <>
                                <div className="summary">
                                    <Summary data={getData} />
                                </div>
                                <div className="chart_vader">
                                    <Chart_Vader data={getData} />
                                </div>
                                <div className="chart_watson">
                                    <Chart_Watson data={getData} />
                                </div>
                            </> :
                            <LoadingIndicator />
                    }
                </div>
                <div className="content_bottom">
                    <div className="data_container">
                        <h2 className="content_title">Raw Tweets</h2>
                        <Data_Container data={getData} />
                    </div>
                </div>
            </div>

        </div>
    )
};

export default Home;