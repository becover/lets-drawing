export const GETALL_REQUEST = 'paint/users/GETALL_REQUEST';
export const GETALL_SUCCESS = 'paint/users/GETALL_SUCCESS';
export const GETALL_FAILURE = 'paint/users/GETALL_FAILURE';

const users = (state = {}, action) => {
  if (action.type === GETALL_REQUEST) {
    return {
      lodaing: true,
    };
  } else if (action.type === GETALL_SUCCESS) {
    return {
      items: action.users,
    };
  } else if (action.type === GETALL_FAILURE) {
    return {
      error: action.error,
    };
  } else {
    return state;
  }
};

export default users;
