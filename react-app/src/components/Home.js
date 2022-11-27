import React, { useEffect, useReducer, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import * as fileActions from '../store/files'
import FileFormModal from "./FileFormModal";
import EditFileFormModal from "./EditFileFormModal";

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
    }

  return (
    <div className="pagePad">
      <h2>Home</h2>
      <div>
        <FileFormModal />
        <button>Create</button>
      </div>
      {files &&
        files.map((file) => (
          <div>
            {file.name}
            {user.id === file.user_id && (
              <button onClick={(e) => deleteFile(file.id)}>Delete</button>
            )}
            {user.id === file.user_id && (
            //   <button onClick={(e) => editFile(file.id)}>Edit</button>
            <EditFileFormModal file={file}/>
            )}
          </div>
        ))}
    </div>
  );
};

export default Home;
