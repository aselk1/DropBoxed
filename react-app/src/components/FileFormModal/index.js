import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import FileForm from "./FileForm";

function FileFormModal({folder}) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button className="uploadButton" onClick={() => setShowModal(true)}>
        <div className="flexRow justEven alignCenter">
          <i class="fa-solid fa-upload uploadIcon"></i>
          <div className="uploadIcon font">Upload</div>
        </div>
      </button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <FileForm setShowModal={setShowModal} />
        </Modal>
      )}
    </>
  );
}

export default FileFormModal;
