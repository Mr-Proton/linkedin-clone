import React, { useEffect, useState } from "react";
import blank_profile from "../../Images/blank_profile.jpg"
import { HiUsers } from "react-icons/hi";
import { getConnections } from "../../../api/FirestoreAPI";

function ConnectedUsers({ user, makeConnection, currentUser }) {
    const [isConnected, setIsConnected] = useState(false)
    useEffect(() => {
        getConnections(currentUser.userID, user.id, setIsConnected)
      }, [currentUser.userID, user])
  return isConnected? <></>:(
    <div className="connected-user">
      <div>
        <img src={user.imageLink ? user.imageLink : blank_profile} alt="" />
        <h1>{user.name}</h1>
      </div>
      <p>{user.headline}</p>
      <button onClick={() => makeConnection(user.id)}><HiUsers></HiUsers>Connect</button>
    </div>
  );
}

export default ConnectedUsers;
