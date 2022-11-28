import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import EditFolderForm from "./EditFolderForm";

function EditFolderFormModal({folder}) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button onClick={() => setShowModal(true)}>Edit</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <EditFolderForm setShowModal={setShowModal} folder={folder} />
        </Modal>
      )}
    </>
  );
}

export default EditFolderFormModal;
