import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import * as fileActions from "../../store/files";
import filePic from '../images/filePic.png'

const FileForm = ({ setShowModal }) => {
  const dispatch = useDispatch();
  const [errors, setErrors] = useState([]);
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [priv, setPriv] = useState(0);
  const [file, setFile] = useState(null);
  const [imageLoading, setImageLoading] = useState(false);

  const addFile = async (e) => {
    e.preventDefault();
    setImageLoading(true);
    //reset errors array
    setErrors([]);
    const data = { name, desc, priv, file };
    const dispatchData = await dispatch(
      fileActions.fetchPostFile(data, setShowModal)
    );
    if (dispatchData) {
      setErrors(dispatchData);
      setImageLoading(false)
    }
    //catch res and or errors
  };

  const updateFile = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size / 1000000 <= 10) setFile(file);
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
    if (priv === 0) setPriv(1);
    else setPriv(0);
  };

  return (
    <form onSubmit={addFile}>
      <div>
        {errors.map((error, ind) => (
          <div key={ind}>{error}</div>
        ))}
      </div>
      <div className="flexRow alignCenter leftPad rightPad plainBorder">
        <img src={filePic} className="filePic"></img>
        <h2 className="fontHead">Upload File</h2>
      </div>
      <div className="flexCol fullPad">
        <label className="font filesPadding" htmlFor="name">
          Name
        </label>
        <input
          name="name"
          type="text"
          placeholder="File Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <label className="font filesPadding" htmlFor="desc">
          Description
        </label>
        <textarea
          name="desc"
          type="textarea"
          placeholder="File Description"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
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
        <input
          type="file"
          // value={url}
          onChange={updateFile}
          required
        />
        <div className="flexRow alignCenter widthFull justEnd">
          <button className="createButton2" type="submit">
            {imageLoading && "Loading..."}
            {!imageLoading && "Upload"}
          </button>
        </div>
      </div>
    </form>
  );
};

export default FileForm;
