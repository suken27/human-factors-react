import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SignupScreen.css";
import logo from "./logo.svg";
import users from "./users.svg";

export default function SignupScreen() {
  const client = axios.create({
    baseURL: "http://192.168.1.79:8081/signup",
  });
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [emailFormatError, setEmailFormatError] = useState(false);
  const [passwordFormatError, setPasswordFormatError] = useState(false);
  const [passwordRepetitionError, setPasswordRepetitionError] = useState(false);

  function handleEmailChange(e) {
    setEmail(e.target.value);
  }

  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }

  function handlePassword2Change(e) {
    setPassword2(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    // Check if password and password2 are equal
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        client
          .post("", {
            email: email,
            password: password,
          })
          .then(function (response) {
            console.log(response);
            navigate("/login");
          })
          .catch(function (error) {
            console.log(error);
          });
        resolve();
      }, 1500);
    });
  }

  return (
    <div className="SignupScreen">
      <div className="SignupScreen-left">
        <img src={logo} className="SignupScreen-left-icon" alt="" />
      </div>
      <div className="SignupScreen-middle"></div>
      <div className="SignupScreen-right">
        <img src={users} className="SignupScreen-right-icon" alt="" />
        <div className="SignupScreen-right-error">

        </div>
        <form
          className="SignupScreen-right-signup-form"
          onSubmit={handleSubmit}
        >
          <input
            className="SignupScreen-right-signup-form-input"
            type="text"
            id="email"
            name="email"
            placeholder="Email"
            value={email}
            onChange={handleEmailChange}
          />
          <input
            className="SignupScreen-right-signup-form-input"
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={handlePasswordChange}
          />
          <input
            className="SignupScreen-right-signup-form-input"
            type="password"
            id="repeat-password"
            name="repeat-password"
            placeholder="Repeat password"
            value={password2}
            onChange={handlePassword2Change}
          />
          <button
            type="submit"
            className="SignupScreen-right-signup-form-button"
          >
            Sign up
          </button>
        </form>
      </div>
    </div>
  );
}
