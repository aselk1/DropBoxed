import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import FolderForm from "./FolderForm";

function FolderFormModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button onClick={() => setShowModal(true)}>Create</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <FolderForm setShowModal={setShowModal} />
        </Modal>
      )}
    </>
  );
}

export default FolderFormModal;
