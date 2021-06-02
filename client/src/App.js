import React, {Component} from "react";
// import { Route } from "react-router-dom";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./pages/home";
import Login from "./pages/login";
import Loader from "react-loader-spinner";


function App() {
  return (
    <div>
      {/* <Loader
        type="Puff"
        color="#00BFFF"
        height={100}
        width={100}
        timeout={3000} //3 secs
      /> */}
      <Router>
        <div>
          <Route exact path="/" component={Home} />
          <Route exact path="/home" component={Home} />
          <Route exact path="/login" component={Login} />
        </div>
      </Router>
    </div>

  );
}


export default App;
