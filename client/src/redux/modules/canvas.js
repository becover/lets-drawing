const WIDTH = 'paint/canvas/WIDTH';
const HEIGHT = 'paint/canvas/HEIGHT';
const ALPHA = 'paint/canvas/ALPHA';
const CHANGE_COLOR = 'paint/canvas/CHANGE_COLOR';
const CHANGE_LINEWIDTH = 'paint/canvas/CHANGE_LINEWIDTH';
const CHANGE_LINECAP = 'paint/canvas/CHANGE_LINECAP';
const CHANGE_LINEJOIN = 'paint/canvas/CHANGE_LINEJOIN';
const IS_CLICKING = 'paint/canvas/IS_CLICKING';
const IS_PAINTING = 'paint/canvas/IS_PAINTING';
const IS_FILLING = 'paint/canvas/IS_FILLING';
const IS_PIPETTING = 'paint/canvas/IS_PIPETTING';
const IS_PICKING = 'paint/canvas/IS_PICKING';
const IS_WRITING = 'paint/canvas/IS_WRITING';
const IS_DRAWING_SHAPES = 'paint/canvas/IS_DRAWING_SHAPES';
const MODE = 'paint/canvas/MODE';
const SHAPES_TYPE = 'paint/canvas/SHAPES_TYPE';
const SHAPES_LOCATION = 'paint/canvas/SHAPES_LOCATION';

export const Width = (value) => ({ type: WIDTH, value });
export const Height = (value) => ({ type: HEIGHT, value });
export const alpha = (value) => ({ type: ALPHA, value });
export const change_color = (color) => ({ type: CHANGE_COLOR, color });
export const change_linewidth = (lineWidth) => ({
  type: CHANGE_LINEWIDTH,
  lineWidth,
});
export const change_linecap = (lineCap) => ({
  type: CHANGE_LINECAP,
  lineCap,
});
export const change_linejoin = (lineJoin) => ({
  type: CHANGE_LINEJOIN,
  lineJoin,
});
export const is_clicking = (boolean) => ({ type: IS_CLICKING, boolean });
export const is_painting = (boolean) => ({ type: IS_PAINTING, boolean });
export const is_filling = (boolean) => ({ type: IS_FILLING, boolean });
export const is_pipetting = (boolean) => ({ type: IS_PIPETTING, boolean });
export const is_picking = (boolean) => ({ type: IS_PICKING, boolean });
export const is_writing = (boolean) => ({ type: IS_WRITING, boolean });
export const is_drawing_shapes = (boolean) => ({
  type: IS_DRAWING_SHAPES,
  boolean,
});
export const change_mode = (mode) => ({ type: MODE, mode });
export const shapes_type = (types) => ({ type: SHAPES_TYPE, types });
export const shapes_location = (location, value) => ({
  type: SHAPES_LOCATION,
  location,
  value,
});

const initialState = {
  width: null,
  height: null,
  color: 'rgba(51, 51, 51, 1)',
  alpha: 1,
  lineWidth: 25,
  lineCap: 'butt',
  lineJoin: 'bevel',
  isClicking: false,
  isPainting: false,
  isFilling: false,
  isPipetting: false,
  isPicking: false,
  isWriting: false,
  isDrawingShapes: false,
  mode: 'brush',
  shapes: {
    type: null,
    location: {
      start: {},
      end: {},
    },
  },
};

const canvas = (state = initialState, action) => {
  if (action.type === WIDTH) {
    return {
      ...state,
      width: action.value,
    };
  } else if (action.type === HEIGHT) {
    return {
      ...state,
      height: action.value,
    };
  } else if (action.type === CHANGE_COLOR) {
    return {
      ...state,
      color: action.color,
    };
  } else if (action.type === ALPHA) {
    return {
      ...state,
      alpha: action.value,
    };
  } else if (action.type === IS_CLICKING) {
    return {
      ...state,
      isClicking: action.boolean,
    };
  } else if (action.type === CHANGE_LINEWIDTH) {
    return {
      ...state,
      lineWidth: action.lineWidth,
    };
  } else if (action.type === CHANGE_LINECAP) {
    return {
      ...state,
      lineCap: action.lineCap,
    };
  } else if (action.type === CHANGE_LINEJOIN) {
    return {
      ...state,
      lineJoin: action.lineJoin,
    };
  } else if (action.type === IS_PAINTING) {
    return {
      ...state,
      isPainting: action.boolean,
    };
  } else if (action.type === IS_FILLING) {
    return {
      ...state,
      isFilling: action.boolean,
    };
  } else if (action.type === IS_PIPETTING) {
    return {
      ...state,
      isPipetting: action.boolean,
    };
  } else if (action.type === IS_PICKING) {
    return {
      ...state,
      isPicking: action.boolean,
    };
  } else if (action.type === IS_WRITING) {
    return {
      ...state,
      isWriting: action.boolean,
    };
  } else if (action.type === IS_DRAWING_SHAPES) {
    return {
      ...state,
      isDrawingShapes: action.boolean,
    };
  } else if (action.type === MODE) {
    return {
      ...state,
      mode: action.mode,
    };
  } else if (action.type === SHAPES_TYPE) {
    return {
      ...state,
      shapes: {
        ...state.shapes,
        type: action.types,
      },
    };
  } else if (action.type === SHAPES_LOCATION) {
    return {
      ...state,
      shapes: {
        ...state.shapes,
        location: {
          ...state.shapes.location,
          [action.location]: action.value,
        },
      },
    };
  } else {
    return state;
  }
};

export default canvas;

/**
import {
  change_color,
  change_linewidth,
  change_linecap,
  change_linejoin,
  is_painting,
  is_filling,
  is_pipetting,
  is_picking,
  is_writing,
  is_drawing_shapes,
  modes,
  shapes_type,
  shapes_location,
} from '../redux/modules/canvas';
import Canvas from '../components/paintBrush/Canvas/Canvas';
import Layer from '../components/paintBrush/Canvas/Layer';

function canvasContainer() {
  const {
    width,
    height,
    color,
    lineWidth,
    lineCap,
    lineJoin,
    isPainting,
    isFilling,
    isPipetting,
    isPicking,
    isWriting,
    isDrawingShapes,
    modes,
    shapes: { type, location },
  } = useSelector(({canvas}) => ({
    width: canvas.width,
    height: canvas.height,
    color: canvas.color,
    lineWidth: canvas.lineWidth,
    lineCap: canvas.lineCap,
    lineJoin: canvas.lineJoin,
    isPainting: canvas.isPainting,
    isFilling: canvas.isFilling,
    isPipetting: canvas.isPipetting,
    isPicking: canvas.isPicking,
    isWriting: canvas.isWriting,
    isDrawingShapes: canvas.isDrawingShapes,
    modes: canvas.modes,
    type: canvas.type,
    location: canvas.location,
  }));
  const dispatch = useDispatch();
  const onchangeColor = useCallback((color) => dispatch(change_color(color)), [
    dispatch,
  ]);
  const onchangeLineWidth = useCallback(
    (lineWidth) => dispatch(change_linewidth(lineWidth)),
    [dispatch],
  );
  const onchangeLineCap = useCallback(
    (lineCap) => dispatch(change_linecap(lineCap)),
    [dispatch],
  );
  const onchangeLineJoin = useCallback(
    (lineJoin) => dispatch(change_linejoin(lineJoin)),
    [dispatch],
  );
  const onchangeStatusToPainting = useCallback(
    (boolean) => dispatch(is_painting(boolean)),
    [dispatch],
  );
  const onchangeStatusToFilling = useCallback(
    (boolean) => dispatch(is_filling(boolean)),
    [dispatch],
  );
  const onchangeStatusToPipetting = useCallback(
    (boolean) => dispatch(is_pipetting(boolean)),
    [dispatch],
  );
  const onchangeStatusToPicking = useCallback(
    (boolean) => dispatch(is_picking(boolean)),
    [dispatch],
  );
  const onchangeStatusToWriting = useCallback(
    (boolean) => dispatch(is_writing(boolean)),
    [dispatch],
  );
  const onchangeStatusToDrawingShapes = useCallback(
    (boolean) => dispatch(is_drawing_shapes(boolean)),
    [dispatch],
  );
  const onchangeMode = useCallback((mode) => dispatch(modes(mode)), [dispatch]);
  const onchangeStatusToShapeType = useCallback(
    (types) => dispatch(shapes_type(types)),
    [dispatch],
  );
  const onchangeStatusToShapeLocation = useCallback(
    (location, value) => dispatch(shapes_location(location, value)),
    [dispatch],
  );

  return (
    <div>
      <Canvas />
      <Layer
      // width={width}
      // height={height}
      // color={color}
      // lineWidt={lineWidth}
      // lineCap={lineCap}
      // lineJoin={lineJoin}
      // isPainting={isPainting}
      // isFilling={isFilling}
      // isPipetting={isPipetting}
      // isPicking={isPicking}
      // isWriting={isWriting}
      // isDrawingShapes={isDrawingShapes}
      // modes={modes}
      // type={type}
      // location={location}
      />
    </div>
  );
}
 */
