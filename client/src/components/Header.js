import React from "react";
import { Link } from "react-router-dom";
//import "./Header.css";

function Header(props) {
    return (
        <div>
            <div className="jumbotron jumbotron-fluid text-center">
                <div className="container">
                    <h1 className="display-4">Welcome to Contextual Twit</h1>
                    <p className="lead">Search twitter and let us analyze its meaning!!</p>
                </div>
            </div>
            <nav>

                <div className="nav-wrapper">

                    <a href="#" data-target="mobile-demo" className="sidenav-trigger"><i className="material-icons">menu</i></a>
                    <ul className="right hide-on-med-and-down">
                        <li>
                        <Link
                            to="/"
                            className={
                                window.location.pathname === "/" || window.location.pathname === "/home"
                                    ? "nav-link active"
                                    : "nav-link"
                            }
                        >
                            Home
                        </Link>
                        </li>
                        <li>
                        <Link
                            to="/login"
                            className={
                                window.location.pathname === "/login" || window.location.pathname === "/login"
                                    ? "nav-link active"
                                    : "nav-link"
                            }
                        >
                            Login
                        </Link>
                        </li>
                        <li>
                        <Link
                            to="/logout"
                            className={
                                window.location.pathname === "/logout" || window.location.pathname === "/logout"
                                    ? "nav-link active"
                                    : "nav-link"
                            }
                        >
                            Logout
                        </Link>
                        </li>
                    </ul>
                </div>
            </nav>

            <ul className="sidenav" id="mobile-demo">
                <li><a href="sass.html">Sass</a></li>
                <li><a href="badges.html">Components</a></li>
                <li><a href="collapsible.html">Javascript</a></li>
                <li><a href="mobile.html">Mobile</a></li>
            </ul>
        </div>
    )
};

export default Header;