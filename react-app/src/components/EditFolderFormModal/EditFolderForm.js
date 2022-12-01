import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import * as folderActions from "../../store/folders";

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
    <form onSubmit={addFolder}>
      <h2>Edit Folder</h2>
      <div className="flexCol">
        <div>
          {errors.map((error, ind) => (
            <div key={ind}>{error}</div>
          ))}
        </div>
        <label htmlFor="name">Name</label>
        <input
          name="name"
          type="text"
          placeholder="Folder Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          className="pointer"
          name="private"
          type="checkbox"
          // placeholder="File Name"
          defaultChecked={priv}
          onClick={(e) => setPrivate()}
        />
        <div>
          <h4>Remove Files</h4>
          {folder &&
            folder.files.map((file) => {
              if (folder.files.map((file) => file.id).includes(file.id)) {
                return (
                  <div>
                    {file.name}
                    <button onClick={(e) => removeFile(file.id, e)}>
                      Remove
                    </button>
                  </div>
                );
              }
              return null;
            })}
        </div>
        <div>
          <h4>Add Files</h4>
          {files &&
            files.map((file) => {
              if (!folder.files.map((file) => file.id).includes(file.id)) {
                return (
                  <div>
                    {file.name}
                    <button onClick={(e) => addFile(file.id, e)}>Add</button>
                  </div>
                );
              }
              return null;
            })}
        </div>
        <div className="flexRow alignCenter widthFull justEnd">
          <button className="createButton2" type="submit">
            {imageLoading && "Loading..."}
            {!imageLoading && "Edit"}
          </button>
        </div>
      </div>
    </form>
  );
};

export default EditFolderForm;
