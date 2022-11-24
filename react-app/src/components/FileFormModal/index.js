import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import FileForm from "./FileForm";

function FileFormModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button onClick={() => setShowModal(true)}>Upload</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <FileForm setShowModal={setShowModal} />
        </Modal>
      )}
    </>
  );
}

export default FileFormModal;
