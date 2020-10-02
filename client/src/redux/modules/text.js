const TEXT_MODE = 'paint/text/MOTEXT_MODEDE';

export const text_mode = (mode) => ({ type: TEXT_MODE, mode });

const INITIAL_STATE = {
  mode: null,
};

const text = (state = INITIAL_STATE, action) => {
  if (action.type === TEXT_MODE) {
    return {
      ...state,
      mode: action.mode,
    };
  } else {
    return state;
  }
};

export default text;
