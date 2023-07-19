import React from "react";
import { Modal, Button } from "antd";
import "./index.scss";
import { onLogout } from "../../../api/AuthAPI";
import { useNavigate } from "react-router-dom";

const LogoutModal = ({ modalOpen, setModalOpen, currentUser }) => {
  let navigate = useNavigate();
  return (
    <>
      <Modal
        title=""
        style={{
          top: "70px",
          position: "absolute",
          right: "5%",
          minHeight: "300px",
        }}
        width={300}
        open={modalOpen}
        onOk={() => setModalOpen(false)}
        onCancel={() => setModalOpen(false)}
        footer={[
        ]}
      >
        <div className="modal-div">
          <div className="profile-info">
            <h1 className="profile-name">{currentUser.name}</h1>
            <p className="head-line">{currentUser.headline}</p>
          </div>
          <h2
            className="profile-view"
            onClick={() =>
              navigate("/profile", { state: { email: currentUser.email } })
            }
          >
            View Profile
          </h2>
          <button className="logout-btn" key="submit" type="primary" onClick={onLogout}>
            Logout
          </button>
        </div>
      </Modal>
    </>
  );
};

export default LogoutModal;
