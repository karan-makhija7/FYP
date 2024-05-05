import React, { useRef, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Link } from "react-router-dom";
import "./ForgotPassword.css";

export default function ForgotPassword() {
  const emailRef = useRef();
  const { password_reset_to_email } = useAuth();
  const [err, PE] = useState("");
  const [mess, PM] = useState("");
  const [loading, PL] = useState(false);

  async function HS(e) {
    e.preventDefault();

    try {
      PM("");
      PE("");
      PL(true);
      await password_reset_to_email(emailRef.current.value);
      PM("Check your inbox for further instructions");
    } catch {
      PE("Failed to reset password");
    }

    PL(false);
  }

  return (
    <div className="forgot">
      <div className="forgot-card">
        <div className="forgot-card-body">
          <h2 className="text-center mb-4">Password Reset</h2>
          {err && <div className="forgot-alert-danger">{err}</div>}
          {mess && <div className="forgot-alert-success">{mess}</div>}
          <form onSubmit={HS}>
            <div className="forgot-form-group" id="email">
              <label>Email</label>
              <p></p>
              <input type="email" className="forgot-form-control" ref={emailRef} required />
              <p></p>
            </div>
            <button disabled={loading} className="forgot-button" type="submit">
              Reset Password
            </button>
            <p></p>
          </form>
          <div className="forgot-login-link">
            <Link to="/login">Login</Link>
            
          </div>
        </div>
      </div>
      <div className="forgot-signup-link">
        Need an account? <Link to="/signup">Sign Up</Link>
      </div>
    </div>
  );
}
