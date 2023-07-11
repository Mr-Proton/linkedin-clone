import React, { useState } from "react";
import "./index.scss";
import ModalComponent from "../Modal/index";

function PostStatus() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="post-status-main">
      <div className="post-status">
        <button className="create-post" onClick={() => setModalOpen(true)}>
          Start a post
        </button>
      </div>
      <ModalComponent modalOpen={modalOpen} setModalOpen={setModalOpen} />
    </div>
  );
}

export default PostStatus;
