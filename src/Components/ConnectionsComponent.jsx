import React, { useEffect, useState } from "react";
import { getAllUsers, addConnection, getConnections } from "../api/FirestoreAPI";
import ConnectedUsers from "./common/ConnectedUsers";
import "../Sass/ConnectionsComponent.scss";

function ConnectionsComponent({ currentUser }) {
  const [allUsers, setAllUsers] = useState([]);
  useEffect(() => {
    getAllUsers(setAllUsers);
  }, []);
  const makeConnection = (id) => {
    addConnection(currentUser.userID, id)
  };

  return (
    <div className="connections-div">
      {allUsers.map((user) => {
        return user.id === currentUser.userID ? (<></>) :
          (<ConnectedUsers
            user={user}
            makeConnection={makeConnection}
            currentUser={currentUser}
          />)
        ;
      })}
    </div>
  );
}

export default ConnectionsComponent;
