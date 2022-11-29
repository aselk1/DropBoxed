import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import * as fileActions from '../../store/files'
import EditFolderFormModal from "../EditFolderFormModal";
import * as folderActions from "../../store/folders";

const FolderDropDownForm = ({setShowModal, user, folder}) => {
  const dispatch = useDispatch()

  const deleteFolder = async (id) => {
    const data = await dispatch(folderActions.fetchDeleteFolder(id));
  };

  return (
    <div className="flexCol">
      {user.id === folder.user_id && (
        <button onClick={(e) => deleteFolder(folder.id)}>Delete</button>
      )}
      {user.id === folder.user_id && (
        //   <button onClick={(e) => editFile(file.id)}>Edit</button>
        <EditFolderFormModal folder={folder} />
      )}
    </div>
  );
};

export default FolderDropDownForm;
