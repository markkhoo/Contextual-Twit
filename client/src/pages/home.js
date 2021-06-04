import Header from "../components/Header";
import React, { useState, useEffect, useContext } from "react";
import Chart_Vader from "../components/chart_vader/chart_vader";
import API from "../utils/API"
import "./home.css";
import axios from "axios"
//navbar dependencies
import { Link } from "react-router-dom";
import { MenuContext } from 'react-flexible-sliding-menu';
import "../components/Header.css";

//loading
import { trackPromise } from "react-promise-tracker";
import { render } from "react-dom";
import { usePromiseTracker } from "react-promise-tracker";
import Loader from "react-loader-spinner";
//loading

function Home(props) {

    const { toggleMenu } = useContext(MenuContext);



    const [getinput, setInput] = useState({});
    const [getData, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false); //sets the loading icon 

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


    function handleLogout(event) {

        axios.post("/api/logout")

            .then(function (response) {
                console.log(response)

            })
    }



    const handleSubmit = (event) => {
        event.preventDefault();
        setIsLoading(true);

        if (getinput.thekey === "") {
            console.log("no")
        }
        else {
            trackPromise( //tracks the promise to set the loading icon
                API.searchTwit(getinput).then((res) => {
                    setIsLoading(false)
                    setData(res.data)
                })
            )
        }


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
            <div className="container">
                <div className="row">
                    <div className="col s3">
                        <ul class="collection with-header">
                            <li class="collection-header"><h4>Trending on Twitter</h4></li>
                            <li class="collection-item">Alvin</li>
                            <li class="collection-item">Alvin</li>
                            <li class="collection-item">Alvin</li>
                            <li class="collection-item">Alvin</li>
                            <li class="collection-item">Alvin</li>
                            <li class="collection-item">Alvin</li>
                            <li class="collection-item">Alvin</li>
                            <li class="collection-item">Alvin</li>
                            <li class="collection-item">Alvin</li>
                            <li class="collection-item">Alvin</li>
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