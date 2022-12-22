const GET_USERS = "files/GET_USERS";

const getUsers = (files) => ({
  type: GET_USERS,
  payload: files,
});

export const fetchAllUsers = () => async (dispatch) => {
  const res = await fetch("/api/users");
  if (res.ok) {
    const users = await res.json();
    dispatch(getUsers(users));
    return users;
  }
};

const initialState = {};

export default function reducer(state = initialState, action) {
  let newState;
  switch (action.type) {
    case GET_USERS:
      newState = action.payload;
      return newState;
    default:
      return state;
  }
}
