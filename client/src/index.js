import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import MenuProvider from 'react-flexible-sliding-menu';
import MyMenu from './components/MyMenu';
import { BrowserRouter as Router } from "react-router-dom";

import { trackPromise } from "react-promise-tracker";
import { render } from "react-dom";
import { usePromiseTracker } from "react-promise-tracker";
import Loader from "react-loader-spinner";

ReactDOM.render(
<Router>
    <MenuProvider MenuComponent={MyMenu}>
        <App />
    </MenuProvider>
</Router>, document.getElementById("root"));
