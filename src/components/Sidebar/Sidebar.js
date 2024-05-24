
import React, { useEffect, useRef } from "react";
import { NavLink, useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import PerfectScrollbar from "perfect-scrollbar";
import { Nav } from "reactstrap";
import { BackgroundColorContext, backgroundColors } from "contexts/BackgroundColorContext";
import "../../assets/css/sideBar.css"
import { useDispatch, useSelector } from "react-redux";
import { selectAdmin, selectLoggedIn } from "../../Redux/adminSlice";
import { setLoggedIn } from "../../Redux/adminSlice";

function Sidebar(props) {
  const Admin = useSelector(selectAdmin)
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
        // ps.destroy();
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
          {/* <div className="logo-img"> */}
          <img className="company_logo_sidebar" src={logo.imgSrc} alt="react-logo" />
          {/* </div> */}
        </a>
      );
      logoText = (
        <a
          className="logo-text"
          // className="simple-text logo-normal"
          style={{
            // maringTop:"2rem"
          }}
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
          width: "15.4rem",
          // height:"55rem",
          pointerEvents: !localStorage.getItem("Token") || localStorage.getItem("Token") === "undefined"
            ? 'none' : 'auto',
          backdropFilter: !localStorage.getItem("Token") || localStorage.getItem("Token") === "undefined"
            ? 'blur(10px)' : 'none',
          filter: !localStorage.getItem("Token") || localStorage.getItem("Token") === "undefined"
            ? 'blur(5px)' : "none"
        }} data={color}>

          <div className="sidebar-wrapper" ref={sidebarRef}>
            {logoImg !== null || logoText !== null ? (
              <div className="logo">
                {logoImg}
                {logoText}
              </div>
            ) : null}
            <Nav>
              {routes?.map((prop, key) => {
                if (prop.redirect) return null;
                return (
                  <li
                    className={
                      activeRoute(prop.path) + (prop.pro ? " active-pro" : "")
                    }
                    key={key}
                  >
                    {/* {console.log(Admin.clearance)} */}
                    {
                      // Check if the user has Level2 clearance and meets additional conditions
                      (Admin?.clearance === "Level1" &&
                        (prop.name === "Dashboard" ||
                          prop.name === "User Managements" ||
                          prop.name === "Rental Requests" ||
                          prop.name === "Add Cars/Agencies")) ?
                        null :
                        // Check if the user has Level1 clearance and meets additional conditions
                        (Admin?.clearance === "Level2" &&
                          (prop.name === "Dashboard" )) ?
                          null :
                          // Default case for all other users or conditions
                          <NavLink
                            to={prop.layout + prop.path}
                            style={{
                              display: prop.name === 'login' && localStorage.getItem("Token")
                                ? "none" : 'block',
                            }}
                            className="nav-link"
                            onClick={props.toggleSidebar}
                          >
                            <i className={prop.icon} />
                            <p>{rtlActive ? prop.rtlName : prop.name}</p>
                          </NavLink>
                    }

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
