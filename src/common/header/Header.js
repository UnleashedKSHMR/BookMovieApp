import React, { useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { Button, TextField } from "@material-ui/core";
import { Tabs, Tab, AppBar } from "@material-ui/core";
import {
  FormControl,
  InputLabel,
  Input,
  FormHelperText,
} from "@material-ui/core";
import Modal from "react-modal";

import "./Header.css";
import logo from "../../assets/logo.svg";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

function Header(props) {
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  const [modalIsOpen, setIsOpen] = useState(false);
  const location = useLocation();

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  const [tabValue, setTabValue] = useState(0);
  function handleTabs(e, val) {
    setTabValue(val);
  }

  const history = useHistory();

  const routeChange = () => {
    history.push(`/book-show/${location.pathname.split("/movie/")[1]}`);
  };

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    window.location.reload();
  };

  return (
    <div className="header">
      <img src={logo} className="logo" onClick={() => history.push("/")}></img>

      {/* {isLoggedIn ? (
        <Button
          variant="contained"
          name="Logout"
          className="logbtn"
          onClick={handleLogout}
        >
          Logout
        </Button>
      ) : null} */}

      {isLoggedIn && (
        <Button
          variant="contained"
          name="Logout"
          className="logbtn"
          onClick={handleLogout}
        >
          Logout
        </Button>
      )}

      {!isLoggedIn && (
        <Button
          variant="contained"
          name="Login"
          className="logbtn"
          onClick={openModal}
        >
          Login
        </Button>
      )}

      {location.pathname !== "/" && (
        <Button
          variant="contained"
          color="primary"
          name="Book Show"
          className="logbtn"
          onClick={routeChange}
        >
          Book Show
        </Button>
      )}

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <AppBar position="static" color="default" className="custom-tabs">
          <Tabs value={tabValue} variant="fullWidth" onChange={handleTabs}>
            <Tab label="LOGIN"></Tab>
            <Tab label="REGISTER"></Tab>
          </Tabs>
        </AppBar>
        <TabPanel value={tabValue} index={0}>
          <LoginModal />
        </TabPanel>
        <TabPanel value={tabValue} index={1}>
          <RegisterModal />
        </TabPanel>
      </Modal>
    </div>
  );
}

function TabPanel(props) {
  const { children, value, index } = props;
  return <div>{value === index && <div> {children} </div>}</div>;
}

function LoginModal() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleText = (e) => {
    switch (e.target.name) {
      case "username":
        setUsername(e.target.value);
        break;

      case "password":
        setPassword(e.target.value);
        break;

      default:
        break;
    }
  };

  const handleLogin = () => {
    if (handleValidation()) {
      // true - API for login
      localStorage.setItem("isLoggedIn", true);
      window.location.reload();
    } else {
      // false
    }
  };

  const handleValidation = () => {
    let isValid = true;

    if (username.length < 1) {
      setUsernameError("required");
      isValid = false;
    }

    if (username.length !== 0) {
      setUsernameError("");
    }

    if (password.length < 1) {
      setPasswordError("required");
      isValid = false;
    }

    if (password.length !== 0) {
      setPasswordError("");
    }

    return isValid;
  };

  return (
    <FormControl className="container">
      <TextField
        name="username"
        error={usernameError.length > 0 ? true : false}
        required
        label="Username"
        helperText={usernameError}
        type="text"
        onChange={(e) => handleText(e)}
      ></TextField>
      <br />
      <TextField
        name="password"
        error={passwordError.length > 0 ? true : false}
        required={true}
        helperText={passwordError}
        label="Password"
        type="password"
        onChange={(e) => handleText(e)}
      ></TextField>
      <Button
        variant="contained"
        color="primary"
        className="login-button"
        onClick={handleLogin}
      >
        {" "}
        Login{" "}
      </Button>
      <br />
    </FormControl>
  );
}

function RegisterModal() {
  return (
    <FormControl className="container">
      <TextField required={true} label="First Name" type="text"></TextField>
      <TextField required={true} label="Last Name" type="text"></TextField>
      <TextField required={true} label="Email" type="text"></TextField>
      <TextField required={true} label="Password" type="password"></TextField>
      <TextField required={true} label="Contact No." type="number"></TextField>
      <Button variant="contained" color="primary" className="login-button">
        Register
      </Button>
    </FormControl>
  );
}

export default Header;
