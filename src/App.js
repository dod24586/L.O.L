import React from "react";
import { Router } from "@reach/router";
import LoginScreen from "./Components/LoginScreen/LoginScreen";
import CardPage from "./Components/Card/CardPage";
import Error from "./Components/Error/Error";
import { Link } from "@reach/router";
import "./App.css";
import Logo from "./Images/Demacia_Crest_icon.png";
import Champ from "./Components/Champ/Champ";
function App() {
  return (
    <div>
      <nav
        className="navbar navbar-expand-lg navbar-dark  bg-dark "
        style={{ backgroundColor: "#3F5EFB!important" }}
      >
        <Link className="navbar-brand" to="/">
          <img src={Logo} width="40px" alt="Logo" />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link
                getProps={({ isPartiallyCurrent }) =>
                  isPartiallyCurrent
                    ? { className: " nav-link active" }
                    : { className: " nav-link" }
                }
                to="/champ"
              >
                Champtions
              </Link>
            </li>
            <li className="nav-item">
              <Link
                getProps={({ isCurrent }) =>
                  isCurrent
                    ? { className: " nav-link active" }
                    : { className: " nav-link" }
                }
                to="/error"
              >
                Error
              </Link>
            </li>
          </ul>
          <div className="navbar-nav">
          
            <Link
              getProps={({ isCurrent }) =>
                isCurrent
                  ? { className: " nav-link active" }
                  : { className: " nav-link" }
              }
              to="/login"
            >
              Login
            </Link>
          </div>
        </div>
      </nav>
      <Router>
        <Champ path="/champ/:Champ" />
        <LoginScreen path="/login" />
        <CardPage path="/champ" />
        <Error path="/error" />
      </Router>
    </div>
  );
}

export default App;
/*      <li className="nav-item dropdown">
              <Link
                className="nav-link dropdown-toggle"
                to="#"
                id="navbarDropdown"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Dropdown
              </Link>
              <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                <Link className="dropdown-item" to="#">
                  Action
                </Link>
                <Link className="dropdown-item" to="#">
                  Another action
                </Link>
                <div className="dropdown-divider"></div>
                <Link className="dropdown-item" to="#">
                  Something else here
                </Link>
              </div>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link disabled"
                to="#"
                tabIndex="-1"
                aria-disabled="true"
              >
                Disabled
              </Link>
            </li>    <form className="form-inline my-2 my-lg-0">
            <input
              className="form-control mr-sm-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
          </form> */
