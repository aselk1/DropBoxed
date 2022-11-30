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
import filePic from "./images/filePic.png";
import FileMenu from "./FileMenu";
import FolderDropDownModal from "./FolderDropDownModal";
import FileDropDownModal from "./FileDropDownModal";
import { DropDownProvider } from "../context/DropDown";

const Home = ({ user, loaded }) => {
  const dispatch = useDispatch();
  const files = useSelector((state) => state.files.files);
  const folders = useSelector((state) => state.folders.folders);
  const [showFileMenu, setShowFileMenu] = useState(false);
  const [folderId, setFolderId] = useState(-1);
  const [folderFilesId, setFolderFilesId] = useState(-1);
  const [fileId, setFileId] = useState(-1);

  console.log(user);
  useEffect(() => {
    (async () => {
      console.log(user);
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

  const folderFiles = (id) => {
    console.log(id, folderFilesId)
    if (folderFilesId === id) {
      setFolderFilesId(-1)
    } else setFolderFilesId(id);
  }
  const folderModal = (id, e) => {
    e.stopPropagation()
    setFolderId(id);
  }

  return (
    <div className="flexRow heightFull widthFull">
      <div className="menu fixed">{user.id && <MenuBar loaded={loaded} />}</div>
      <div className="pagePad flexCol width75">
        <h2>Home</h2>
        <div className="headerPadding">
          <FileFormModal />
          <FolderFormModal />
        </div>
        {folders &&
          folders.map((folder) => (
            <div>
              <div className="widthFull"></div>
              <div
                className="widthFull flexRow alignCenter justSpace filesPadding fileHover pointer"
                onClick={() => folderFiles(folder.id)}
                id={`folderBar${folder.id}`}
              >
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
                      className="menuButton2"
                      onClick={(e) => folderModal(folder.id, e)}
                    >
                      <i class="fa-solid fa-ellipsis ellipsis"></i>
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
              {folder.id === folderFilesId && (
                <FileMenu folder={folder} user={user} />
              )}
            </div>
          ))}
        {files &&
          files.map((file) => (
            <div className="widthFull flexRow alignCenter justSpace filesPadding fileHover">
              <div className="flexRow alignCenter">
                <img src={filePic} className="filePic"></img>
                {file.user_id === user.id && (
                  <i class="fa-solid fa-star star"></i>
                )}
                {file.name.substring(0, 40)}
              </div>
              <div>
                <button
                  className="menuButton2"
                  onClick={() => setFileId(file.id)}
                >
                  <i class="fa-solid fa-ellipsis ellipsis"></i>
                </button>
                <div className="absolute">
                  <DropDownProvider>
                    {fileId === file.id && (
                      <FileDropDownModal
                        setFileId={setFileId}
                        file={file}
                        user={user}
                      />
                    )}
                  </DropDownProvider>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Home;
