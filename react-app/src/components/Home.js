import React, { useEffect, useReducer, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import * as fileActions from '../store/files'
import * as folderActions from '../store/folders'
import FileFormModal from "./FileFormModal";
import EditFileFormModal from "./EditFileFormModal";
import FolderFormModal from "./FolderFormModal";

const Home = ({user}) => {
    const dispatch = useDispatch();
    const files = useSelector(state => state.files.files)
    const folders = useSelector(state => state.folders.folders)

    useEffect(() => {
            (async () => {
                await dispatch(fileActions.fetchAllFiles())
                await dispatch(folderActions.fetchAllFolders())
            })();
    },[dispatch])

    const deleteFile = async (id) => {
        const data = await dispatch(fileActions.fetchDeleteFile(id))
    }

    const deleteFolder = async (id) => {
      const data = await dispatch(folderActions.fetchDeleteFolder(id));
    };

  return (
    <div className="pagePad">
      <h2>Home</h2>
      <div>
        <FileFormModal />
        <FolderFormModal />
      </div>
      {files &&
        files.map((file) => (
          <div>
            {file.name}
            {user.id === file.user_id && (
              <button onClick={(e) => deleteFile(file.id)}>Delete</button>
            )}
            {user.id === file.user_id && (
              //   <button onClick={(e) => editFile(file.id)}>Edit</button>
              <EditFileFormModal file={file} />
            )}
          </div>
        ))}
      {folders &&
        folders.map((folder) => (
          <div>
            {folder.name}
            {user.id === folder.user_id && (
              <button onClick={(e) => deleteFolder(folder.id)}>Delete</button>
            )}
          </div>
        ))}
    </div>
  );
};

export default Home;
