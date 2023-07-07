import React from 'react'
import { LoginAPI } from '../api/AuthAPI'
import "../Sass/LoginComponent.scss"

export default function 
LoginComponent() {
  const login = () =>{
    let res = LoginAPI()
    console.log(res)
  }
  return (
    <div className="login-wrapper-inner">
    <h1 className="heading">Sign in</h1>
    <p className="sub-heading">Stay updated on your professional world</p>

    <div className="auth-inputs">
      <input
        onChange={(event) =>
          setCredentials({ ...credentails, email: event.target.value })
        }
        type="email"
        className="common-input"
        placeholder="Email or Phone"
      />
      <input
        onChange={(event) =>
          setCredentials({ ...credentails, password: event.target.value })
        }
        type="password"
        className="common-input"
        placeholder="Password"
      />
    </div>
    <button onClick={login} className="login-btn">
      Sign in
    </button>
  </div>
  )
}
