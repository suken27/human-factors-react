import axios from "axios";
import { useState } from "react";
import "./LoginScreen.css";
import logo from "./logo.svg";
import users from "./users.svg";

export default function LoginScreen() {

  const client = axios.create({
    baseURL: "http://192.168.1.79:8081/login",
  });

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleEmailChange(e) {
    setEmail(e.target.value);
  }

  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    return new Promise((resolve, reject) => {
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
          })
          .catch(function (error) {
            console.log(error);
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
          <button type="submit" className="LoginScreen-right-login-form-button">
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
