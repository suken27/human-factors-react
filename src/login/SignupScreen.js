import { useState } from "react";
import { useNavigate } from "react-router-dom";
import validator from "validator";
import AuthService from "../authentication/AuthService";
import logo from "../svg/logo.svg";
import users from "../svg/users.svg";
import "./SignupScreen.css";

export default function SignupScreen() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [emailFormatError, setEmailFormatError] = useState(false);
  const [passwordFormatError, setPasswordFormatError] = useState(false);
  const [passwordRepetitionError, setPasswordRepetitionError] = useState(false);
  const [existingUserError, setExistingUserError] = useState(false);
  const [unknownError, setUnknownError] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  function handleEmailChange(e) {
    setEmail(e.target.value);
  }

  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }

  function handlePassword2Change(e) {
    setPassword2(e.target.value);
  }

  function validPassword(password) {
    return password.length > 5;
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!validator.isEmail(email)) {
      setEmailFormatError(true);
      return;
    }
    setEmailFormatError(false);
    if (!validPassword(password)) {
      setPasswordFormatError(true);
      return;
    }
    setPasswordFormatError(false);
    if (password !== password2) {
      setPasswordRepetitionError(true);
      return;
    }
    setPasswordRepetitionError(false);
    setUnknownError(false);
    setSubmitting(true);
    AuthService.register(email, password)
      .then(navigate("/login"))
      .catch(function (error) {
        setSubmitting(false);
        if (error.response && error.response.status === 400) {
          setExistingUserError(true);
        } else {
          setUnknownError(true);
        }
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
        <form
          className="SignupScreen-right-signup-form"
          onSubmit={handleSubmit}
        >
          <div className="SignupScreen-right-signup-form-error">
            <div
              className="SignupScreen-right-signup-form-error-message"
              hidden={!emailFormatError}
            >
              Incorrect email format.
            </div>
            <div
              className="SignupScreen-right-signup-form-error-message"
              hidden={!passwordFormatError}
            >
              The password has to be at least 6 characters long.
            </div>
            <div
              className="SignupScreen-right-signup-form-error-message"
              hidden={!passwordRepetitionError}
            >
              Passwords do not match.
            </div>
            <div
              className="SignupScreen-right-signup-form-error-message"
              hidden={!existingUserError}
            >
              The email is already registered in the application.
            </div>
            <div
              className="SignupScreen-right-signup-form-error-message"
              hidden={!unknownError}
            >
              Unexpected error when connecting with the application.
            </div>
          </div>
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
            autoComplete="new-password"
            value={password}
            onChange={handlePasswordChange}
          />
          <input
            className="SignupScreen-right-signup-form-input"
            type="password"
            id="repeat-password"
            name="repeat-password"
            placeholder="Repeat password"
            autoComplete="new-password"
            value={password2}
            onChange={handlePassword2Change}
          />
          <button
            type="submit"
            className="SignupScreen-right-signup-form-button"
            disabled={submitting}
          >
            Sign up
          </button>
        </form>
        <div className="SignupScreen-right-login">
          <p>Have an account?</p>
          <a className="SignupScreen-right-login-button" href="/login">
            Log in
          </a>
        </div>
      </div>
    </div>
  );
}
