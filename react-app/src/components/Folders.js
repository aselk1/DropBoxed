import React, { useEffect, useReducer, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import * as fileActions from "../store/files";
import * as folderActions from "../store/folders";
import FileFormModal from "./FileFormModal";
import EditFileFormModal from "./EditFileFormModal";
import FolderFormModal from "./FolderFormModal";
import EditFolderFormModal from "./EditFolderFormModal";
import MenuBar from "./MenuBar";
import folderPic from "./images/folderPic.png";

const Folders = ({ user, loaded }) => {
  const dispatch = useDispatch();
  const files = useSelector((state) => state.files.files);
  const folders = useSelector((state) => state.folders.folders);

  useEffect(() => {
    (async () => {
      if (user.id) {
        console.log("Home useEffect");
        await dispatch(fileActions.fetchAllFiles());
        await dispatch(folderActions.fetchAllFolders());
      }
    })();
  }, [dispatch]);

  const deleteFile = async (id) => {
    const data = await dispatch(fileActions.fetchDeleteFile(id));
  };

  const deleteFolder = async (id) => {
    const data = await dispatch(folderActions.fetchDeleteFolder(id));
  };

  const downloadFile = async (id) => {
    const data = await dispatch(fileActions.fetchDownload(id));
    console.log(data);
  };

  return (
    <div className="flexRow heightFull">
      <div className="menu fixed">{user.id && <MenuBar loaded={loaded} />}</div>
      <div className="pagePad flexCol">
        <h2>Folders</h2>
        <div>
          {/* <FileFormModal /> */}
          <FolderFormModal />
        </div>
        {/* {files &&
          files.map((file) => (
            <div>
              {file.name}
              {user.id === file.user_id && (
                <button onClick={(e) => deleteFile(file.id)}>Delete</button>
              )}
              {user.id === file.user_id && (
                <EditFileFormModal file={file} />
              )}
              <a href={file.file_url} download>
                Download
              </a>
            </div>
          ))} */}
        {folders &&
          folders.map((folder) => (
            <div>
              <img src={folderPic} className="folderPic"></img>
              {folder.name}
              {user.id === folder.user_id && (
                <button onClick={(e) => deleteFolder(folder.id)}>Delete</button>
              )}
              {user.id === folder.user_id && (
                //   <button onClick={(e) => editFile(file.id)}>Edit</button>
                <EditFolderFormModal folder={folder} />
              )}
            </div>
          ))}
      </div>
    </div>
  );
};

export default Folders;
