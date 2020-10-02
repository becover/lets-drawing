import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Canvas from '../components/paintBrush/Canvas/Canvas';
import Layer from '../components/paintBrush/Canvas/Layer';
import {
  is_painting,
  is_clicking,
  is_pipetting,
  is_writing,
  change_color,
  change_mode,
} from '../redux/modules/canvas';

import { active, change_button_mode } from '../redux/modules/tools';

import {
  change_start_angle,
  change_angle,
  change_center,
  change_offset,
  change_rotation,
  is_rotate,
  is_move,
} from '../redux/modules/drag';

import { stack_History, remove_redo } from '../redux/modules/history';

function CanvasContainer({ setInitialSwitch, setBeforeLineCap }) {
  const {
    width,
    height,
    alpha,
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
    mode: canvasMode,
    shapes,
  } = useSelector(({ canvas }) => ({
    width: canvas.width,
    height: canvas.height,
    alpha: canvas.alpha,
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
    mode: canvas.mode,
    shapes: canvas.shapes,
  }));

  const {
    startAngle,
    angle,
    center,
    offset,
    rotation,
    rotate,
    move,
  } = useSelector(({ drag }) => ({
    startAngle: drag.startAngle,
    angle: drag.angle,
    center: drag.center,
    offset: drag.offset,
    rotation: drag.rotation,
    rotate: drag.rotate,
    move: drag.move,
  }));

  const { undo } = useSelector(({ history }) => ({ undo: history.undo }));
  const { mode: textMode } = useSelector(({ text }) => ({
    mode: text.mode,
  }));

  const {
    text: { color: textColor },
  } = useSelector(({ tools }) => ({ text: tools.text }));
  const dispatch = useDispatch();

  //canvas
  const onChangeStatusToPainting = useCallback(
    (boolean) => dispatch(is_painting(boolean)),
    [dispatch],
  );
  const onChangeStatusTowriting = useCallback(
    (boolean) => dispatch(is_writing(boolean)),
    [dispatch],
  );
  const onChangeStatusToClicking = useCallback(
    (boolean) => dispatch(is_clicking(boolean)),
    [dispatch],
  );
  const onChangeStatusToPipetting = useCallback(
    (boolean) => dispatch(is_pipetting(boolean)),
    [dispatch],
  );
  const onChangeColor = useCallback(
    (boolean) => dispatch(change_color(boolean)),
    [dispatch],
  );
  const onChangeMode = useCallback((mode) => dispatch(change_mode(mode)), [
    dispatch,
  ]);
  const onStackHistory = useCallback(
    (history) => dispatch(stack_History(history)),
    [dispatch],
  );
  const onRemoveRedo = useCallback(() => dispatch(remove_redo()), [dispatch]);

  //tools(button mode)
  const onChangeActive = useCallback(
    (kinds, boolean) => dispatch(active(kinds, boolean)),
    [dispatch],
  );

  const onChangeButtonMode = useCallback(
    (kinds, mode) => dispatch(change_button_mode(kinds, mode)),
    [dispatch],
  );

  //drag
  const onStartAngle = useCallback(
    (number) => dispatch(change_start_angle(number)),
    [dispatch],
  );
  const onAngle = useCallback((number) => dispatch(change_angle(number)), [
    dispatch,
  ]);
  const onCenter = useCallback(
    (location, number) => dispatch(change_center(location, number)),
    [dispatch],
  );
  const onOffset = useCallback(
    (location, number) => dispatch(change_offset(location, number)),
    [dispatch],
  );
  const onRotation = useCallback(
    (number) => dispatch(change_rotation(number)),
    [dispatch],
  );
  const onRotate = useCallback((boolean) => dispatch(is_rotate(boolean)), [
    dispatch,
  ]);
  const onMove = useCallback((boolean) => dispatch(is_move(boolean)), [
    dispatch,
  ]);

  return (
    <div style={{ height: '78vh' }}>
      <Canvas
        width={width}
        height={height}
        undo={undo}
        isPipetting={isPipetting}
        onChangeStatusToPipetting={onChangeStatusToPipetting}
        onChangeColor={onChangeColor}
      />
      <Layer
        width={width}
        height={height}
        alpha={alpha}
        color={color}
        lineWidth={lineWidth}
        lineCap={lineCap}
        lineJoin={lineJoin}
        isPainting={isPainting}
        isFilling={isFilling}
        isPipetting={isPipetting}
        isPicking={isPicking}
        isWriting={isWriting}
        isDrawingShapes={isDrawingShapes}
        canvasMode={canvasMode}
        shapes={shapes}
        onChangeStatusToPainting={onChangeStatusToPainting}
        onChangeStatusToClicking={onChangeStatusToClicking}
        onChangeStatusTowriting={onChangeStatusTowriting}
        onStackHistory={onStackHistory}
        onRemoveRedo={onRemoveRedo}
        onChangeColor={onChangeColor}
        textMode={textMode}
        onChangeMode={onChangeMode}
        onStartAngle={onStartAngle}
        onAngle={onAngle}
        onCenter={onCenter}
        onOffset={onOffset}
        onRotation={onRotation}
        onRotate={onRotate}
        onMove={onMove}
        startAngle={startAngle}
        angle={angle}
        center={center}
        offset={offset}
        rotation={rotation}
        rotate={rotate}
        move={move}
        setInitialSwitch={setInitialSwitch}
        setBeforeLineCap={setBeforeLineCap}
        onChangeButtonMode={onChangeButtonMode}
        onChangeActive={onChangeActive}
        textColor={textColor}
      />
    </div>
  );
}

export default React.memo(CanvasContainer);
