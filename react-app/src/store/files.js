const POST_FILE = "files/POST_FILE";
// const EDIT_STORY = "stories/EDIT_STORY";
const GET_FILES = "files/GET_FILES";
const DELETE_FILE = "files/DELETE_FILE";

const postFile = (file) => ({
  type: POST_FILE,
  payload: file,
});

// const editStory = (story) => ({
//   type: EDIT_STORY,
//   payload: story,
// });

const getFiles = (files) => ({
  type: GET_FILES,
  payload: files,
});

const deleteStory = (id) => ({
  type: DELETE_FILE,
  payload: id,
});

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
    setShowModal(false)
    return response;
  }
};

// export const fetchEditStory = (id, story) => async (dispatch) => {
//   const { newTitle, newBody } = story;
//   // const formData = new FormData();
//   // formData.append("title", newTitle);
//   // formData.append("body", newBody);
//   const res = await fetch(`/api/stories/${id}`, {
//     method: "PUT",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(story),
//   });
//   if (res.ok) {
//     const data = await res.json();
//     dispatch(editStory(data));
//     return data;
//   }
// };

export const fetchDeleteFile = (id) => async (dispatch) => {
  const response = await fetch(`/api/files/${id}`, {
    method: "DELETE",
  });
  if (response.ok) {
    const data = response.json()
    dispatch(deleteStory(id));
    return data;
  }
};

const initialState = [];

export default function reducer(state = initialState, action) {
  let newState;
  switch (action.type) {
    case GET_FILES:
      newState = action.payload;
      return newState;
    case POST_FILE:
      newState = Object.assign({}, state);
      newState.files = [...newState.files]
      newState.files.push(action.payload)
      return newState;
    // case EDIT_STORY:
    //   newState = Object.assign({}, state);
    //   newState[action.payload.id] = action.payload;
    //   return newState;
    case DELETE_FILE:
      newState = Object.assign({}, state);
    //   newState.files = [...newState.files];
      newState.files = newState.files.filter(el=>{
        return el.id !== action.payload
      })
      return newState;
    default:
      return state;
  }
}
