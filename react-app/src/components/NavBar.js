import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import LogoutButton from "./auth/LogoutButton";
import favicon from './images/favicon.png'
import "../index.css";

const NavBar = ({ user, loaded }) => {
  return (
    <div className="flexRow height48 alignCenter">
      {loaded && <nav className="flexRow height48 justSpace widthFull">
        <div className="flexRow alignCenter">
          <NavLink to="/" exact={true} activeClassName="active">
            <img src={favicon}></img>
          </NavLink>
          <NavLink to="/" exact={true} activeClassName="active">
            <div className="height48 flexRow alignCenter">
              <div className="logoText">DropBoxed</div>
            </div>
          </NavLink>
        </div>
        <ul className="flexRow noBullets alignCenter">
          {/* <li>
            <NavLink to="/" exact={true} activeClassName="active">
              Home
            </NavLink>
          </li> */}
          {!user && <li className>
            <NavLink to="/login" exact={true} activeClassName="active">
              <div className="sign flexRow alignCenter justCenter">Sign in</div>
            </NavLink>
          </li>}
          {!user && <li>
            <NavLink to="/sign-up" exact={true} activeClassName="active">
              <div className="sign flexRow alignCenter justCenter">Sign up</div>
            </NavLink>
          </li>}
          {/* <li>
          <NavLink to="/users" exact={true} activeClassName="active">
            Users
          </NavLink>
        </li> */}
          {user && (
            <li>
              <LogoutButton />
            </li>
          )}
        </ul>
      </nav>}
    </div>
  );
};

export default NavBar;