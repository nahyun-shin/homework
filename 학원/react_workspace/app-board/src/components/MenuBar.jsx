import React from "react";
import "../assets/css/menuBar.css";
import { NavLink } from "react-router";

function MenuBar(props) {
  return (
    <>
      <nav className="nav">
        <ul className="nav-list">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) => (isActive ? "active" : "")}
              end
            >
              Home
            </NavLink>
          </li>
          <li className="nav-board">
            <span>Board</span>
            <ul className="nav-submenu">
              <li>
                <NavLink to="/board"className={({ isActive }) => (isActive ? "active" : "")}end>게시판</NavLink>
              </li>
            </ul>
          </li>
        </ul>
      </nav>
    </>
  );
}

export default MenuBar;
