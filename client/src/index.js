import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import MenuProvider from 'react-flexible-sliding-menu';
import MyMenu from './components/MyMenu';
import { BrowserRouter as Router } from "react-router-dom";

ReactDOM.render(
<Router>
    <MenuProvider MenuComponent={MyMenu}>
        <App />
    </MenuProvider>
</Router>, document.getElementById("root"));
