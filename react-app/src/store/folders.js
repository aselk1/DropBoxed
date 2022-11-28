const POST_FOLDER = "folders/POST_FOLDER";
const EDIT_FOLDER = "folders/EDIT_FOLDER";
const GET_FOLDERS = "folders/GET_FOLDERS";
const DELETE_FOLDER = "folders/DELETE_FOLDERS";

const postFolder = (file) => ({
  type: POST_FOLDER,
  payload: file,
});

const editFolder = (file) => ({
  type: EDIT_FOLDER,
  payload: file,
});

const getFolders = (files) => ({
  type: GET_FOLDERS,
  payload: files,
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
    return response;
  }
};

export const fetchEditFolder = (data, setShowModal, id) => async (dispatch) => {
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
    dispatch(editFolder(file));
    setShowModal(false);
    return response;
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

const initialState = [];

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
      newState.files = newState.files.map((el) => {
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
    default:
      return state;
  }
}
