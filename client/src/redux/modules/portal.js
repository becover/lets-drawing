const MODAL = 'paint/portal/MODAL';

export const modal = (state, compo) => ({
  type: MODAL,
  state,
  compo,
});

const INITIAL_STATE = {
  isActive: false,
  portalCompo: null,
};

const portal = (state = INITIAL_STATE, action) => {
  if (action.type === MODAL) {
    return { ...state, isActive: action.state, portalCompo: action.compo };
  } else {
    return state;
  }
};

export default portal;
