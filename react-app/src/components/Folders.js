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
import FileMenu from "./FileMenu";
import folderPic from "./images/folderPic.png";

const Folders = ({ user, loaded }) => {
  const dispatch = useDispatch();
  const files = useSelector((state) => state.files.files);
  const folders = useSelector((state) => state.folders.folders);
  const [folderId, setFolderId] = useState(-1);
  const [folderFilesId, setFolderFilesId] = useState(-1);

  useEffect(() => {
    (async () => {
      if (user.id) {
        await dispatch(fileActions.fetchAllFiles());
        await dispatch(folderActions.fetchAllFolders());
      }
    })();
  }, [dispatch]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const deleteFile = async (id) => {
    const data = await dispatch(fileActions.fetchDeleteFile(id));
  };

  const deleteFolder = async (id) => {
    const data = await dispatch(folderActions.fetchDeleteFolder(id));
  };

  const downloadFile = async (id) => {
    const data = await dispatch(fileActions.fetchDownload(id));
  };

  const folderFiles = (id) => {
    if (folderFilesId === id) {
      setFolderFilesId(-1);
    } else setFolderFilesId(id);
  };

  const folderModal = (id, e) => {
    e.stopPropagation();
    setFolderId(id);
  };

  return (
    <div className="flexRow heightFull widthFull">
      <div className="menu fixed">{user.id && <MenuBar loaded={loaded} />}</div>
      <div className="pagePad flexCol width75">
        <h2 className="fontHead">Folders</h2>
        <div className="headerPadding">
          <FolderFormModal />
        </div>
        {folders &&
          folders.map((folder) => (
            <div>
              <div className="widthFull"></div>
              <div
                className="widthFull flexRow alignCenter"
                id={`folderBar${folder.id}`}
              >
                <div
                  className="flexRow widthFull alignCenter fileHover pointer plainBorder filesPadding"
                  onClick={() => folderFiles(folder.id)}
                >
                  <div className="flexRow alignCenter">
                    <img src={folderPic} className="folderPic"></img>
                    {folder.user_id === user.id && (
                      <i class="fa-solid fa-star star"></i>
                    )}
                    {folder.name.substring(0, 40)}
                  </div>
                  <div className="testtest"></div>
                  {folder.user_id === user.id && (
                    <button
                      className="menuButton2"
                      onClick={(e) => folderModal(folder.id, e)}
                    >
                      <i class="fa-solid fa-ellipsis ellipsis"></i>
                    </button>
                  )}
                </div>
                {folder.user_id === user.id && (
                  <div>
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
              {folder.id === folderFilesId && (
                <FileMenu folder={folder} user={user} />
              )}
            </div>
          ))}
      </div>
    </div>
  );
};

export default Folders;
