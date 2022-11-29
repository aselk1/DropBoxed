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
        <button onClick={(e) => deleteFile(file.id)}>Delete</button>
      )}
      {user.id === file.user_id && (
        //   <button onClick={(e) => editFile(file.id)}>Edit</button>
        <EditFileFormModal file={file} />
      )}
      {/* <button onClick={(e) => downloadFile(file.id)}>Download</button> */}
      <a href={file.file_url} download>
        Download
      </a>
    </div>
  );
};

export default FileDropDownForm;
