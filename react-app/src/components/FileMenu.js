import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import EditFolderFormModal from "./EditFolderFormModal";
import * as folderActions from "../store/folders";

function FileMenu({fileId, setFileId, user, folder}) {
  const dispatch = useDispatch()
  useEffect(() => {
    //if menu is closed, return
    // if (!showQueue) return;

    //if menu if open, close it
    const closeFileMenu = () => {
      setFileId(-1);
    };

    //add event listener for closeMenu
    document.body.addEventListener("click", closeFileMenu);
    //clean up function to remove the event listener
    return () => document.body.removeEventListener("click", closeFileMenu);
  }, [fileId]);

  const deleteFolder = async (id) => {
    const data = await dispatch(folderActions.fetchDeleteFolder(id));
  };

  return (
    <div className="fileMenu">
      {user.id === folder.user_id && (
        <button onClick={(e) => deleteFolder(folder.id)}>Delete</button>
      )}
      {user.id === folder.user_id && (
        //   <button onClick={(e) => editFile(file.id)}>Edit</button>
        <EditFolderFormModal folder={folder} />
      )}
    </div>
  );
}

export default FileMenu;
