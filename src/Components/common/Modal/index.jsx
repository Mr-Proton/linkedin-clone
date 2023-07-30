import React, { useState } from "react";
import { Modal, Button } from "antd";
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
  currentImage,
  setCurrentImage
}) => {
  const [newImage, setNewImage] = useState();
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
          setNewImage()
        }}
        onCancel={() => {
          setModalOpen(false);
          setStatus("");
          setIsEdit(false);
          setNewImage()
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
        {newImage? <img src={newImage} alt="" className="post-image"/> : <></>}
        <label for="pic-upload"><AiOutlinePicture size={30} className="picture-icon"/></label>
        <input type="file" id="pic-upload" hidden onChange={(event) => {
          setCurrentImage(event.target.files[0])
          setNewImage(URL.createObjectURL(event.target.files[0]));
          }}/>
        
      </Modal>
    </>
  );
};

export default ModalComponent;
