import React, { useState } from "react";
// import { Modal } from "../../context/Modal";
import {DropDownModal} from '../../context/DropDown'
import FileDropDownForm from "./FileDropDownForm";

function FileDropDownModal({setFileId, file, user}) {
  const [showModal, setShowModal] = useState(true);

  const run = () => {
    setShowModal(false);
    setFileId(-1)
  }

  return (
    <div className="relative">
      {/* <button onClick={() => run(true, folder.id)}>
        <i class="fa-solid fa-ellipsis"></i>
      </button> */}
      {showModal && (
        <DropDownModal onClose={run}>
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
