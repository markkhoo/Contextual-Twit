import React, {useContext} from "react";
import { MenuContext } from 'react-flexible-sliding-menu';
import "./Header.css";

function Header(props) {
    const { toggleMenu } = useContext(MenuContext);
    return (
        <div>
            <div className="jumbotron jumbotron-fluid text-center">
                <div className="container">
                    <img src="logo2.png" alt="logo" />
                    <p className="lead">Search twitter and let us analyze its meaning!!</p>
                </div>
            </div>
            <nav>
                <div className="nav-wrapper">
                    <div className="hamburger-box" onClick={toggleMenu}>
                        <div className="hamburger-inner"></div>
                    </div>
                    <ul className="hide-on-med-and-down">
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