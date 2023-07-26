import React, { useState } from "react";
import "./index.scss";
import { AiOutlineClose } from "react-icons/ai"
import { editProfile } from "../../../api/FirestoreAPI";

function ProfileEdit({ currentUser, onEdit }) {
  const [editInput, setEditInput] = useState(currentUser);
  const getInput = (event) => {
    let { name, value } = event.target;
    let input = { [name]: value };
    setEditInput({ ...editInput, ...input });
  };

  const updateProfile = () => {
    editProfile(currentUser?.userID, editInput);
    onEdit();
  };
  console.log(editInput);
  return (
    <div className="profile-edit">
      <AiOutlineClose className="edit-profile-btn" onClick={onEdit}>
        Back
      </AiOutlineClose>
      <label>Name</label>
      <input
        onChange={getInput}
        className="edit-data"
        name="name"
        placeholder="Name"
        value={editInput.name}
      />
      <label>Headline</label>
      <input
        onChange={getInput}
        className="edit-data"
        name="headline"
        placeholder="Headline"
        value={editInput.headline}
      />
      <label>Location</label>
      <input
        onChange={getInput}
        className="edit-data"
        name="location"
        placeholder="Location"
        value={editInput.location}
      />
      <label>Company</label>
      <input
        onChange={getInput}
        className="edit-data"
        name="company"
        placeholder="Company"
        value={editInput.company}
      />
      <label>Industry</label>
      <input
        onChange={getInput}
        className="edit-data"
        name="industry"
        placeholder="Industry"
        value={editInput.industry}
      />
      <label>College</label>
      <input
        onChange={getInput}
        className="edit-data"
        name="college"
        placeholder="College"
        value={editInput.college}
      />
      <label>Website</label>
      <input
        onChange={getInput}
        className="edit-data"
        name="website"
        placeholder="Website"
        value={editInput.website}
      />
      <label>About</label>
      <textarea
        name="aboutMe"
        className="edit-about"
        rows={5}
        placeholder="About Me"
        value={editInput.aboutMe}
        onChange={getInput}
      ></textarea>
      <label>Skills</label>
      <input
        onChange={getInput}
        className="edit-data"
        name="skills"
        placeholder="Skills"
        value={editInput.skills}
      />
      <button className="save-btn" onClick={updateProfile}>
        Save
      </button>
    </div>
  );
}

export default ProfileEdit;
