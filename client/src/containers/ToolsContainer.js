import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled, { css } from 'styled-components';
import {
  alpha,
  change_linecap,
  change_linewidth,
  change_color,
  is_painting,
  is_filling,
  is_pipetting,
  is_picking,
} from '../redux/modules/canvas';
import { undo, redo } from '../redux/modules/history';
import Brush from '../components/paintBrush/Tools/Brush';
import Text from '../components/paintBrush/Tools/Text';
import Shapes from '../components/paintBrush/Tools/Shapes';
import Colors from '../components/paintBrush/Tools/Colors';
import ColorPicker from '../components/paintBrush/Tools/ColorPicker';
import Pipett from '../components/paintBrush/Tools/Pipett';
import History from '../components/paintBrush/Tools/History/History';
import Range from '../components/paintBrush/Tools/Range/Range';

const ToolsButtom = styled.div`
  display: none;
  position: fixed;
  bottom: 60px;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 100;
  transition: 0.3s;
  ${(props) =>
    !props.isPainting &&
    css`
      display: block;
    `}
`;

function ToolsContainer() {
  const dispatch = useDispatch();
  const { isPainting, isPicking } = useSelector(({ canvas }) => ({
    isPainting: canvas.isPainting,
    isPicking: canvas.isPicking,
  }));

  const onChangeColor = useCallback((color) => dispatch(change_color(color)), [
    dispatch,
  ]);
  const onChangeAlpha = useCallback((color) => dispatch(alpha(color)), [
    dispatch,
  ]);

  const onChangeLineCap = useCallback(
    (lineCap) => dispatch(change_linecap(lineCap)),
    [dispatch],
  );
  const onChangeLineWidth = useCallback(
    (value) => dispatch(change_linewidth(value)),
    [dispatch],
  );

  const onChangeStatusToPainting = useCallback(
    (boolean) => dispatch(is_painting(boolean)),
    [dispatch],
  );
  const onChangeStatusToFilling = useCallback(
    (boolean) => dispatch(is_filling(boolean)),
    [dispatch],
  );

  const onChangeStatusToPipetting = useCallback(
    (boolean) => dispatch(is_pipetting(boolean)),
    [dispatch],
  );

  const onChangeStatusToPicking = useCallback(
    (boolean) => dispatch(is_picking(boolean)),
    [dispatch],
  );

  const onUndo = useCallback((history) => dispatch(undo(history)), [dispatch]);
  const onRedo = useCallback((history) => dispatch(redo(history)), [dispatch]);
  return (
    <div style={{ borderBottom: '1px solid #eee', padding: '10px 0' }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          width: '100%',
          maxWidth: '1200px',
          margin: '0 auto',
        }}
      >
        <Brush
          onChangeLineCap={onChangeLineCap}
          onChangeStatusToPainting={onChangeStatusToPainting}
          onChangeStatusToFilling={onChangeStatusToFilling}
        />
        <Text />
        <Shapes />
        <Colors onChangeColor={onChangeColor} />
        <div
          style={{
            width: '3%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Pipett onChangeStatusToPipetting={onChangeStatusToPipetting} />
          <ColorPicker
            onChangeStatusToPicking={onChangeStatusToPicking}
            onChangeColor={onChangeColor}
            isPicking={isPicking}
          />
        </div>
      </div>
      <ToolsButtom isPainting={isPainting}>
        <Range
          onChangeLineWidth={onChangeLineWidth}
          onChangeAlpha={onChangeAlpha}
        />
        <History onUndo={onUndo} onRedo={onRedo} />
      </ToolsButtom>
    </div>
  );
}

export default React.memo(ToolsContainer);
