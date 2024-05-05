import React,{useRef,useState} from 'react'
import {useAuth} from '../../contexts/AuthContext'
import {Link,useHistory} from 'react-router-dom'
import "../login/login.css"

export default function Signup() {
  const ER =useRef()
  const PR =useRef()
  const P2 =useRef()
  const {signup}=useAuth()
  const [err,PE] = useState('')
  const [loading,PL] = useState(false)
  const history = useHistory()

 async function HS(e){
    e.preventDefault()
    if (PR.current.value !== P2.current.value)
    {
      return PE("Passwords do not match")
    }
    try {
      PE('')
      PL(true)
      signup(ER.current.value, PR.current.value)
      history.push("/")
    }
    catch{
      PE('Failed to create an account')
    }
    PL(false)
  }


  return (
    <>
      <div className="signupform">
        <div>
          <h2 className="login-title">Sign Up</h2>
        </div>
  
        <div>
          {err && <div className="login-alert">{err}</div>}
          <form onSubmit={HS}>
            <div className="login-form-group" id="email">
              <label>Email</label>
              <input type="email" className="login-form-control" ref={ER} required />
            </div>
            <div className="login-form-group" id="password">
              <label>Password</label>
              <input type="password" className="login-form-control" ref={PR} required />
            </div>
            <div className="login-form-group" id="password-confirm">
              <label>Password Confirmation</label>
              <input type="password" className="login-form-control" ref={P2} required />
            </div>
            <p></p>
            <button className="login-button" type="submit">
              Sign Up
            </button>
          </form>
        </div>
        <span className="signup-login-link">
          Already have an account? <Link to="/login">Log In</Link>
        </span>
      </div>
    </>
  );
  }  