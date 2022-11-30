import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import * as fileActions from '../../store/files';
import EditFileFormModal from "../EditFileFormModal";

const FileDropDownForm = ({setShowModal, user, file}) => {
  const dispatch = useDispatch()

  const deleteFile = async (id) => {
    const data = await dispatch(fileActions.fetchDeleteFile(id));
  };
  return (
    <div className="flexCol">
      {user.id === file.user_id && (
        <button className="dropDownButton" onClick={(e) => deleteFile(file.id)}>
          <div className="flexRow alignCenter">
            <i class="fa-solid fa-trash dropDownIcon leftPad"></i>
            <div className="dropDownIcon font leftPad">Delete</div>
          </div>
        </button>
      )}
      {user.id === file.user_id && (
        //   <button onClick={(e) => editFile(file.id)}>Edit</button>
        <EditFileFormModal file={file} />
      )}
      <button className="dropDownButton">
        <div className="flexRow alignCenter">
          <i class="fa-solid fa-upload dropDownIcon leftPad"></i>
          <div className="dropDownIcon font leftPad">
            <a href={file.file_url} download>
              Download
            </a>
          </div>
        </div>
      </button>
    </div>
  );
};

export default FileDropDownForm;
