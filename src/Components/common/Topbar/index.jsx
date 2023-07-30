import React, { useEffect, useState } from "react";
import "./index.scss";
import LinkedinLogo from "../../../assets/logo.png";
import { BiSolidHome } from "react-icons/bi";
import { HiUsers } from "react-icons/hi";
import { getAllUsers } from "../../../api/FirestoreAPI";
import { AiFillMessage, AiOutlineClose } from "react-icons/ai";
import { IoNotifications } from "react-icons/io5";
import { BsFillBriefcaseFill, BsSearch } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import User from "../../../assets/user.png";
import blank_profile from "../../Images/blank_profile.jpg";
import LogoutModal from "../Modal/profileModal";

function Topbar({ currentUser }) {
  let navigate = useNavigate();
  const [isSearch, setIsSearch] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [users, setAllUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const goToRoute = (route) => {
    navigate(route);
  };
  const handleSearch = () => {
    if (searchInput !== "") {
      let searched = users.filter((user) => {
        return Object.values(user.name)
          .join("")
          .toLowerCase()
          .includes(searchInput.toLowerCase());
      });
      setFilteredUsers(searched);
    } else {
      setFilteredUsers(users);
    }
  };
  useEffect(() => {
    getAllUsers(setAllUsers);
  }, []);

  useEffect(() => {
    let debounced = setTimeout(() => {
      handleSearch();
    }, 500);

    return () => clearTimeout(debounced);
  }, [searchInput]);
  return (
    <div className="topbar-main">
      <img
        src={LinkedinLogo}
        alt=""
        onClick={() => goToRoute("/home")}
        className="linkedin-logo"
      />
      {isSearch ? (
        <div className="search-div">
          <input
            type="text"
            name=""
            id=""
            className="search-user"
            placeholder="Search for user"
            onChange={(event) => setSearchInput(event.target.value)}
          />
          <AiOutlineClose
            className="search-close"
            onClick={() => {
              setIsSearch(false), setSearchInput("");
            }}
          ></AiOutlineClose>
        </div>
      ) : (
        <div className="react-icons">
          <BsSearch
            size={25}
            className="react-icon"
            onClick={() => {
              setIsSearch(true);
            }}
          />
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
      )}
      <img
        src={currentUser.imageLink ? currentUser.imageLink : blank_profile}
        alt=""
        className="user-logo"
        onClick={() => setModalOpen(true)}
      />
      <LogoutModal
        setModalOpen={setModalOpen}
        modalOpen={modalOpen}
        currentUser={currentUser}
      />
      {searchInput.length === 0 ? (
        <></>
      ) : (
        <div className="search-results">
          {filteredUsers.length === 0 ? (
            <h3>No result</h3>
          ) : (
            filteredUsers.map((user) => {
              return (
                <div
                  className="search-result-inner"
                  onClick={() => {
                    navigate("/profile", { state: { email: user.email } });
                    setIsSearch(false)
                    setSearchInput("")
                  }}
                >
                  <img
                    src={user.imageLink ? user.imageLink : blank_profile}
                    alt=""
                  />
                  <div>
                    <h3>{user.name}</h3>
                    <p>{user.headline}</p>
                  </div>
                </div>
              );
            })
          )}
        </div>
      )}
    </div>
  );
}

export default Topbar;
