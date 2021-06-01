
import React from "react";
import Chart_Vader from "./components/chart_vader/chart_vader";
import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./pages/home";
import Login from "./pages/login";



function App() {
  return (
  <>  
      <div className="App">

        <div className="App-header">
        
          <Chart_Vader />
      <Router>
        <div>
        
          <Route exact path="/" component={Home} />
          <Route exact path="/home" component={Home} />
          <Route exact path="/login" component={Login} />
        </div>
      </Router>
    </div>
</>
  );
}


export default App;
