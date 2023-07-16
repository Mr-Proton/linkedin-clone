import React from 'react';
import {  Modal, Button } from 'antd';
import './index.scss'
import { onLogout } from '../../../api/AuthAPI';

const LogoutModal = ({modalOpen, setModalOpen}) => {
  return (
    <>
      <Modal
        title=""
        style={{top:'70px', position:'absolute', right:'5%', minHeight:'300px'}}
        width={300}
        open={modalOpen}
        onOk={() => setModalOpen(false)}
        onCancel={() => setModalOpen(false)}
        footer={[
          <Button key="submit" type="primary" onClick={onLogout}>
            Logout
          </Button>
        ]}
      > 
      <br />
      </Modal>
    </>
  );
};

export default LogoutModal;