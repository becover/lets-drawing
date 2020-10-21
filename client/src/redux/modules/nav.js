const ON_SETTING_BUTTON = 'paint/nav/CHANGE_BUTTON_MODE';

export const on_setting_button = (kinds, state, value) => ({
  type: ON_SETTING_BUTTON,
  kinds,
  state,
  value,
});

const INITIAL_STATE = {
  saveImage: {
    isActive: false,
    image: null,
  },
  loadImage: {
    isActive: false,
    src: null,
  },
};

const tools = (state = INITIAL_STATE, action) => {
  const selectedButton = action.kinds;
  if (action.type === ON_SETTING_BUTTON) {
    return {
      ...state,
      [selectedButton]: {
        ...state[selectedButton],
        [action.state]: action.value,
      },
    };
  } else {
    return state;
  }
};

export default tools;
