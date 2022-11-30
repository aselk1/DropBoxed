import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import * as folderActions from '../../store/folders';
import folderPic from "../images/folderPic.png";

const FolderForm = ({setShowModal}) => {
  const dispatch = useDispatch()
  const [errors, setErrors] = useState([]);
  const [name, setName] = useState("")
  const [priv, setPriv] = useState(0)
  const [imageLoading, setImageLoading] = useState(false);

  const addFolder = async (e) => {
    e.preventDefault();
    setImageLoading(true)
    //reset errors array
    setErrors([]);
    const data = { name, priv };
    const dispatchData = await dispatch(
      folderActions.fetchPostFolder(data, setShowModal)
    );
    if (dispatchData) {
      setErrors(dispatchData);
      setImageLoading(false)
    }
    //catch res and or errors
  };


  const setPrivate = () => {
    if (priv === 0) setPriv(1)
    else setPriv(0)
  }

  return (
    <form onSubmit={addFolder}>
      <div>
        {errors.map((error, ind) => (
          <div key={ind}>{error}</div>
        ))}
      </div>
      <div className="flexRow alignCenter leftPad rightPad plainBorder">
        <img src={folderPic} className="folderPic"></img>
        <h2 className="fontHead">Create Folder</h2>
      </div>
      <div className="flexCol fullPad">
        <label className="font filesPadding" htmlFor="name">
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
          <label className="font filesPadding" htmlFor="private">
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
        <div className="flexRow alignCenter widthFull justEnd">
          <button className="createButton2" type="submit">
            {imageLoading && "Loading..."}
            {!imageLoading && "Create"}
          </button>
        </div>
      </div>
    </form>
  );
};

export default FolderForm;
