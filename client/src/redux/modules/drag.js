const START_ANGLE = 'paint/drag/START_ANGLE';
const ANGLE = 'paint/drag/ANGLE';
const CENTER = 'paint/drag/CENTER';
const OFFSET = 'paint/drag/OFFSET';
const ROTATION = 'paint/drag/ROTATION';
const ROTATE = 'paint/drag/ROTATE';
const MOVE = 'paint/drag/MOVE';

export const start_angle = (number) => ({ type: START_ANGLE, number });
export const angle = (number) => ({ type: ANGLE, number });
export const center = (location, number) => ({
  type: CENTER,
  location,
  number,
});
export const offset = (location, number) => ({
  type: OFFSET,
  location,
  number,
});
export const rotation = (number) => ({ type: ROTATION, number });
export const rotate = (boolean) => ({ type: ROTATE, boolean });
export const move = (boolean) => ({ type: MOVE, boolean });

const initialState = {
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

const drag = (state = initialState, action) => {
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
  } else {
    return state;
  }
};

export default drag;
