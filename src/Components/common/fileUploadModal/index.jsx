import React, { useState, useEffect } from "react";
import { Button, Modal, Progress } from "antd";
import "./index.scss";
import blank_profile from "../../Images/blank_profile.jpg";
import { uploadImage as uploadImageApi } from "../../../api/imageUpload";

function FileUploadModal({
  modalOpen,
  setModalOpen,
  presentUser,
  userID,
  currentUser,
  setProgress,
  progress
}) {
  const [newImage, setNewImage] = useState();
  const [newImagePresent, setNewImagePresent] = useState(false);
  const [currentImage, setCurrentImage] = useState({});
  const handleOk = () => {
    setModalOpen(false);
  };
  const handleCancel = () => {
    setModalOpen(false);
  };
  const uploadImage = () => {
    uploadImageApi(currentImage, userID, setProgress, setModalOpen, setCurrentImage, setNewImagePresent);
  };
  const getImage = (event) => {
    setCurrentImage(event.target.files[0]);
    console.log(newImage);
    setNewImage(URL.createObjectURL(event.target.files[0]));
    setNewImagePresent(true);
  };

  return (
    <>
      <Modal
        title={currentUser.email===presentUser.email ? "Edit Profile Image" : "Profile Image"}
        open={modalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={
          currentUser.email === presentUser.email
            ? [
                <Button key="submit" type="primary" onClick={uploadImage} disabled={newImagePresent? false :true}>
                  Post
                </Button>,
              ]
            : []
        }
      >
        <div>
          <img
            src={
              newImagePresent
                ? newImage
                : presentUser.imageLink
                ? presentUser.imageLink
                : blank_profile
            }
            alt=""
            className="profile-image-large"
          />
          <br />
          {currentUser.email === presentUser.email ? (
            <>
              <input type="file" hidden id="image-upload" onChange={getImage} />
              <label for="image-upload">Add an image</label>
              {progress === 0 ? <></>:<Progress percent={progress} size="small" />}
            </>
          ) : (
            <></>
          )}
        </div>
      </Modal>
    </>
  );
}

export default FileUploadModal;
