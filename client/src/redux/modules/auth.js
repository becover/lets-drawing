const LOGIN = 'paint/auth/LOGIN';
const LOGOUT = 'paint/auth/LOGOUT';

export const login = (username) => ({
  type: LOGIN,
  username,
});

export const logout = () => {
  return { type: LOGOUT };
};

// let user = JSON.parse(localStorage.getItem('dw-token'));
// let username = JSON.parse(localStorage.getItem('dw-user'));
const INITIAL_STATE = { isLogged: false };

const auth = (state = INITIAL_STATE, action) => {
  if (action.type === LOGIN) {
    return {
      isLogged: true,
      username: action.username,
    };
  } else if (action.type === LOGOUT) {
    return { isLogged: false };
  } else {
    return state;
  }
};

export default auth;
