const POST_FOLDER = "folders/POST_FOLDER";
const EDIT_FOLDER = "folders/EDIT_FOLDER";
const GET_FOLDERS = "folders/GET_FOLDERS";
const DELETE_FOLDER = "folders/DELETE_FOLDERS";
const REMOVE_FOLDERS = "files/REMOVE_FOLDERS";
const ADD_FILE = "folders/ADD_FILE"
const REMOVE_FILE = "folders/REMOVE_FILE"

const addFile = (folder) => ({
  type: ADD_FILE,
  payload: folder,
});

const removeFile = (folder) => ({
  type: REMOVE_FILE,
  payload: folder,
});

export const removeFolders = () => ({
  type: REMOVE_FOLDERS,
});

const postFolder = (folder) => ({
  type: POST_FOLDER,
  payload: folder,
});

const editFolder = (folder) => ({
  type: EDIT_FOLDER,
  payload: folder,
});

const getFolders = (folders) => ({
  type: GET_FOLDERS,
  payload: folders,
});

const deleteFolder = (id) => ({
  type: DELETE_FOLDER,
  payload: id,
});

export const fetchAllFolders = () => async (dispatch) => {
  const res = await fetch("/api/folders");
  if (res.ok) {
    const folders = await res.json();
    dispatch(getFolders(folders));
    return folders;
  }
};

export const fetchPostFolder = (data, setShowModal) => async (dispatch) => {
  const { name, priv } = data;
  const formData = new FormData();
  formData.append("name", name);
  formData.append("private", priv);
  const response = await fetch("/api/folders", {
    method: "POST",
    body: formData,
  });
  if (response.ok) {
    const folder = await response.json();
    dispatch(postFolder(folder));
    setShowModal(false);
    return null;
  } else if (response.status < 500) {
    const data = await response.json();
    if (data.errors) {
      return data.errors;
    }
  } else {
    return ["An error occurred. Please try again."];
  }
};

export const fetchEditFolder = (data, setShowModal, id) => async (dispatch) => {
  const { name, priv } = data;
  const formData = new FormData();
  formData.append("name", name);
  formData.append("private", priv);
  const response = await fetch(`/api/folders/${id}`, {
    method: "PUT",
    body: formData,
  });
  if (response.ok) {
    const folder = await response.json();
    dispatch(editFolder(folder));
    setShowModal(false);
    return null;
  } else if (response.status < 500) {
    const data = await response.json();
    if (data.errors) {
      return data.errors;
    }
  } else {
    return ["An error occurred. Please try again."];
  }
};

export const fetchDeleteFolder = (id) => async (dispatch) => {
  const response = await fetch(`/api/folders/${id}`, {
    method: "DELETE",
  });
  if (response.ok) {
    const data = response.json();
    dispatch(deleteFolder(id));
    return data;
  }
};

export const fetchAddFile = (folderId, fileId) => async (dispatch) => {
    const res = await fetch(`/api/folder_files/${folderId}/${fileId}`, {
        method: "POST"
    })
    if (res.ok) {
        const folder = await res.json()
        dispatch(addFile(folder))
        return res
    }
}

export const fetchRemoveFile = (folderId, fileId) => async (dispatch) => {
  const res = await fetch(`/api/folder_files/${folderId}/${fileId}`, {
    method: "DELETE",
  });
  if (res.ok) {
    const folder = await res.json();
    dispatch(removeFile(folder));
    return res;
  }
};

const initialState = {};

export default function reducer(state = initialState, action) {
  let newState;
  switch (action.type) {
    case GET_FOLDERS:
      newState = action.payload;
      return newState;
    case POST_FOLDER:
      newState = Object.assign({}, state);
      newState.folders = [...newState.folders];
      newState.folders.push(action.payload);
      return newState;
    case EDIT_FOLDER:
      newState = Object.assign({}, state);
      newState.folders = newState.folders.map((el) => {
        if (el.id === action.payload.id) return action.payload;
        return el;
      });
      return newState;
    case ADD_FILE:
      newState = Object.assign({}, state);
      newState.folders = newState.folders.map((el) => {
        if (el.id === action.payload.id) return action.payload;
        return el;
      });
      return newState;
    case REMOVE_FILE:
      newState = Object.assign({}, state);
      newState.folders = newState.folders.map((el) => {
        if (el.id === action.payload.id) return action.payload;
        return el;
      });
      return newState;
    case DELETE_FOLDER:
      newState = Object.assign({}, state);
      newState.folders = newState.folders.filter((el) => {
        return el.id !== action.payload;
      });
      return newState;
    case REMOVE_FOLDERS:
      newState = {};
      return newState;
    default:
      return state;
  }
}
