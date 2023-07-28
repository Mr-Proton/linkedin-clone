import React, { useEffect, useMemo, useState } from "react";
import "./index.scss";
import blank_profile from "../../Images/blank_profile.jpg";
import { BiPencil } from "react-icons/bi";
import { getStatus } from "../../../api/FirestoreAPI";
import PostsCard from "../PostsCard";
import { useLocation } from "react-router-dom";
import { getPostUser } from "../../../api/FirestoreAPI";
import FileUploadModal from "../fileUploadModal";

function ProfileCard({ currentUser, onEdit }) {
  const location = useLocation();
  const [presentUser, setPresentUser] = useState({});
  const [progress, setProgress] = useState(0)
  const [modalOpen, setModalOpen] = useState(false);
  useMemo(() => {
    getPostUser(setPresentUser, location.state.email);
  }, []);

  const [allStatuses, setAllStatuses] = useState([]);
  useMemo(() => {
    getStatus(setAllStatuses);
  }, []);

  return (
    <>
      <div className="profile-head">
        <FileUploadModal
          modalOpen={modalOpen}
          setModalOpen={setModalOpen}
          userID={currentUser.userID}
          presentUser={presentUser}
          currentUser={currentUser}
          setProgress={setProgress}
          progress={progress}
        ></FileUploadModal>
        {location.state.email === currentUser.email ? (
          <BiPencil className="edit-profile-btn" onClick={onEdit}></BiPencil>
        ) : (
          <></>
        )}
        <div className="info">
          <div className="info-left">
            <img
              src={
                presentUser.imageLink ? presentUser.imageLink : blank_profile
              }
              className="profile-image"
              alt=""
              onClick={() => setModalOpen(true)}
            />
            <h3 className="name">{presentUser.name}</h3>
            <p className="headline">{presentUser.headline}</p>
            <p className="location">{presentUser.location}</p>
            <a className="website" target="_blank" href={presentUser.website}>
              {presentUser.website}
            </a>
          </div>
          <div className="info-right">
            <p className="company">{presentUser.company}</p>
            <p className="college">{presentUser.college}</p>
          </div>
        </div>
      </div>
      <div className="profile-head">
        <p className="about-me-heading">About Me</p>
        <p className="about-me">{presentUser.aboutMe}</p>
        <p className="about-me-heading">Skills</p>
        <p className="about-me">{presentUser.skills}</p>
      </div>
      <div className="profile-posts">
        {allStatuses
          .filter((item) => {
            return item.userEmail === presentUser.email;
          })
          .map((posts) => {
            return <PostsCard posts={posts} />;
          })}
      </div>
    </>
  );
}

export default ProfileCard;
