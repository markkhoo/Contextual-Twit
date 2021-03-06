import React, {useContext} from 'react';
import { Link } from "react-router-dom";
import { MenuContext } from 'react-flexible-sliding-menu';
import "./menu.css";

const MenuIndex = () => {
    const { toggleMenu } = useContext(MenuContext);

    return (
        <div className="menu">
            <button className="buttonClose" onClick={toggleMenu} >
                x
            </button>
            <ul>
                {/* adds home button to hamburger */}
                {/* <li>
                <Link
                    to="/"
                    onClick={toggleMenu}
                >
                    Home
                </Link>
                </li> */}
                <li>
                <Link
                    to="/login"
                    onClick={toggleMenu}
                >
                    Logout
                </Link>
                </li>
            </ul>
        </div>
    )
}
export default MenuIndex;