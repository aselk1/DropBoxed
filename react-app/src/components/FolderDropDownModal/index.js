import React, { useState } from "react";
// import { Modal } from "../../context/Modal";
import {DropDownModal} from '../../context/DropDown'
import FolderDropDownForm from "./FolderDropDownForm";

function FolderDropDownModal({setFolderId, folder, user}) {
  const [showModal, setShowModal] = useState(true);

  const run = () => {
    setShowModal(false);
    setFolderId(-1)
  }

  return (
    <div className="relative">
      {showModal && (
        <DropDownModal onClose={run}>
          <FolderDropDownForm
            setShowModal={setShowModal}
            user={user}
            folder={folder}
          />
        </DropDownModal>
      )}
    </div>
  );
}

export default FolderDropDownModal;
