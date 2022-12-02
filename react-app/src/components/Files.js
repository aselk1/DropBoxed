import React, { useEffect, useReducer, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import * as fileActions from "../store/files";
import * as folderActions from "../store/folders";
import FileFormModal from "./FileFormModal";
import MenuBar from "./MenuBar";
import filePic from "./images/filePic.png";
import FileDropDownModal from "./FileDropDownModal";
import { DropDownProvider } from "../context/DropDown";

const Files = ({ user, loaded }) => {
  const dispatch = useDispatch();
  const files = useSelector((state) => state.files.files);
  const [fileId, setFileId] = useState(-1);
  const [timeoutId, setTimeoutId] = useState(null);
  const [descId, setDescId] = useState(-1);
  useEffect(() => {
    (async () => {
      if (user.id) {
        await dispatch(fileActions.fetchAllFiles());
        // await dispatch(folderActions.fetchAllFolders());
      }
    })();
  }, [dispatch]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const deleteFile = async (id) => {
    const data = await dispatch(fileActions.fetchDeleteFile(id));
  };

  // const deleteFolder = async (id) => {
  //   const data = await dispatch(folderActions.fetchDeleteFolder(id));
  // };

  const downloadFile = async (id) => {
    const data = await dispatch(fileActions.fetchDownload(id));
  };

  return (
    <div className="flexRow heightFull widthFull">
      <div className="menu fixed">{user.id && <MenuBar loaded={loaded} />}</div>
      <div className="pagePad flexCol width75">
        <h2 className="fontHead">Files</h2>
        <div className="headerPadding flexRow justSpace">
          <FileFormModal />
          <div className="flexCol justEnd">
            <i class="fa-solid fa-star star">My Files</i>
          </div>
        </div>
        {files &&
          files.map((file) => (
            <div>
              <div className="widthFull"></div>
              <div className="widthFull flexRow alignCenter">
                <div
                  className="widthFull flexRow alignCenter justSpace filesPadding plainBorder fileHover"
                  onMouseEnter={() => {
                    setTimeoutId(
                      setTimeout(function () {
                        setDescId(file.id);
                      }, 1000)
                    );
                  }}
                  onMouseLeave={() => {
                    setDescId(-1);
                    clearTimeout(timeoutId);
                  }}
                >
                  <div className="flexRow alignCenter">
                    <img src={filePic} className="filePic"></img>
                    {file.user_id === user.id && (
                      <i class="fa-solid fa-star star"></i>
                    )}
                    <div className="flexCol relative">
                      {file.name.substring(0, 40)}
                      {file.id === descId && file.desc && (
                        <div>
                          <textarea
                            className="descPop absolute"
                            disabled
                            defaultValue={file.desc?.toString()}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="testtest"></div>
                  {file.file_url.split(".")[5].toUpperCase()}
                  <div>
                    <button
                      className="menuButton2"
                      onClick={() => setFileId(file.id)}
                    >
                      <i class="fa-solid fa-ellipsis ellipsis"></i>
                    </button>
                  </div>
                  <div>
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
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Files;
