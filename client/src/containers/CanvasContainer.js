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
import { stack_History, remove_redo } from '../redux/modules/history';

function CanvasContainer() {
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
    mode,
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
    shapes: canvas.mode,
  }));
  const { undo } = useSelector(({ history }) => ({ undo: history.undo }));
  const { mode: textMode } = useSelector(({ text }) => ({
    mode: text.mode,
  }));
  const dispatch = useDispatch();
  const onChangeStatusToPainting = useCallback(
    (boolean) => dispatch(is_painting(boolean)),
    [dispatch],
  );

  const onChangeStatusTowriting = useCallback(
    (boolean) => dispatch(is_writing(boolean)),
    [dispatch],
  );

  const onChangeStatuesToClicking = useCallback(
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
  return (
    <div style={{ position: 'relative' }}>
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
        mode={mode}
        shapes={shapes}
        onChangeStatusToPainting={onChangeStatusToPainting}
        onChangeStatuesToClicking={onChangeStatuesToClicking}
        onChangeStatusTowriting={onChangeStatusTowriting}
        onStackHistory={onStackHistory}
        onRemoveRedo={onRemoveRedo}
        onChangeColor={onChangeColor}
        textMode={textMode}
        onChangeMode={onChangeMode}
      />
    </div>
  );
}

export default React.memo(CanvasContainer);
