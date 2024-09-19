import React from "react";
import { Outlet, NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { useCookies } from "react-cookie";

const Layout = (props) => {
  const [cookies, setCookie, removeCookie] = useCookies(["name"]);
  const navigate = useNavigate();

  const logged_in = () => {
    if (cookies.nick) {
      return <button onClick={handleLogOut}>Logout</button>;
    } else {
      return (
        <>
          <p>
            <NavLink to="/login">Login</NavLink>
          </p>
          <p>
            <NavLink to="/register">Register</NavLink>
          </p>
        </>
      );
    }
  };

  const handleLogOut = () => {
    removeCookie("id");
    removeCookie("name");
    removeCookie("email");
    removeCookie("nick");
    removeCookie("image");
    removeCookie("token");
    navigate("/login");
  };

  return (
    <React.Fragment>
      <div className="menu">
        <div style={{ display: "flex" }}>
          <div>
            <p>
              <NavLink
                to="/GoogleBooks"
                className={({ isActive }) => (isActive ? "current-screen" : "")}
              >
                Google API
              </NavLink>
            </p>
          </div>
          <div>
            <p>
              <NavLink
                to="/reviews"
                className={({ isActive }) => (isActive ? "current-screen" : "")}
              >
                Reviews
              </NavLink>
            </p>
          </div>
          <div>
            <p>
              <NavLink
                to="/library"
                className={({ isActive }) => (isActive ? "current-screen" : "")}
              >
                Our Books
              </NavLink>
            </p>
          </div>
        </div>
        <div style={{ display: "flex" }}>{logged_in()}</div>
      </div>
      <Outlet />
    </React.Fragment>
  );
};

export default Layout;
