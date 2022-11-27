import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import EditFileForm from "./EditFileForm";

function EditFileFormModal({file}) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button onClick={() => setShowModal(true)}>Edit</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <EditFileForm setShowModal={setShowModal} file={file} />
        </Modal>
      )}
    </>
  );
}

export default EditFileFormModal;
