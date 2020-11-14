const UNDO = 'paint/history/UNDO';
const REDO = 'paint/history/REDO';
const STACK_HISTORY = 'paint/history/STACK_HISTORY';
const REMOVE_REDO = 'paint/history/REMOVE_REDO';

export const undo = () => ({ type: UNDO });
export const redo = () => ({ type: REDO });
export const stack_History = (history) => ({ type: STACK_HISTORY, history });
export const remove_redo = () => ({ type: REMOVE_REDO });

const INITIAL_STATE = {
  undo: [],
  redo: [],
};

const history = (state = INITIAL_STATE, action) => {
  if (action.type === STACK_HISTORY) {
    // const newState = { ...state, undo: [...state.undo.concat(action.history)] };
    // if (newState.undo.length > 30) newState.undo.shift();
    return { ...state, undo: [...state.undo, action.history] };
  } else if (action.type === UNDO) {
    const lastImg = [...state.undo.slice(-1)];
    return {
      ...state,
      undo: [...state.undo.slice(0, -1)],
      redo: [...state.redo.concat(lastImg)],
    };
  } else if (action.type === REDO) {
    const lastImg = [...state.redo.slice(-1)];
    return {
      ...state,
      undo: [...state.undo.concat(lastImg)],
      redo: [...state.redo.slice(0, -1)],
    };
  } else if (action.type === REMOVE_REDO) {
    return { ...state, redo: [] };
  } else {
    return state;
  }
};

export default history;
