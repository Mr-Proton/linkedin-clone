import React from 'react';
import {  Modal, Button } from 'antd';
import './index.scss'

const ModalComponent = ({modalOpen, setModalOpen, setStatus, status, sendStatus}) => {
  return (
    <>
      <Modal
        title="Create a post"
        centered
        open={modalOpen}
        onOk={() => setModalOpen(false)}
        onCancel={() => setModalOpen(false)}
        footer={[
          <Button key="submit" type="primary" disabled={status.length > 0 ? false : true} onClick={sendStatus}>
            Post
          </Button>
        ]}
      >
        <input type="text" className="text" placeholder='What do you want to talk about?' onChange={(event) => setStatus(event.target.value)} value={status}/>
      </Modal>
    </>
  );
};

export default ModalComponent;