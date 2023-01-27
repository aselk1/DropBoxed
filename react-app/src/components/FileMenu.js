import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import EditFolderFormModal from "./EditFolderFormModal";
import * as folderActions from "../store/folders";
import * as sessionActions from "../store/session";
import filePic from "./images/filePic.png";
import FileDropDownModal from "./FileDropDownModal";
import { DropDownProvider } from "../context/DropDown";

function FileMenu({ user, folder }) {
  const dispatch = useDispatch();
  const [fileId, setFileId] = useState(-1);
  const [timeoutId, setTimeoutId] = useState(null);
  const [descId, setDescId] = useState(-1);
  const fav_files = user.fav_files.map((file) => file.id);

  const addFavFile = async (userId, fileId) => {
    await dispatch(sessionActions.fetch_add_fav_file(userId, fileId));
    console.log(fav_files);
  };
  const removeFavFile = async (userId, fileId) => {
    await dispatch(sessionActions.fetch_delete_fav_file(userId, fileId));
  };

  return (
    <div className="folderBarPadding">
      {folder.files[0] && (
        <div className="plainBorderTop">
          {folder.files.map((file) => (
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
                  {file.file_url
                    .split(".")
                    [file.file_url.split(".").length - 1].toUpperCase()}
                  <div>
                    {!fav_files.includes(file.id) && (
                      <i
                        class="fa-regular fa-bookmark marginLeft pointer"
                        onClick={() => {
                          addFavFile(user.id, file.id);
                        }}
                      ></i>
                    )}
                    {fav_files.includes(file.id) && (
                      <i
                        class="fa-solid fa-bookmark marginLeft pointer"
                        onClick={() => {
                          removeFavFile(user.id, file.id);
                        }}
                      ></i>
                    )}
                  </div>
                  <div>
                    <button
                      className="menuButton2"
                      onClick={() => {
                        setDescId(-1);
                        clearTimeout(timeoutId);
                        setFileId(file.id);
                      }}
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
      )}
      {!folder.files[0] && <div>No Files</div>}
    </div>
  );
}

export default FileMenu;
