import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import * as folderActions from '../../store/folders'

const EditFolderForm = ({folder, setShowModal}) => {
  const dispatch = useDispatch()
  const [errors, setErrors] = useState([]);
  const [name, setName] = useState(folder.name)
  const [priv, setPriv] = useState(folder.private)
  const [imageLoading, setImageLoading] = useState(false);

  const addFolder = (e) => {
    e.preventDefault();
    setImageLoading(true)
    //reset errors array
    setErrors([]);
    const data = { name, priv };
    return (
      dispatch(
        folderActions.fetchEditFolder(data, setShowModal, folder.id))
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
    if (priv === 0) setPriv(1)
    else setPriv(0)
  }

  return (
    <form onSubmit={addFolder}>
      <h2>Edit Folder</h2>
      <div>
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
          onChange={setPrivate}
        />
        <button type="submit">Edit Folder</button>
        {imageLoading && <p>Loading...</p>}
      </div>
    </form>
  );
};

export default EditFolderForm;
