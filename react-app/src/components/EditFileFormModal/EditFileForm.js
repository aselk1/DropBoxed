import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import * as fileActions from "../../store/files";
import filePic from "../images/filePic.png";

const EditFileForm = ({ file, setShowModal }) => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users.users);
  const currentUser = useSelector((state) => state.session.user);
  const [errors, setErrors] = useState([]);
  const [name, setName] = useState(file.name);
  const [desc, setDesc] = useState(file.desc || "");
  const [priv, setPriv] = useState(file.private);
  const [newFile, setNewFile] = useState(null);
  const [imageLoading, setImageLoading] = useState(false);

  const addFile = async (e) => {
    e.preventDefault();
    setImageLoading(true);
    //reset errors array
    setErrors([]);
    const data = { name, desc, priv, newFile };
    const dispatchData = await dispatch(
      fileActions.fetchEditFile(data, setShowModal, file.id)
    );
    if (dispatchData) {
      setErrors(dispatchData);
      setImageLoading(false);
    }
    //catch res and or errors
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
    if ((priv === 0) | (priv === false)) setPriv(1);
    else setPriv(0);
  };

  const addUser = async (userId, e) => {
    e.preventDefault();
    await dispatch(fileActions.fetchAddUser(file.id, userId));
  };

  const removeUser = async (userId, e) => {
    e.preventDefault();
    await dispatch(fileActions.fetchRemoveUser(file.id, userId));
  };

  return (
    <form onSubmit={addFile} className="formContainer">
      <div className="flexRow alignCenter leftPad rightPad plainBorder">
        <img src={filePic} className="filePic"></img>
        <h2 className="fontHead">Edit File</h2>
      </div>
      <div className="flexCol fullPad heightCreate scroll">
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
          placeholder="File Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <label className="font inputsPadding" htmlFor="desc">
          Description
        </label>
        <textarea
          name="desc"
          type="textarea"
          placeholder="File Description"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          className="height100"
        />
        <div className="flexRow alignCenter inputsPadding">
          <label className="font" htmlFor="private">
            Private
          </label>
          <input
            className="pointer"
            name="private"
            type="checkbox"
            checked={priv}
            onChange={setPrivate}
          />
        </div>
        <input
          className="inputsPadding height30"
          // placeholder="Drag Song Here"
          type="file"
          // value={url}
          onChange={updateFile}
        />
        <h4 className="fontHead2">Add User Access</h4>
        <div className="removeFiles">
          {users &&
            users.map((user) => {
              if (
                !file.users.map((user) => user.id).includes(user.id) &&
                user.id !== currentUser.id
              ) {
                return (
                  <div className="flexRow justSpace removePadding alignCenter">
                    {user.username}
                    <i
                      class="fa-solid fa-check pointer rightPad checkMark"
                      onClick={(e) => addUser(user.id, e)}
                    ></i>
                  </div>
                );
              }
              return null;
            })}
        </div>
        <h4 className="fontHead2">Remove User Access</h4>
        <div className="removeFiles">
          {file &&
            file.users.map((user) => {
              if (file.users.map((user) => user.id).includes(user.id)) {
                return (
                  <div className="flexRow justSpace removePadding alignCenter">
                    {user.username}
                    <i
                      class="fa-solid fa-xmark pointer rightPad xmark"
                      onClick={(e) => removeUser(user.id, e)}
                    ></i>
                  </div>
                );
              }
              return null;
            })}
        </div>
      </div>
        <div className="flexCol justEnd heightEdit">
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

export default EditFileForm;
