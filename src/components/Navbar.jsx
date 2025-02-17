import React, { useContext, useState } from "react";
import { useLocation, Link, useHistory } from "react-router-dom";
import SettingsModal from "./settings-modal/SettingsModal";
import IconButton from "./global/IconButton";
import BoardIcon from "../assets/icons/BoardIcon";
import DashboardIcon from "../assets/icons/DashboardIcon";
import HomeIcon from "../assets/icons/HomeIcon";
import DefaultAvatar from "../assets/images/default-avatar.png";
import { signOut } from "../services/authService";
import DarkModeContext from "../services/theme-context";
import { SettingsModalShowContext } from "./settings-modal/SettingsContextProvider";

function Navbar() {
  const history = useHistory();
  const [hovering, setHovering] = useState(false);
  const [displaySettings, setDisplaySettings] = useContext(
    SettingsModalShowContext
  );
  const location = useLocation();
  const { isDarkMode, setIsDarkMode } = useContext(DarkModeContext);

  const signOutHandler = () => {
    signOut();
    history.push("/");
  };

  const settingsHandler = () => {
    setHovering(false);
    setDisplaySettings(true);
  };

  const changeAppTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  /** Use location to check which page the user is currently is on
   * to render the outer box for the correct icon.
   * Need the hover state to render out the user related buttons only
   * when the user is hovering over the user icon container.
   * */
  return (
    <div className="navbar">
      <div>
        <Link to="/home" className="button-link">
          <div className="navbar__icon__group" data-testid="nav-home-icon">
            {location.pathname === "/home" && <div className="selected-box" />}
            <HomeIcon />
          </div>
        </Link>
        <Link to="/dashboard" className="button-link">
          <div className="navbar__icon__group" data-testid="nav-dashboard-icon">
            {location.pathname === "/dashboard" && (
              <div className="selected-box" />
            )}
            <DashboardIcon />
          </div>
        </Link>
        <Link to="/board" className="button-link">
          <div className="navbar__icon__group" data-testid="nav-taskboard-icon">
            {location.pathname === "/board" && <div className="selected-box" />}
            <BoardIcon />
          </div>
        </Link>
      </div>

      <div
        onMouseEnter={() => {
          if (!displaySettings) {
            setHovering(true);
          }
        }}
        onMouseLeave={() => setHovering(false)}
      >
        <div
          className={`navbar__account${hovering ? "--hover" : ""}`}
          datatestid="nav-settings-icon"
        >
          <IconButton
            className="hover-button "
            icon="settings"
            onClick={settingsHandler}
            size="48px"
            datatestid="nav-settings-icon"
          />
          {displaySettings && <SettingsModal />}

          <IconButton
            className="hover-button "
            icon={isDarkMode ? "lightMode" : "darkMode"}
            onClick={changeAppTheme}
            size="48px"
            datatestid="nav-theme-icon"
          />

          <IconButton
            className="hover-button "
            icon="logout"
            onClick={signOutHandler}
            size="48px"
            datatestid="nav-logout-icon"
          />
        </div>

        <img className="navbar__useravatar" src={DefaultAvatar} alt="avatar" />
      </div>
    </div>
  );
}

export default Navbar;
