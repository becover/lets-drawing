import React, { useState, useCallback, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled, { css } from 'styled-components';
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
const ToolsContainerWapper = styled.div`
  width: 100%;
  border-bottom: 1px solid #c6c6c6;
  padding: 10px 0;
  height: 9vh;
  box-sizing: border-box;
  position: relative;
  background-color: #fff;
  z-index: 10;
  .mobile_toolbar_btn {
    display: none;
  }
  @media only screen and (max-width: 786px) {
    position: absolute;
    height: 16vh;
    min-height: 152px;
    ${(props) =>
      props.foldTools &&
      css`
        height: 8vh;
        min-height: 82px;
        .mobile_toolbar_btn svg {
          transform: rotate(0deg);
        }
      `}

    ${(props) =>
      !props.foldTools &&
      css`
        .mobile_toolbar_btn svg {
          transform: rotate(180deg);
        }
      `}
    .mobile_toolbar_btn {
      display: inline-block;
      position: absolute;
      top: 100%;
      right: 30px;
      border-left: 1px solid #d7d7d7;
      border-right: 1px solid #d7d7d7;
      border-bottom: 1px solid #d7d7d7;
      border-radius: 0 0 5px 5px;
      background: #fff;
      width: 30px;
      text-align: center;
      svg {
        transform-origin: 50% 50%;
        cursor: pointer;
        transition: ease-in-out 0.2s;
      }
    }
  }
`;
const ToolsLayout = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  @media only screen and (max-width: 786px) {
    max-width: 260px;
    flex-wrap: wrap;
    margin: auto;
    ${(props) =>
      props.foldTools &&
      css`
        height: 64px;
        overflow: hidden;
      `}
  }
`;
const PippetAndPicker = styled.div`
  width: 3%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  @media only screen and (max-width: 786px) {
    width: 30px;
    justify-content: space-around;
    margin-top: 8px;
    ${(props) =>
      props.foldTools &&
      css`
        display: none;
      `}
  }
`;
const ToolsButtom = styled.div`
  display: none;
  position: fixed;
  bottom: 60px;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 100;
  transition: 0.3s;
  @media only screen and (max-width: 786px) {
    bottom: 15px;
  }
  ${(props) => handleDisplay(props.isPainting, props.handleShow.current)}
`;
const TextAndShapesLayout = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 62px;
  margin-left:5px;
  @media only screen and (max-width: 900px) {
    width: 15%;
    
  }
  @media only screen and (max-width: 786px) {
    width: 120px;
    /* ${(props) => props.foldTools && 'height:56px'} */
  }
`;

function ToolsContainer() {
  const [foldTools, setFoldTools] = useState(true);
  const [textModeAlpha, setTextModeAlpha] = useState(100);
  const dispatch = useDispatch();
  //#region
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
  //#endregion
  return (
    <ToolsContainerWapper foldTools={foldTools}>
      <ToolsLayout foldTools={foldTools}>
        <Brush
          foldTools={foldTools}
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
        <TextAndShapesLayout foldTools={foldTools}>
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
        </TextAndShapesLayout>
        <Colors
          foldTools={foldTools}
          onChangeColor={onChangeColor}
          textModeAlpha={textModeAlpha}
          canvasMode={canvasMode}
        />
        <PippetAndPicker foldTools={foldTools}>
          <Pipett
            foldTools={foldTools}
            onChangeStatusToPipetting={onChangeStatusToPipetting}
            isPicking={isPicking}
            isPipetting={isPipetting}
          />
          <ColorPicker
            foldTools={foldTools}
            onChangeStatusToPicking={onChangeStatusToPicking}
            onChangeColor={onChangeColor}
            isPicking={isPicking}
          />
        </PippetAndPicker>
      </ToolsLayout>
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
      <span
        className="mobile_toolbar_btn"
        onClick={() => {
          setFoldTools((prev) => !prev);
        }}
      >
        <svg
          viewBox="0 0 15 15"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          width="15"
          height="15"
        >
          <path
            d="M14 5l-6.5 7L1 5"
            stroke="currentColor"
            stroke-linecap="square"
          ></path>
        </svg>
      </span>
    </ToolsContainerWapper>
  );
}

export default React.memo(ToolsContainer);
