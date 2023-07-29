import React, { useState } from "react";
import "./index.scss";
import LinkedinLogo from "../../../assets/logo.png";
import { BiSolidHome } from "react-icons/bi";
import { HiUsers } from "react-icons/hi";
import { AiFillMessage } from "react-icons/ai";
import { IoNotifications } from "react-icons/io5";
import { BsFillBriefcaseFill, BsSearch } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import User from "../../../assets/user.png";
import blank_profile from "../../Images/blank_profile.jpg";
import LogoutModal from "../Modal/profileModal";

function Topbar({currentUser}) {
  let navigate = useNavigate();
  const goToRoute = (route) => {
    navigate(route);
  };

  const [modalOpen, setModalOpen] = useState(false);
  return (
    <div className="topbar-main">
      <img src={LinkedinLogo} alt="" onClick={() => goToRoute("/home")} className="linkedin-logo" />
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
          onClick={() => goToRoute("/connections")}
        />
        <BsFillBriefcaseFill size={30} className="react-icon" />
        <AiFillMessage size={30} className="react-icon" />
        <IoNotifications size={30} className="react-icon" />
      </div>
      <img
        src={currentUser.imageLink ? currentUser.imageLink : blank_profile}
        alt=""
        className="user-logo"
        onClick={() => setModalOpen(true)}
      />
      <LogoutModal setModalOpen={setModalOpen} modalOpen={modalOpen} currentUser={currentUser}/>
    </div>
  );
}

export default Topbar;
