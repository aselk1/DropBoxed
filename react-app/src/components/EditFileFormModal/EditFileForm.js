import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import * as fileActions from '../../store/files'

const EditFileForm = ({file, setShowModal}) => {
  const dispatch = useDispatch()
  const [errors, setErrors] = useState([]);
  const [name, setName] = useState(file.name)
  const [desc, setDesc] = useState(file.desc);
  const [priv, setPriv] = useState(file.private)
  const [newFile, setNewFile] = useState(null);
  const [imageLoading, setImageLoading] = useState(false);

  const addFile = (e) => {
    e.preventDefault();
    setImageLoading(true)
    //reset errors array
    setErrors([]);
    const data = { name, desc, priv, newFile };
    return (
      dispatch(
        fileActions.fetchEditFile(data, setShowModal, file.id))
        //catch res and or errors
        .catch(async (res) => {
          const data = await res.json();
          if (data && data.errors) {
            setErrors(Object.values(data.errors));
          }
        })
    );
  };

  const updateFile = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size / 1000000 <= 10) setNewFile(file);
      else {
        e.target.value = "";
        alert("File size must be 10MB or less.");
        return false;
      }
      // if (file.type.split("/")[0] !== "audio") {
      //   e.target.value = "";
      //   alert("File must be an audio file.");
      //   return false;
      // }
    }
  };

  const setPrivate = () => {
    if (priv === 0 | priv === false) setPriv(1)
    else setPriv(0)
  }

  return (
    <form onSubmit={addFile}>
      <h2>Edit File</h2>
      <div>
        <label htmlFor="name">Name</label>
        <input
          name="name"
          type="text"
          placeholder="File Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <label htmlFor="desc">Description</label>
        <textarea
          name="desc"
          type="textarea"
          placeholder="File Description"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        />
        <input
          name="private"
          type="checkbox"
          // placeholder="File Name"
          checked={priv}
          onChange={setPrivate}
        />
        <input
          // placeholder="Drag Song Here"
          type="file"
          // value={url}
          onChange={updateFile}
        />
        <button type="submit">Add File</button>
        {imageLoading && <p>Loading...</p>}
      </div>
    </form>
  );
};

export default EditFileForm;
