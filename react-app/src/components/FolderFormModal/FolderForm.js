import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import * as folderActions from '../../store/folders'

const FolderForm = ({setShowModal}) => {
  const dispatch = useDispatch()
  const [errors, setErrors] = useState([]);
  const [name, setName] = useState("")
  const [priv, setPriv] = useState(0)
  const [imageLoading, setImageLoading] = useState(false);

  const addFolder = (e) => {
    e.preventDefault();
    setImageLoading(true)
    //reset errors array
    setErrors([]);
    const data = { name, priv };
    return (
      dispatch(
        folderActions.fetchPostFolder(data, setShowModal))
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
      <h2>Upload Folder</h2>
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
        <button type="submit">Add Folder</button>
        {imageLoading && <p>Loading...</p>}
      </div>
    </form>
  );
};

export default FolderForm;
