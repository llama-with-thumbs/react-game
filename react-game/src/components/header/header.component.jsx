import React from "react";
import { Link } from "react-router-dom";

import { ReactComponent as Logo } from "../../assets/crown.svg";

import "./header.styles.scss";

const Header = ({ currentUser }) => (
  <div className="header">
    <Link className="logo-container" to="/">
      <Logo className="logo" />
      React-game
    </Link>
    <div className="options">
      <Link className="option" to="/">
        GAME
      </Link>
      <Link className="option" to="/">
        STATISTICS
      </Link>
      <Link className="option" to="/">
        LOGIN
      </Link>
    </div>
  </div>
);

export default Header;
