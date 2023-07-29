import React from "react";
import { Modal, Button } from "antd";
import "./index.scss";

const ModalComponent = ({
  modalOpen,
  setModalOpen,
  setStatus,
  status,
  sendStatus,
  setIsEdit,
  isEdit,
  updateStatus
}) => {
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
        }}
        onCancel={() => {
          setModalOpen(false);
          setStatus("");
          setIsEdit(false);
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
        <input
          type="text"
          className="text"
          placeholder="What do you want to talk about?"
          onChange={(event) => setStatus(event.target.value)}
          value={status}
        />
      </Modal>
    </>
  );
};

export default ModalComponent;
