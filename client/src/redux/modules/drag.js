const START_ANGLE = 'paint/drag/START_ANGLE';
const ANGLE = 'paint/drag/ANGLE';
const CENTER = 'paint/drag/CENTER';
const OFFSET = 'paint/drag/OFFSET';
const ROTATION = 'paint/drag/ROTATION';
const ROTATE = 'paint/drag/ROTATE';
const MOVE = 'paint/drag/MOVE';

export const change_start_angle = (number) => ({ type: START_ANGLE, number });
export const change_angle = (number) => ({ type: ANGLE, number });
export const change_center = (location, number) => ({
  type: CENTER,
  location,
  number,
});
export const change_offset = (location, number) => ({
  type: OFFSET,
  location,
  number,
});
export const change_rotation = (number) => ({ type: ROTATION, number });
export const is_rotate = (boolean) => ({ type: ROTATE, boolean });
export const is_move = (boolean) => ({ type: MOVE, boolean });

const INITIAL_STATE = {
  startAngle: 0,
  angle: 0,
  center: {
    x: 0,
    y: 0,
  },
  offset: {
    x: 0,
    y: 0,
  },
  rotation: 0,
  rotate: false,
  move: false,
};

const drag = (state = INITIAL_STATE, action) => {
  if (action.type === START_ANGLE) {
    return {
      ...state,
      startAngle: action.number,
    };
  } else if (action.type === ANGLE) {
    return {
      ...state,
      angle: action.number,
    };
  } else if (action.type === CENTER) {
    return {
      ...state,
      center: {
        ...state.center,
        [action.location]: action.number,
      },
    };
  } else if (action.type === OFFSET) {
    return {
      ...state,
      offset: {
        ...state.offset,
        [action.location]: action.number,
      },
    };
  } else if (action.type === ROTATION) {
    return {
      ...state,
      rotation: action.number,
    };
  } else if (action.type === ROTATE) {
    return {
      ...state,
      rotate: action.boolean,
    };
  } else if (action.type === MOVE) {
    return {
      ...state,
      move: action.boolean,
    };
  } else {
    return state;
  }
};

export default drag;
