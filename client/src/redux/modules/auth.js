const AUTH = 'paint/auth/AUTH';

export const authentication = (kinds, value) => ({
  type: AUTH,
  kinds,
  value,
});

const INITIAL_STATE = {
  isAuth: false,
  userName: null,
  password: null,
  userPaint: [],
};

const auth = (state = INITIAL_STATE, action) => {
  const auth = action.kinds;
  if (action.type === AUTH) {
    return {
      ...state,
      [auth]: action.value,
    };
  } else {
    return state;
  }
};

export default auth;
