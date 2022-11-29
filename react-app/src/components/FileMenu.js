import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import EditFolderFormModal from "./EditFolderFormModal";
import * as folderActions from "../store/folders";
import filePic from "./images/filePic.png";
import FileDropDownModal from "./FileDropDownModal";
import { DropDownProvider } from "../context/DropDown";

function FileMenu({ user, folder }) {
  const [fileId, setFileId] = useState(-1);

  return (
    <div>
      {folder.files[0] &&
        folder.files.map((file) => (
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
      {!folder.files[0] && <div>No Files</div>}
    </div>
  );
}

export default FileMenu;
