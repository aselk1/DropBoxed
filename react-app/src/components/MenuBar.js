import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import LogoutButton from "./auth/LogoutButton";
import favicon from "./images/favicon.png";
import "../index.css";

const MenuBar = ({ user, loaded }) => {
  return (
    <div className="flexCol menuPadding">
      {loaded && (
        <nav className="flexCol">
          <div className="flexCol">
            <NavLink
              className="height27 hoverGrey"
              to="/home"
              exact={true}
              activeClassName="active"
            >
              <div className="menuButton">Home</div>
            </NavLink>
            <NavLink
              className="height27 hoverGrey"
              to="/files"
              exact={true}
              activeClassName="active"
            >
              <div className="menuButton">Files</div>
            </NavLink>
            <NavLink
              className="height27 hoverGrey"
              to="/folders"
              exact={true}
              activeClassName="active"
            >
              <div className="menuButton">Folders</div>
            </NavLink>
            <NavLink
              className="height27 hoverGrey"
              to="/favorites"
              exact={true}
              activeClassName="active"
            >
              <div className="menuButton">Favorites</div>
            </NavLink>
          </div>
        </nav>
      )}
    </div>
  );
};

export default MenuBar;
