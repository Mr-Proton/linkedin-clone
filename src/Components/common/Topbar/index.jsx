import React from "react";
import "./index.scss";
import LinkedinLogo from "../../../assets/logo.png";
import { BiSolidHome } from "react-icons/bi";
import { HiUsers } from "react-icons/hi";
import { AiFillMessage } from "react-icons/ai";
import { IoNotifications } from "react-icons/io5";
import { BsFillBriefcaseFill, BsSearch } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import User from "../../../assets/user.png";

function Topbar() {
  let navigate = useNavigate();
  const goToRoute = (route) => {
    navigate(route);
  };
  return (
    <div className="topbar-main">
      <img src={LinkedinLogo} alt="" className="linkedin-logo" />
      <div className="react-icons">
        <BsSearch size={25} className="react-icon" />
        <BiSolidHome
          size={30}
          className="react-icon"
          onClick={() => goToRoute("/home")}
        />
        <HiUsers
          size={30}
          className="react-icon"
          onClick={() => goToRoute("/profile")}
        />
        <BsFillBriefcaseFill size={30} className="react-icon" />
        <AiFillMessage size={30} className="react-icon" />
        <IoNotifications size={30} className="react-icon" />
      </div>
      <img src={User} alt="" className="user-logo" />
    </div>
  );
}

export default Topbar;
