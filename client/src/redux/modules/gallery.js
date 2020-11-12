const REMOOVE_ID = 'paint/gallery/REMOOVE_ID';
const IS_REMOOVE_IMAGE = 'paint/gallery/IS_REMOOVE_IMAGE';
const INITIALIZATION = 'paint/gallery/INITIALIZATION';

export const removeId = (id) => ({
  type: REMOOVE_ID,
  id,
});

export const on_remove_image = (boolean) => ({
  type: IS_REMOOVE_IMAGE,
  boolean,
});

export const initState = () => ({ type: INITIALIZATION });

const INITIAL_STATE = {
  isRemove: false,
  id: null,
};

const gallery = (state = INITIAL_STATE, action) => {
  if (action.type === IS_REMOOVE_IMAGE) {
    return { ...state, isRemove: action.boolean };
  } else if (action.type === REMOOVE_ID) {
    return {
      ...state,
      id: action.id,
    };
  } else if (action.type === INITIALIZATION) {
    return {
      isRemove: false,
      id: null,
    };
  } else {
    return state;
  }
};

export default gallery;
