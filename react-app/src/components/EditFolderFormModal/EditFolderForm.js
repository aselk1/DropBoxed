import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import * as folderActions from "../../store/folders";
import folderPic from "../images/folderPic.png";

const EditFolderForm = ({ folder, setShowModal, user }) => {
  const files = useSelector((state) => state.files.files);
  const dispatch = useDispatch();
  const [errors, setErrors] = useState([]);
  const [name, setName] = useState(folder.name);
  const [priv, setPriv] = useState(folder.private);
  const [imageLoading, setImageLoading] = useState(false);

  const addFolder = async (e) => {
    e.preventDefault();
    setImageLoading(true);
    //reset errors array
    setErrors([]);
    const data = { name, priv };
    const dispatchData = await dispatch(
      folderActions.fetchEditFolder(data, setShowModal, folder.id)
    );
    if (dispatchData) {
      setErrors(dispatchData);
      setImageLoading(false);
    }
    //catch res and or errors
  };

  const setPrivate = () => {
    if ((priv === 0) | (priv === false)) setPriv(1);
    else setPriv(0);
  };

  const addFile = async (fileId, e) => {
    e.preventDefault();
    await dispatch(folderActions.fetchAddFile(folder.id, fileId));
  };

  const removeFile = async (fileId, e) => {
    e.preventDefault();
    await dispatch(folderActions.fetchRemoveFile(folder.id, fileId));
  };

  return (
    <form onSubmit={addFolder} className="formContainer">
      <div className="flexRow alignCenter leftPad rightPad plainBorder">
        <img src={folderPic} className="folderPic"></img>
        <h2 className="fontHead">Edit Folder</h2>
      </div>
      <div className="flexCol fullPad heightCreate">
        <div>
          {errors.map((error, ind) => (
            <div key={ind}>{error}</div>
          ))}
        </div>
        <label className="font inputsPadding" htmlFor="name">
          Name
        </label>
        <input
          name="name"
          type="text"
          placeholder="Folder Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <div className="flexRow alignCenter">
          <label className="font inputsPadding" htmlFor="private">
            Private
          </label>
          <input
            className="pointer"
            name="private"
            type="checkbox"
            // placeholder="File Name"
            checked={priv}
            onChange={setPrivate}
          />
        </div>
        <h4 className="fontHead2">Remove Files</h4>
        <div className="removeFiles">
          {folder &&
            folder.files.map((file) => {
              if (folder.files.map((file) => file.id).includes(file.id)) {
                return (
                  <div className="flexRow justSpace removePadding alignCenter">
                    {file.name.substring(0, 40)}
                    <i
                      class="fa-solid fa-xmark pointer rightPad xmark"
                      onClick={(e) => removeFile(file.id, e)}
                    ></i>
                  </div>
                );
              }
              return null;
            })}
        </div>
        <h4 className="fontHead2">Add Files</h4>
        <div className="removeFiles">
          {files &&
            files.map((file) => {
              if (!folder.files.map((file) => file.id).includes(file.id)) {
                return (
                  <div className="flexRow justSpace removePadding alignCenter">
                    {file.name.substring(0, 40)}
                    <i
                      class="fa-solid fa-check pointer rightPad checkMark"
                      onClick={(e) => addFile(file.id, e)}
                    ></i>
                  </div>
                );
              }
              return null;
            })}
        </div>
        <div className="flexCol justEnd heightEdit">
          <div className="flexRow alignCenter widthFull justEnd">
            <button className="createButton2" type="submit">
              {imageLoading && "Loading..."}
              {!imageLoading && "Edit"}
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default EditFolderForm;
