import React, { useState } from "react";
import ProfileCard from "./common/ProfilePage";
import ProfileEdit from "./common/ProfileEdit";

function ProfileComponent({ currentUser }) {
  const [isEdit, setIsEdit] = useState(false);

  const onEdit = () => {
    setIsEdit(!isEdit);
  };
  return (
    <>
      {isEdit ? (
        <ProfileEdit currentUser={currentUser} onEdit={onEdit}/>
      ) : (
        <ProfileCard currentUser={currentUser} onEdit={onEdit} />
      )}
    </>
  );
}

export default ProfileComponent;
