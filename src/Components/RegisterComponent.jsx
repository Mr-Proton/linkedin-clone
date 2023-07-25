import React, { useState } from "react";
import { RegisterAPI, GoogleSignInAPI } from "../api/AuthAPI";
import "../Sass/LoginComponent.scss";
import linkedinLogo from "../assets/logo.png";
import GoogleButton from "react-google-button";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { postUserData } from "../api/FirestoreAPI";

export default function RegisterComponent() {
  let navigate = useNavigate()
  const [credentials, setCredentials] = useState({})
  const register = async() => {
    try{
      let res = await RegisterAPI(credentials.email, credentials.password)
      toast.success("Account created")
      postUserData({name: credentials.name, email: credentials.email})
      localStorage.setItem("userEmail", res.user.email)
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
      <div className="login-wrapper-flex">
        <div className="login-wrapper-inner">
          <h1 className="heading">Join LinkedIn</h1>

          <div className="auth-inputs">
          <input
              onChange={(event) =>
                setCredentials({ ...credentials, name: event.target.value })
              }
              type="email"
              className="common-input"
              placeholder="Full Name"
            />
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
          <button onClick={register} className="login-btn">
            Agree and Join
          </button>
        <hr class="hr-text" data-content="OR"></hr>
        <div className="google-btn-container">
          <GoogleButton className="google-btn" onClick={googleSignIn}/>
          <p>
            Already on LinkedIn? <span className="join-now" onClick={() => navigate('/login')}>Sign In</span>
          </p>
        </div>
        </div>
      </div>
    </div>
  );
}
