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

  const addFolder = (e) => {
    e.preventDefault();
    setImageLoading(true);
    //reset errors array
    setErrors([]);
    const data = { name, priv };
    return (
      dispatch(folderActions.fetchEditFolder(data, setShowModal, folder.id))
        //catch res and or errors
        .catch(async (res) => {
          const data = await res.json();
          if (data && data.errors) {
            setErrors(Object.values(data.errors));
          }
        })
    );
  };

  const setPrivate = () => {
    if ((priv === 0) | (priv === false)) setPriv(1);
    else setPriv(0);
  };

  const addFile = async (fileId, e) => {
    e.preventDefault()
    await dispatch(folderActions.fetchAddFile(folder.id, fileId))
  }

  return (
    <form onSubmit={addFolder}>
      <h2>Edit Folder</h2>
      <div className="flexCol">
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
          name="private"
          type="checkbox"
          // placeholder="File Name"
          checked={priv}
          onClick={(e) => setPrivate()}
        />
        <div>
          <h4>Remove Files</h4>
          {folder &&
            folder.files.map((file) => (
              <div>
                {file.name}
                <button>Remove</button>
              </div>
            ))}
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
        <button type="submit">Edit Folder</button>
        {imageLoading && <p>Loading...</p>}
      </div>
    </form>
  );
};

export default EditFolderForm;
