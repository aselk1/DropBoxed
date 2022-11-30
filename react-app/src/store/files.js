import * as folderActions from '../store/folders'

const POST_FILE = "files/POST_FILE";
const EDIT_FILE = "stories/EDIT_FILE";
const GET_FILES = "files/GET_FILES";
const DELETE_FILE = "files/DELETE_FILE";
const REMOVE_FILES = "files/REMOVE_FILES";

export const removeFiles = () => ({
  type: REMOVE_FILES
})

const postFile = (file) => ({
  type: POST_FILE,
  payload: file,
});

const editFile = (file) => ({
  type: EDIT_FILE,
  payload: file,
});

const getFiles = (files) => ({
  type: GET_FILES,
  payload: files,
});

const deleteStory = (id) => ({
  type: DELETE_FILE,
  payload: id,
});

export const fetchDownload = (id) => async (dispatch) => {
  const res = await fetch(`/api/files/${id}/download`);
  if (res.ok) {
    const data = await res.json();
    return data;
  }
};

export const fetchAllFiles = () => async (dispatch) => {
  const res = await fetch("/api/files");
  if (res.ok) {
    const files = await res.json();
    dispatch(getFiles(files));
    return files;
  }
};

export const fetchPostFile = (data, setShowModal) => async (dispatch) => {
  const { name, desc, priv, file } = data;
  const formData = new FormData();
  formData.append("name", name);
  formData.append("desc", desc);
  formData.append("private", priv);
  formData.append("file", file);
  const response = await fetch("/api/files", {
    method: "POST",
    body: formData,
  });
  if (response.ok) {
    const file = await response.json();
    dispatch(postFile(file));
    setShowModal(false);
    return response;
  }
};

export const fetchEditFile = (data, setShowModal, id) => async (dispatch) => {
  const { name, desc, priv, newFile } = data;
  console.log(data);
  const formData = new FormData();
  formData.append("name", name);
  formData.append("desc", desc);
  formData.append("private", priv);
  formData.append("file", newFile);
  console.log(formData.values());
  const response = await fetch(`/api/files/${id}`, {
    method: "PUT",
    body: formData,
  });
  if (response.ok) {
    const file = await response.json();
    dispatch(editFile(file));
    dispatch(folderActions.fetchAllFolders())
    setShowModal(false);
    return response;
  }
};

export const fetchDeleteFile = (id) => async (dispatch) => {
  const response = await fetch(`/api/files/${id}`, {
    method: "DELETE",
  });
  if (response.ok) {
    const data = response.json();
    dispatch(deleteStory(id));
    return data;
  }
};

const initialState = {};

export default function reducer(state = initialState, action) {
  let newState;
  switch (action.type) {
    case GET_FILES:
      newState = action.payload;
      return newState;
    case POST_FILE:
      newState = Object.assign({}, state);
      newState.files = [...newState.files];
      newState.files.push(action.payload);
      return newState;
    case EDIT_FILE:
      newState = Object.assign({}, state);
      newState.files = newState.files.map((el) => {
        if (el.id === action.payload.id) return action.payload;
        return el;
      });
      return newState;
    case DELETE_FILE:
      newState = Object.assign({}, state);
      //   newState.files = [...newState.files];
      newState.files = newState.files.filter((el) => {
        return el.id !== action.payload;
      });
      return newState;
    case REMOVE_FILES:
      newState = {}
      return newState
    default:
      return state;
  }
}
