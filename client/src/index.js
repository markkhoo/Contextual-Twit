import React from "react";
import ReactDOM from "react-dom"; //uncomment if loading fails
import App from "./App";
import MenuProvider from 'react-flexible-sliding-menu';
import MyMenu from './components/MyMenu';
import { BrowserRouter as Router } from "react-router-dom";

//loading
// import { render } from "react-dom";
// import { usePromiseTracker } from "react-promise-tracker";
// import Loader from "react-loader-spinner";
//loading

ReactDOM.render(<App />, document.getElementById("root")); //uncomment if loading fails

//loading
// const LoadingIndicator = props => {
//     const {promiseInProgress} = usePromiseTracker();
//     return (
        
//         promiseInProgress &&
//     <div>
//         <h5>Hey some async call in progress ! </h5>
//             <Loader
//                 type="Puff"
//                 color="#00BFFF"
//                 height={100}
//                 width={100}
//                 timeout={3000} //3 secs
//             />
//     </div>        
//     );  
//     }
    
//     render(
//       <div>
//         <App />
//         <LoadingIndicator />
//       </div>,
//       document.getElementById('root'));
//loading