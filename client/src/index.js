import React from "react";
import ReactDOM from "react-dom"; //uncomment if loading fails
import App from "./App";

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