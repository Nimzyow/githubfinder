import React from 'react'
import PropTypes from 'prop-types';
import {Link} from "react-router-dom";

const NavBar = (props) => {

    return (
        <nav className={"navbar bg-primary"}>
            <h1>
                <i className={props.icon} /> {props.title}
            </h1>
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/about">About</Link>
                </li>
            </ul>
        </nav>
    )
}

 //the below static defaultProps will enable it so that if title and icon arent passed as prop from App.js, that the below two title and icon will be used instead. Otherwise nothing will be passed.
 NavBar.defaultProps = {
    title: "Github Finder",
    icon: "fab fa-github"
};

//the below static propTypes will enable it so that react knows we are looking for a string for title and icon. If an array or anything else is passed as props with title and icon, a warning will be issued by react. dont forget to import PropTypes at the top.
NavBar.propTypes = {
    title: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
};

export default NavBar
