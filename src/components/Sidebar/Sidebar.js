
import React, { useEffect, useRef } from "react";
import { NavLink, useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import PerfectScrollbar from "perfect-scrollbar";
import { Nav } from "reactstrap";
import { BackgroundColorContext, backgroundColors } from "contexts/BackgroundColorContext";
import { useDispatch, useSelector } from "react-redux";
import { selectLoggedIn } from "Redux/adminSlice";
import { setLoggedIn } from "Redux/adminSlice";

function Sidebar(props) {
  const logged = useSelector(selectLoggedIn)
  const location = useLocation();
  const dispatch = useDispatch();
  const sidebarRef = useRef(null);
  const activeRoute = (routeName) => {
    return location.pathname === routeName ? "active" : "";
  };
  const checkLog = () => {
    const token = localStorage.getItem("Token");
    if (token) {
      dispatch(setLoggedIn(true))
      console.log("jihed token accepted", token);
    } else {
      console.log("jihed token none", token);
      // dispatch(setLoggedIn(false))
    }
  }
  useEffect(() => {
    // checkLog()
    if (navigator.platform.indexOf("Win") > -1) {
      const ps = new PerfectScrollbar(sidebarRef.current, {
        suppressScrollX: true,
        suppressScrollY: false,
      });
      return () => {
        ps.destroy();
      };
    }
  }, []);
  const linkOnClick = () => {
    document.documentElement.classList.remove("nav-open");
  };
  const { routes, rtlActive, logo } = props;
  let logoImg = null;
  let logoText = null;
  if (logo !== undefined) {
    if (logo.outterLink !== undefined) {
      logoImg = (
        <a
          className="simple-text logo-mini"
          target="_blank"
          onClick={props.toggleSidebar}
        >
          <div className="logo-img">
            <img src={logo.imgSrc} alt="react-logo" />
          </div>
        </a>
      );
      logoText = (
        <a
          className="simple-text logo-normal"
          target="_blank"
          onClick={props.toggleSidebar}
        >
          {logo.text}
        </a>
      );
    } else {
      logoImg = (
        <NavLink
          to={logo.innerLink}
          className="simple-text logo-mini"
          onClick={props.toggleSidebar}
        >
          <div className="logo-img">
            <img src={logo.imgSrc} alt="react-logo" />
          </div>
        </NavLink>
      );
      logoText = (
        <NavLink
          to={logo.innerLink}
          className="simple-text logo-normal"
          onClick={props.toggleSidebar}
        >
          {logo.text}
        </NavLink>
      );
    }
  }
  return (
    <BackgroundColorContext.Consumer>
      {({ color }) => (
        <div className="sidebar" style={{
          width:"15.4rem",
          // height:"55rem",
          pointerEvents: !logged ? 'none' : 'auto',
          backdropFilter: !logged ? 'blur(10px)' : 'none',
          filter: !logged ? 'blur(5px)' : "none"
        }} data={color}>

          <div className="sidebar-wrapper" ref={sidebarRef}>
            {logoImg !== null || logoText !== null ? (
              <div className="logo">
                {logoImg}
                {logoText}
              </div>
            ) : null}
            <Nav>
              {routes.map((prop, key) => {
                if (prop.redirect) return null;
                return (
                  <li
                    className={
                      activeRoute(prop.path) + (prop.pro ? " active-pro" : "")
                    }
                    key={key}
                  >
                    <NavLink
                      to={prop.layout + prop.path}
                      style={{
                        display: prop.name === 'login' && logged ? "none" : 'block',
                      }}
                      className="nav-link"
                      onClick={props.toggleSidebar}
                    >
                      <i className={prop.icon} />
                      <p>{rtlActive ? prop.rtlName : prop.name}</p>
                    </NavLink>
                  </li>
                );
              })}
            </Nav>
          </div>
        </div>
      )}
    </BackgroundColorContext.Consumer>
  );
}

Sidebar.propTypes = {
  rtlActive: PropTypes.bool,
  routes: PropTypes.arrayOf(PropTypes.object),
  logo: PropTypes.shape({
    innerLink: PropTypes.string,
    outterLink: PropTypes.string,
    text: PropTypes.node,
    imgSrc: PropTypes.string,
  }),
};

export default Sidebar;
