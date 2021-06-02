import Header from "../components/Header";
import React, { useState, useEffect } from "react";
import Chart_Vader from "../components/chart_vader/chart_vader";
import API from "../utils/API";


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
        <div className="row">
            <div class="col sm12">   
                <Loader
                    type="Circles"
                    color="#f06292"
                    height={50}
                    width={50}
                    timeout={3000} //3 secs
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

    // render(
    //   <div>
    //     <App />
    //     <LoadingIndicator />
    //   </div>,
    //   document.getElementById('root'));
    //loading





    //loading
    const handleSubmit = (event) => {
        event.preventDefault();
        setIsLoading(true);
        trackPromise(//loading----TRACKS THE PROMISE
            API.searchTwit(getinput).then((res) => {
                setIsLoading(false)
                setData(res.data);
            })
        )
    };

    return (
        <div className="searchAndSubmit">
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