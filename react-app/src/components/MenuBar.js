import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import LogoutButton from "./auth/LogoutButton";
import favicon from "./images/favicon.png";
import "../index.css";

const MenuBar = ({ user, loaded }) => {
  return (
    <div>
      <div className="flexCol menuPadding">
        {loaded && (
          <nav className="flexCol">
            <div className="flexCol">
              <NavLink to="/home" exact={true} activeClassName="active">
                <div className="menuButton">Home</div>
              </NavLink>
              <NavLink to="/files" exact={true} activeClassName="active">
                <div className="menuButton">Files</div>
              </NavLink>
              <NavLink to="/folders" exact={true} activeClassName="active">
                <div className="menuButton">Folders</div>
              </NavLink>
            </div>
          </nav>
        )}
      </div>
    </div>
  );
};

export default MenuBar;
