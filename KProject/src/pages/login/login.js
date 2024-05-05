import React, { useRef, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";
import "./login.css";

export default function Login() {
  const ER = useRef();
  const PR = useRef();

  const { signin } = useAuth();
  const [err, PE] = useState("");
  const [loading, PL] = useState(false);

  const history = useHistory();

  async function HS(e) {
    e.preventDefault();

    try {
      PE("");
      PL(true);
      await signin(ER.current.value, PR.current.value);
      history.push("/home");
    } catch {
      PE("Failed to sign in");
    }
    PL(false);
  }

  return (
    <div className="loginform">
      <h2 className="login-title">Log In</h2>
      {err && <div className="login-alert">{err}</div>}
      <form onSubmit={HS}>
        <div className="login-form-group" id="email">
          <label>Email</label>
          <input type="email" className="login-form-control" ref={ER} required />
        </div>
        <div className="login-form-group" id="password">
          <label>Password</label>
          <input
            type="password"
            className="login-form-control"
            ref={PR}
            required
          />
        </div>
        <p></p>
        <button className="login-button" type="submit">
          Log In
        </button>
      </form>
      <div className="login-forgot-password">
        <Link to="/forgot-password">Forgot Password?</Link>
      </div>
      <div className="login-sign-up">
        Need an account? <Link to="/signup">Sign up</Link>
      </div>
    </div>
  );
}
