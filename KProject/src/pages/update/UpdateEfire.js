import React, { useRef, useState } from "react"
import { useAuth } from "../../contexts/AuthContext"
import { Link, useHistory } from "react-router-dom"
import Sidebar from "../../components/sidebar/Sidebar"
import './update.css'


export default function UpdateEfire() {
  const ER = useRef()
  const PR = useRef()
  const P2 = useRef()
  const { currentUser, uppass, upemail } = useAuth()
  const [err, PE] = useState("")
  const [loading, PL] = useState(false)
  const history = useHistory()

  function HS(e) {
    e.preventDefault()
    if (PR.current.value !== P2.current.value) {
      return PE("Passwords do not match")
    }

    const promises = []
    PL(true)
    PE("")

    if (ER.current.value !== currentUser.email) {
      promises.push(upemail(ER.current.value))
    }
    if (PR.current.value) {
      promises.push(uppass(PR.current.value))
    }

    Promise.all(promises)
      .then(() => {
        history.push("/")
      })
      .catch(() => {
        PE("Failed to update account")
      })
      .finally(() => {
        PL(false)
      })
  }

  return (
    <div className="home">
    <Sidebar />
    <div className="homeContainer" id='update'>
      
  
      <div className="upcard">
        <div className="upcard-body">
          <h2 className="up-title">Update Email & Password</h2>
          {err && <div className="up-alert">{err}</div>}
          <form onSubmit={HS}>
            <div className="up-form-group" id="email">
              <label>Email</label>
              <input
                type="email"
                className="up-input"
                ref={ER}
                required
                defaultValue={currentUser.email}
              />
            </div>
            <p></p>
            <div className="up-form-group" id="password">
              <label>Password</label>
              <input
                type="password"
                className="up-input"
                ref={PR}
                placeholder="Leave blank to keep the same"
              />
            </div>
            <p></p>
            <div className="up-form-group" id="password-confirm">
              <label>Password Confirmation</label>
              <input
                type="password"
                className="up-input"
                ref={P2}
                placeholder="Leave blank to keep the same"
              />
            </div>

          <p></p>

            <button disabled={loading} className="up-button" type="submit">
              Update
            </button>
          </form>
        </div>
      </div>
      <div className="up-cancel-link">
        <Link to="/">Cancel</Link>
      </div>
    </div>
    </div>
  )
}
