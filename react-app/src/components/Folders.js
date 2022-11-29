import React, { useEffect, useReducer, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import * as fileActions from "../store/files";
import * as folderActions from "../store/folders";
import FileFormModal from "./FileFormModal";
import EditFileFormModal from "./EditFileFormModal";
import FolderFormModal from "./FolderFormModal";
import EditFolderFormModal from "./EditFolderFormModal";
import { DropDownProvider } from "../context/DropDown";
import FolderDropDownModal from "./FolderDropDownModal";
import MenuBar from "./MenuBar";
import folderPic from "./images/folderPic.png";

const Folders = ({ user, loaded }) => {
  const dispatch = useDispatch();
  const files = useSelector((state) => state.files.files);
  const folders = useSelector((state) => state.folders.folders);
  const [folderId, setFolderId] = useState(-1);

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
    <div className="flexRow heightFull widthFull">
      <div className="menu fixed">{user.id && <MenuBar loaded={loaded} />}</div>
      <div className="pagePad flexCol width75">
        <h2>Home</h2>
        <div className="headerPadding">
          <FolderFormModal />
        </div>
        {folders &&
          folders.map((folder) => (
            <div className="widthFull flexRow alignCenter justSpace filesPadding">
              <div className="flexRow alignCenter">
                <img src={folderPic} className="folderPic"></img>
                {folder.user_id === user.id && (
                  <i class="fa-solid fa-star star"></i>
                )}
                {folder.name.substring(0, 40)}
              </div>
              {folder.user_id === user.id && (
                <div>
                  <button
                    className="queueButton"
                    onClick={() => setFolderId(folder.id)}
                  >
                    <i class="fa-solid fa-ellipsis"></i>
                  </button>
                  <div className="absolute">
                    <DropDownProvider>
                      {folderId === folder.id && (
                        <FolderDropDownModal
                          setFolderId={setFolderId}
                          folder={folder}
                          user={user}
                        />
                      )}
                    </DropDownProvider>
                  </div>
                </div>
              )}
            </div>
          ))}
      </div>
    </div>
  );
};

export default Folders;
