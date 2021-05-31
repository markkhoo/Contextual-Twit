import React from "react";
//import { Link } from "react-router-dom";
//import "./Header.css";

function Header(props) {
    return (
        <div>
            <div class="jumbotron jumbotron-fluid text-center">
                <div class="container">
                    <h1 class="display-4">Welcome to Contextual Twit</h1>
                    <p class="lead">Search twitter and let us analyze its meaning!!</p>
                </div>
            </div>
            <nav>
               
               <div class="nav-wrapper">

                   <a href="#" data-target="mobile-demo" class="sidenav-trigger"><i class="material-icons">menu</i></a>
                   <ul class="right hide-on-med-and-down">
                       <li><a href="sass.html">Sass</a></li>
                       <li><a href="badges.html">Components</a></li>
                       <li><a href="collapsible.html">Javascript</a></li>
                       <li><a href="mobile.html">Mobile</a></li>
                   </ul>
               </div>
           </nav>

           <ul class="sidenav" id="mobile-demo">
               <li><a href="sass.html">Sass</a></li>
               <li><a href="badges.html">Components</a></li>
               <li><a href="collapsible.html">Javascript</a></li>
               <li><a href="mobile.html">Mobile</a></li>
           </ul>
        </div>
    )
};

export default Header;