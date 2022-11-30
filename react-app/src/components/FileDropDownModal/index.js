import React, { useState } from "react";
// import { Modal } from "../../context/Modal";
import {DropDownModal} from '../../context/DropDown'
import FileDropDownForm from "./FileDropDownForm";

function FileDropDownModal({setFileId, file, user}) {
  const [showModal, setShowModal] = useState(true);

  const run = (e) => {
    e.stopPropagation()
    setShowModal(false);
    setFileId(-1)
  }

  return (
    <div className="relative">
      {showModal && (
        <DropDownModal onClose={(e) => run(e)}>
          <FileDropDownForm
            setShowModal={setShowModal}
            user={user}
            file={file}
          />
        </DropDownModal>
      )}
    </div>
  );
}

export default FileDropDownModal;
