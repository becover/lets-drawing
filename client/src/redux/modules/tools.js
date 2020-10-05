const CHANGE_BUTTON_MODE = 'paint/tools/CHANGE_BUTTON_MODE';
const TEXT_COLORS = 'paint/tools/TEXT_COLORS';
const TEXT_SIZE = 'paint/tools/TEXT_SIZE';
const ACTIVE = 'paint/tools/ACTIVE';

export const change_button_mode = (kinds, mode) => ({
  type: CHANGE_BUTTON_MODE,
  kinds,
  mode,
});
export const text_colors = (mode, color) => ({
  type: TEXT_COLORS,
  mode,
  color,
});

export const text_size = (mode, size) => ({
  type: TEXT_SIZE,
  mode,
  size,
});
export const active = (kinds, boolean) => ({ type: ACTIVE, kinds, boolean });

const INITIAL_STATE = {
  text: {
    isActive: false,
    mode: [
      { type: 'fill', checked: false },
      { type: 'border', checked: false },
    ],
    color: {
      fill: 'rgb(0,0,0,1)',
      border: 'transparent',
    },
    size: {
      text: 25,
      border: 25,
    },
  },
  brush: {
    isActive: true,
    mode: [
      { type: 'butt', join: 'bevel', checked: true },
      { type: 'square', join: 'square', checked: false },
      { type: 'round', join: 'round', checked: false },
    ],
  },
  shape: {
    mode: [
      { type: 'rectangle', checked: false },
      { type: 'triangle', checked: false },
      { type: 'circle', checked: false },
    ],
  },
};

const tools = (state = INITIAL_STATE, action) => {
  if (action.type === ACTIVE) {
    return {
      ...state,
      [action.kinds]: {
        ...state[action.kinds],
        isActive: action.boolean,
      },
    };
  } else if (action.type === CHANGE_BUTTON_MODE) {
    return {
      ...state,
      [action.kinds]: {
        ...state[action.kinds],
        mode: action.mode,
      },
    };
  } else if (action.type === TEXT_COLORS) {
    return {
      ...state,
      text: {
        ...state.text,
        color: {
          ...state.text.color,
          [action.mode]: action.color,
        },
      },
    };
  } else if (action.type === TEXT_SIZE) {
    return {
      ...state,
      text: {
        ...state.text,
        size: {
          ...state.text.size,
          [action.mode]: action.size,
        },
      },
    };
  } else {
    return state;
  }
};

export default tools;
