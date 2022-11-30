import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import FolderForm from "./FolderForm";

function FolderFormModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button className="createButton" onClick={() => setShowModal(true)}>
        <div className="flexRow justEven alignCenter">
          <i class="fa-solid fa-plus createIcon"></i>
          <div className="createIcon font">Create</div>
        </div>
      </button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <FolderForm setShowModal={setShowModal} />
        </Modal>
      )}
    </>
  );
}

export default FolderFormModal;
