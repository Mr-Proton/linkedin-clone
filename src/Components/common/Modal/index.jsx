import React, { useState } from "react";
import { Modal, Button, Progress } from "antd";
import "./index.scss";
import { AiOutlinePicture } from 'react-icons/ai'

const ModalComponent = ({
  modalOpen,
  setModalOpen,
  setStatus,
  status,
  sendStatus,
  setIsEdit,
  isEdit,
  updateStatus,
  uploadPostImage,
  setPostImage,
  postImage
}) => {
  const [progress, setProgress] = useState(0);
  return (
    <>
      <Modal
        title={isEdit ? "Edit post" : "Create a post"}
        centered
        open={modalOpen}
        onOk={() => {
          setModalOpen(false);
          setStatus("");
          setIsEdit(false);
          setPostImage('')
        }}
        onCancel={() => {
          setModalOpen(false);
          setStatus("");
          setIsEdit(false);
          setPostImage('')
        }}
        footer={[
          <Button
            key="submit"
            type="primary"
            disabled={status.length > 0 ? false : true}
            onClick={isEdit ? updateStatus : sendStatus}
          >
            {isEdit ? "Edit" : "Post"}
          </Button>,
        ]}
      >
        <textarea
          type="text"
          rows={3}
          cols={3}
          className="text"
          placeholder="What do you want to talk about?"
          onChange={(event) => setStatus(event.target.value)}
          value={status}
        />
        {postImage? <img src={postImage} alt="" className="post-image"/> : <></>}
        {progress === 0 ? <></>:<Progress percent={progress} size="small" />}
        <label for="pic-upload"><AiOutlinePicture size={30} className="picture-icon"/></label>
        <input type="file" id="pic-upload" hidden onChange={(event) => {
          uploadPostImage(event.target.files[0], setPostImage, setProgress)
          }}/>
        
      </Modal>
    </>
  );
};

export default ModalComponent;
