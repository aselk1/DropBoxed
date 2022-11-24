import React, { useEffect, useReducer, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import * as fileActions from '../store/files'
import FileFormModal from "./FileFormModal";

const Home = ({user}) => {
    const dispatch = useDispatch();
    const files = useSelector(state => state.files.files)

    useEffect(() => {
            (async () => {
                await dispatch(fileActions.fetchAllFiles())
            })();
    },[dispatch])

    const deleteFile = async (id) => {
        const data = await dispatch(fileActions.fetchDeleteFile(id))
        console.log(data)
    }

  return (
    <div className="pagePad">
      <h2>Home</h2>
      <div>
        <FileFormModal />
        <button>Create</button>
      </div>
        {files && files.map((file) => (
          <div>
            {file.name}
            {user.id === file.user_id && <button onClick={(e) => deleteFile(file.id)}>Delete</button>}
          </div>
        ))}
    </div>
  );
};

export default Home;
