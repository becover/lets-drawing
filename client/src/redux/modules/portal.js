const MODAL = 'paint/portal/MODAL';
const MODAL_PROPS = 'paint/portal/MODAL_PROPS';

export const modal = (state, compo) => ({
  type: MODAL,
  state,
  compo,
});
export const modalProps = (obj) => ({
  type: MODAL_PROPS,
  obj,
});

const INITIAL_STATE = {
  isActive: false,
  portalCompo: null,
  optionalProps: null,
};

const portal = (state = INITIAL_STATE, action) => {
  if (action.type === MODAL) {
    return { ...state, isActive: action.state, portalCompo: action.compo };
  } else if (action.type === MODAL_PROPS) {
    return { ...state, optionalProps: action.obj };
  } else {
    return state;
  }
};

export default portal;
