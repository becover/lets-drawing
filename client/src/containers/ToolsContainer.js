import React, { useState, useCallback, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import {
  alpha,
  change_linecap,
  change_lineJoin,
  change_lineWidth,
  change_color,
  change_mode,
  is_painting,
  is_filling,
  is_pipetting,
  is_picking,
  is_writing,
  is_drawing_shapes,
  shapes_type,
} from '../redux/modules/canvas';
import {
  active,
  change_button_mode,
  text_colors,
  text_size,
} from '../redux/modules/tools';
import { text_mode } from '../redux/modules/text';
import { undo, redo } from '../redux/modules/history';
import Brush from '../components/paintBrush/Tools/Brush';
import Text from '../components/paintBrush/Tools/Text';
import Shapes from '../components/paintBrush/Tools/Shapes';
import Colors from '../components/paintBrush/Tools/Colors';
import ColorPicker from '../components/paintBrush/Tools/ColorPicker';
import Pipett from '../components/paintBrush/Tools/Pipett';
import History from '../components/paintBrush/Tools/History/History';
import Range from '../components/paintBrush/Tools/Range/Range';

const handleDisplay = (painting, noshow) => {
  // console.log('painting', painting, 'noshow', noshow);
  let result;
  if (!painting && !noshow) result = `display:block`;
  else if (!painting && noshow) result = `display:none`;
  else if (painting && !noshow) result = `display:none`;
  // console.log(result);
  return result;
};
const ToolsButtom = styled.div`
  display: none;
  position: fixed;
  bottom: 60px;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 100;
  transition: 0.3s;

  ${(props) => handleDisplay(props.isPainting, props.handleShow.current)}
`;

function ToolsContainer() {
  const [textModeAlpha, setTextModeAlpha] = useState(100);
  const dispatch = useDispatch();
  const {
    color,
    isPainting,
    isPicking,
    isWriting,
    isPipetting,
    mode: canvasMode,
  } = useSelector(({ canvas }) => ({
    color: canvas.color,
    isPainting: canvas.isPainting,
    isPicking: canvas.isPicking,
    isWriting: canvas.isWriting,
    isPipetting: canvas.isPipetting,
    mode: canvas.mode,
  }));

  const {
    text: textState,
    brush: brushsState,
    shape: shapeState,
  } = useSelector(({ tools }) => ({
    text: tools.text,
    brush: tools.brush,
    shape: tools.shape,
  }));

  const { text_mode: textMode } = useSelector(({ text }) => ({
    text_mode: text.mode,
  }));

  const onChangeMode = useCallback((mode) => dispatch(change_mode(mode)), [
    dispatch,
  ]);
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

  const onChangeLineJoin = useCallback(
    (lineJoin) => dispatch(change_lineJoin(lineJoin)),
    [dispatch],
  );

  const onChangeLineWidth = useCallback(
    (value) => dispatch(change_lineWidth(value)),
    [dispatch],
  );

  const onChangeStatusToPainting = useCallback(
    (boolean) => dispatch(is_painting(boolean)),
    [dispatch],
  );

  const onChangeStatusToWriting = useCallback(
    (boolean) => dispatch(is_writing(boolean)),
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

  const onChangeStatusToTextMode = useCallback(
    (mode) => dispatch(text_mode(mode)),
    [dispatch],
  );

  const onChangesStatusToDrawingShapes = useCallback(
    (boolean) => dispatch(is_drawing_shapes(boolean)),
    [dispatch],
  );

  const onChangesShapesType = useCallback(
    (types) => dispatch(shapes_type(types)),
    [dispatch],
  );

  //tools
  const onChangeActive = useCallback(
    (kinds, boolean) => dispatch(active(kinds, boolean)),
    [dispatch],
  );

  const onChangeButtonMode = useCallback(
    (kinds, mode) => dispatch(change_button_mode(kinds, mode)),
    [dispatch],
  );

  const onChangeTextColor = useCallback(
    (mode, colors) => dispatch(text_colors(mode, colors)),
    [dispatch],
  );

  const onChangeTextSize = useCallback(
    (mode, size) => dispatch(text_size(mode, size)),
    [dispatch],
  );

  //history
  const onUndo = useCallback((history) => dispatch(undo(history)), [dispatch]);
  const onRedo = useCallback((history) => dispatch(redo(history)), [dispatch]);

  /**
   * ctrl + alt 키 동시에 누를때 하단 툴이 paining 상태와 동일하게 바뀌길 원하는데
   * 이게 안됨 ..................ㅡㅡ후...
   */
  let handleShow = useRef();
  handleShow.current = false;
  const handleKeydownToolsBottom = useCallback(
    (e) => {
      if (e.ctrlKey && e.altKey) {
        // console.log('알트키 눌렀당');
        handleShow.current = true;
        // console.log(handleShow.current);
      }
    },
    [handleShow],
  );

  const handleKeyupToolsBottom = useCallback(
    (e) => {
      // console.log('알트키 땠당');
      handleShow.current = false;
      // console.log(handleShow.current);
    },
    [handleShow],
  );
  useEffect(() => {
    window.addEventListener('keydown', handleKeydownToolsBottom);
    window.addEventListener('keyup', handleKeyupToolsBottom);
    return () => {
      window.removeEventListener('keydown', handleKeydownToolsBottom);
      window.removeEventListener('keyup', handleKeyupToolsBottom);
    };
  }, [handleKeydownToolsBottom, handleKeyupToolsBottom]);
  return (
    <div
      style={{
        borderBottom: '1px solid #eee',
        padding: '10px 0',
        height: '9vh',
        boxSizing: 'border-box',
      }}
    >
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
          onChangeLineJoin={onChangeLineJoin}
          onChangeStatusToPainting={onChangeStatusToPainting}
          onChangeStatusToFilling={onChangeStatusToFilling}
          canvasMode={canvasMode}
          onChangeActive={onChangeActive}
          onChangeButtonMode={onChangeButtonMode}
          brushsState={brushsState}
          isWriting={isWriting}
        />
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <Text
            onChangeStatusToWriting={onChangeStatusToWriting}
            onChangeStatusToTextMode={onChangeStatusToTextMode}
            onChangeMode={onChangeMode}
            onChangeActive={onChangeActive}
            onChangeButtonMode={onChangeButtonMode}
            textState={textState}
            onChangeTextColor={onChangeTextColor}
            color={color}
          />
          <Shapes
            onChangeMode={onChangeMode}
            onDrawingShapes={onChangesStatusToDrawingShapes}
            onChangesShapesType={onChangesShapesType}
            textState={textState}
            shapeState={shapeState}
            onChangeButtonMode={onChangeButtonMode}
          />
        </div>
        <Colors
          onChangeColor={onChangeColor}
          textModeAlpha={textModeAlpha}
          canvasMode={canvasMode}
        />
        <div
          style={{
            width: '3%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Pipett
            onChangeStatusToPipetting={onChangeStatusToPipetting}
            isPicking={isPicking}
            isPipetting={isPipetting}
          />
          <ColorPicker
            onChangeStatusToPicking={onChangeStatusToPicking}
            onChangeColor={onChangeColor}
            isPicking={isPicking}
          />
        </div>
      </div>
      <ToolsButtom isPainting={isPainting} handleShow={handleShow}>
        <Range
          onChangeLineWidth={onChangeLineWidth}
          onChangeAlpha={onChangeAlpha}
          onChangeColor={onChangeColor}
          color={color}
          canvasMode={canvasMode}
          textMode={textMode}
          setTextModeAlpha={setTextModeAlpha}
          onChangeTextSize={onChangeTextSize}
        />
        <History onUndo={onUndo} onRedo={onRedo} />
      </ToolsButtom>
    </div>
  );
}

export default React.memo(ToolsContainer);
