import React from 'react';
import {  Modal } from 'antd';
import './index.scss'

const ModalComponent = ({modalOpen, setModalOpen}) => {
  return (
    <>
      <Modal
        title="Create a post"
        centered
        open={modalOpen}
        onOk={() => setModalOpen(false)}
        onCancel={() => setModalOpen(false)}
      >
        <input type="text" className="text" placeholder='What do you want to talk about?'/>
      </Modal>
    </>
  );
};

export default ModalComponent;