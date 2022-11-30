import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import EditFolderForm from "./EditFolderForm";

function EditFolderFormModal({folder}) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button className="dropDownButton" onClick={() => setShowModal(true)}>
        <div className="flexRow alignCenter">
          <i class="fa-solid fa-pen-to-square dropDownIcon leftPad"></i>
          <div className="dropDownIcon font leftPad">Edit</div>
        </div>
      </button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <EditFolderForm setShowModal={setShowModal} folder={folder} />
        </Modal>
      )}
    </>
  );
}

export default EditFolderFormModal;
