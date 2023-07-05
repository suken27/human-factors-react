import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import validator from "validator";
import "./LoginScreen.css";
import logo from "./logo.svg";
import users from "./users.svg";

export default function LoginScreen() {
  const client = axios.create({
    baseURL: "http://java.suken.io/login",
  });
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("typing");
  const [emailFormatError, setEmailFormatError] = useState(false);
  const [loginError, setLoginError] = useState(false);

  function handleEmailChange(e) {
    setEmail(e.target.value);
  }

  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if(!validator.isEmail(email)) {
      setEmailFormatError(true);
      return;
    }
    setEmailFormatError(false);
    setLoginError(false);
    setStatus("submitting");
    return new Promise((resolve) => {
      setTimeout(() => {
        client
          .post("", {
            email: email,
            password: password,
          })
          .then(function (response) {
            console.log(response);
            const token = response.data.token;
            localStorage.setItem("token", token);
            axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
            navigate("/");
          })
          .catch(function (error) {
            console.log(error);
            if(error.response && error.response.status === 400) {
              setLoginError(true);
            }
            setStatus("typing");
          });
        resolve();
      }, 1500);
    });
  }

  return (
    <div className="LoginScreen">
      <div className="LoginScreen-left">
        <img src={logo} className="LoginScreen-left-icon" alt="" />
      </div>
      <div className="LoginScreen-middle"></div>
      <div className="LoginScreen-right">
        <img src={users} className="LoginScreen-right-icon" alt="" />
        <form className="LoginScreen-right-login-form" onSubmit={handleSubmit}>
        <div className="LoginScreen-right-login-form-error">
            <div
              className="LoginScreen-right-login-form-error-message"
              hidden={!emailFormatError}
            >
              Incorrect email format.
            </div>
            <div
              className="LoginScreen-right-login-form-error-message"
              hidden={!loginError}
            >
              Incorrect email or password.
            </div>
          </div>
          <input
            className="LoginScreen-right-login-form-input"
            type="text"
            id="email"
            name="email"
            placeholder="Email"
            value={email}
            onChange={handleEmailChange}
          />
          <input
            className="LoginScreen-right-login-form-input"
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={handlePasswordChange}
          />
          <button
            type="submit"
            className="LoginScreen-right-login-form-button"
            disabled={
              email.length === 0 ||
              password.length === 0 ||
              status === "submitting"
            }
          >
            Login
          </button>
        </form>
        <div className="LoginScreen-right-signup">
          <p>Not a member?</p>
          <a className="LoginScreen-right-signup-button" href="/signup">
            Sign up
          </a>
        </div>
      </div>
    </div>
  );
}
