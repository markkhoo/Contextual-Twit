import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./pages/home";
import Login from "./pages/login";

const App = () => {
  return (
    <div>
      {/* <Router> */}
      <div>
        <Route exact path="/" component={Login} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/home" component={Home} />
      </div>
      {/* </Router> */}
    </div>

  );
}


export default App;
