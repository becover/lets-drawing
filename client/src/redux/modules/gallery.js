const PUSH_IMAGE = 'paint/gallery/PUSH_IMAGE';
// const REMOVE_IMAGE = 'paint/gallery/REMOVE_IMAGE';
const REMOVE_ALL = 'paint/gallery/REMOVE_ALL';

export const pushImage = (image) => ({
  type: PUSH_IMAGE,
  image,
});

export const removeImage = () => ({});

export const removeAll = () => ({ type: REMOVE_ALL });

const INITIAL_STATE = {
  imageList: [],
};

const gallery = (state = INITIAL_STATE, action) => {
  if (action.type === PUSH_IMAGE) {
    return {
      ...state,
      imageList: [action.image, ...state.imageList],
    };
  } else if (action.type === REMOVE_ALL) {
    return { imageList: [] };
  } else {
    return state;
  }
};

export default gallery;
