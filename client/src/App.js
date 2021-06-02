import React, {Component} from "react";
// import { Route } from "react-router-dom";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./pages/home";
import Login from "./pages/login";

const App = () => {
  return (
    <div>
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
