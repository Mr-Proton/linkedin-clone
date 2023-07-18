import React, { useState } from "react";
import "./index.scss";
import { editProfile } from "../../../api/FirestoreAPI";

function ProfileEdit({ currentUser, onEdit }) {
    const [editInput, setEditInput] = useState({})
  const getInput = (event) => {
    let { name, value } = event.target
    let input = { [name] : value}
    setEditInput({...editInput,...input})
  };

  const updateProfile = () => { 
    editProfile(currentUser?.userID,editInput)
    onEdit()
  }

  return (
    <div className="profile-edit">
      <button className="edit-profile" onClick={onEdit}>
        Back
      </button>
      <input
        onChange={getInput}
        className="edit-data"
        name="name"
        placeholder="Name"
      />
      <input
        onChange={getInput}
        className="edit-data"
        name="headline"
        placeholder="Headline"
      />
      <input
        onChange={getInput}
        className="edit-data"
        name="location"
        placeholder="Location"
      />
      <input
        onChange={getInput}
        className="edit-data"
        name="company"
        placeholder="Company"
      />
      <input
        onChange={getInput}
        className="edit-data"
        name="college"
        placeholder="College"
      />
      <button className="save-btn" onClick={updateProfile}>Save</button>
    </div>
  );
}

export default ProfileEdit;
