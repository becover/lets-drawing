const CHANGE_BUTTON_MODE = 'paint/tools/CHANGE_BUTTON_MODE';
const TEXT_COLORS = 'paint/tools/TEXT_COLORS';
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
export const active = (kinds, boolean) => ({ type: ACTIVE, kinds, boolean });

const INITIAL_STATE = {
  text: {
    isActive: false,
    mode: [
      { type: 'fill', checked: false },
      { type: 'border', checked: false },
    ],
    color: {
      fill: null,
      border: null,
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
  } else {
    return state;
  }
};

export default tools;
