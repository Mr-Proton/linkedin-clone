import React, { useState } from "react";
import { RegisterAPI, GoogleSignInAPI } from "../api/AuthAPI";
import "../Sass/LoginComponent.scss";
import linkedinLogo from "../assets/logo.png";
import GoogleButton from "react-google-button";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function RegisterComponent() {
  let navigate = useNavigate()
  const [credentials, setCredentials] = useState({})
  const login = async() => {
    try{
      let res = await RegisterAPI(credentials.email, credentials.password)
      toast.success("Account created")
      navigate("/home")
    }catch(err){
        console.log(err)
        toast.error("Account could not be created")
    }
  };

  const googleSignIn = () => {
    let response = GoogleSignInAPI()
    console.log(response)
  }
  return (
    <div className="login-wrapper">
      <img src={linkedinLogo} alt="" className="linkedinLogo" />

      <div className="login-wrapper-inner">
        <h1 className="heading">Make most of your professional life</h1>

        <div className="auth-inputs">
          <input
            onChange={(event) =>
              setCredentials({ ...credentials, email: event.target.value })
            }
            type="email"
            className="common-input"
            placeholder="Email or Phone"
          />
          <input
            onChange={(event) =>
              setCredentials({ ...credentials, password: event.target.value })
            }
            type="password"
            className="common-input"
            placeholder="Password"
          />
        </div>
        <button onClick={login} className="login-btn">
          Agree and Join
        </button>
      </div>
      <hr class="hr-text" data-content="OR"></hr>
      <div className="google-btn-container">
        <GoogleButton className="google-btn" onClick={googleSignIn}/>
        <p>
          Already on LinkedIn? <span className="join-now" onClick={() => navigate('/login')}>Sign In</span>
        </p>
      </div>
    </div>
  );
}
