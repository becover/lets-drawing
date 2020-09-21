import React, { useState, useRef, useEffect, useCallback } from 'react';
import styled, { css } from 'styled-components';
import fontFace from '../../../assets/fontFace-DoHyeon';
// import { css, jsx } from '@emotion/core';
// import styled from '@emotion/styled';

const Textbox = styled.span`
  display: inline-block;
  font-family: 'Do Hyeon', sans-serif;
  box-sizing: border-box;
  border: 1.5px dashed paleturquoise;
  line-height: 1;

  ${(props) =>
    props.textMode === 'border' &&
    css`
      text-shadow: 1px 1px ${props.borderMode.lineWidth}px
          ${props.borderMode.color},
        -1px 1px ${props.borderMode.lineWidth}px ${props.borderMode.color},
        -1px -1px ${props.borderMode.lineWidth}px ${props.borderMode.color},
        1px -1px ${props.borderMode.lineWidth}px ${props.borderMode.color},
        -1px 0 ${props.borderMode.lineWidth}px ${props.borderMode.color},
        0 -1px ${props.borderMode.lineWidth}px ${props.borderMode.color},
        1px 0 ${props.borderMode.lineWidth}px ${props.borderMode.color},
        0 1px ${props.borderMode.lineWidth}px ${props.borderMode.color};
    `}

  ${(props) =>
    props.textMode === 'fill' &&
    css`
      color: ${props.fillMode.color};
      font-size: ${props.fillMode.lineWidth}px;
    `}
`;

const Rotater = styled.div`
  .rotater {
    display: inline-block;
    position: absolute;
    width: 20px;
    height: 100%;
    background: rgba(95, 0, 236, 0.35);
    top: 0;
    cursor: grab;
  }

  .rotate_left {
    left: -20.5px;
  }
  .rotate_right {
    right: -20.5px;
  }
`;

function CreateText({
  // position,
  size,
  fillMode,
  borderMode,
  isWriting,
  alpha,
  textMode,
  onChangeStatusTowriting,
  onChangeMode,
  onStartAngle,
  onAngle,
  onCenter,
  onOffset,
  onRotation,
  onRotate,
  onMove,
  startAngle,
  angle,
  center,
  offset,
  rotation,
  rotate,
  move,
  onStackHistory,
  layerRef,
  width,
  height,
  setInitialSwitch,
}) {
  // const [mode, setMode] = useState(textMode);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [transfromRotate, setTransfromRotate] = useState(0);

  const textRef = useRef();
  const rotateRef = useRef();

  const paintText2canvas = (e) => {
    const style = `${e.target.attributes.style.value} ${e.target.parentNode.attributes.style.value}`;
    const text = e.target.innerText;
    const xml = `
    <svg xmlns="http://www.w3.org/2000/svg">
      <foreignObject width="100%" height="100%">
        <div xmlns="http://www.w3.org/1999/xhtml">
          <style>
          ${fontFace}
          span {
            position: absolute;
            display: inline-block;
            font-family: "Do Hyeon", sans-serif;
            background-color: transparent;
            word-wrap: break-word;
            word-break: break-all;
            line-height: 1;
            -webkit-user-select: none;
            -moz-user-select: none;
            -ms-user-select: none;
            user-select: none;
            ${style}
          }
          </style>
          <span font-family="Do Hyeon">${text}</span>
        </div>
      </foreignObject>
    </svg>`;
    const img = new Image();
    img.src = 'data:image/svg+xml,' + encodeURIComponent(xml);
    img.onload = function () {
      layerRef.current.getContext('2d').drawImage(img, 0, 0, width, height);
      onStackHistory(img);
    };
  };

  const dragStart = useCallback(
    (e) => {
      console.log(e);
      e.preventDefault();
      onOffset('x', e.offsetX);
      onOffset('y', e.offsetY);
      // if (e.target.className.includes('rotater')) {
      //   console.log('rotate!');
      //   const x = e.clientX - center.x;
      //   const y = e.clientY - center.y;
      //   onStartAngle((180 / Math.PI) * Math.atan2(y, x));
      //   onRotate(true);
      // } else {
      console.log('move!');
      textRef.current.style.cursor = 'move';
      onMove(true);
      // }
    },
    [onOffset, onMove],
  );

  const rotationStart = useCallback(
    (e) => {
      console.log(e);
      e.preventDefault();
      if (e.target.className.includes('rotater')) {
        console.log('rotate!');
        const x = e.clientX - center.x;
        const y = e.clientY - center.y;
        onStartAngle((180 / Math.PI) * Math.atan2(y, x));
        onRotate(true);
      }
    },
    [onStartAngle, onRotate, center.x, center.y],
  );

  const dragging = useCallback(
    (e) => {
      e.preventDefault();
      if (rotate) {
        const x = e.clientX - center.x;
        const y = e.clientY - center.y;
        const degree = Math.round((180 / Math.PI) * Math.atan2(y, x));
        onRotation(degree - startAngle);
        setTransfromRotate(angle + rotation);
      }
      if (move) {
        const x = e.clientX - offset.x;
        const y = e.clientY - offset.y;
        setPosition({
          x: x - document.querySelector('.layer').getBoundingClientRect().left,
          y: y - document.querySelector('.layer').getBoundingClientRect().top,
        });
      }
    },
    [
      rotate,
      onRotation,
      offset.y,
      offset.x,
      angle,
      center.x,
      center.y,
      startAngle,
      move,
      rotation,
    ],
  );

  const dragStop = useCallback(() => {
    if (rotate) {
      onAngle(Math.round(angle + rotation));
      return onRotate(false);
    }
    if (move) {
      textRef.current.style.cursor = 'pointer';
      return onMove(false);
    }
  }, [rotate, onAngle, angle, rotation, onRotate, onMove, move]);

  const onEnterkeyDown = (e) => {
    if (e.keyCode === 13) {
      e.preventDefault();
      paintText2canvas(e);
      // initDragStatus();
      onChangeStatusTowriting(false);
      onChangeMode('brush');
      setInitialSwitch([
        { id: 'fill', checked: false },
        { id: 'border', checked: false },
      ]);
    }
  };

  useEffect(() => {
    const {
      top,
      left,
      height,
      width,
    } = textRef.current.getBoundingClientRect();

    onCenter('x', left + width / 2);
    onCenter('y', top + height / 2);

    const textDom = textRef.current;
    const rotateDom = rotateRef.current;
    console.dir(rotateDom);
    textDom.addEventListener('dblclick', function dbClick() {
      textDom.contentEditable = isWriting;
      textDom.style.cursor = 'text';
      textDom.focus();
      let range = new Range();
      range.setStart(textDom, 0);
      range.setEnd(textDom, 1);
      document.getSelection().removeAllRanges();
      document.getSelection().addRange(range);
    });
    textDom.addEventListener('blur', function loseFocus() {
      textDom.contentEditable = false;
      textDom.style.cursor = 'default';
    });
    textDom.addEventListener('mousedown', dragStart, false);
    textDom.addEventListener('mousemove', dragging, false);
    textDom.addEventListener('mouseup', dragStop, false);
    textDom.addEventListener('mouseleave', dragStop, false);
    rotateDom.addEventListener('mousedown', rotationStart, false);
    rotateDom.addEventListener('mousemove', dragging, false);
    rotateDom.addEventListener('mouseup', dragStop, false);
    rotateDom.addEventListener('mouseleave', dragStop, false);

    return () => {
      textDom.removeEventListener('dblclick', function dbClick() {
        textDom.contentEditable = isWriting;
        textDom.style.cursor = 'text';
        textDom.focus().setSelectionRange(0, 10);
      });
      textDom.removeEventListener('blur', function loseFocus() {
        textDom.contentEditable = false;
        textDom.style.cursor = 'default';
      });
      textDom.removeEventListener('mousedown', dragStart, false);
      textDom.removeEventListener('mousemove', dragging, false);
      textDom.removeEventListener('mouseup', dragStop, false);
      textDom.removeEventListener('mouseleave', dragStop, false);
      rotateDom.removeEventListener('mousedown', rotationStart, false);
      rotateDom.removeEventListener('mousemove', dragging, false);
      rotateDom.removeEventListener('mouseup', dragStop, false);
      rotateDom.removeEventListener('mouseleave', dragStop, false);
    };
  }, [
    onCenter,
    rotationStart,
    dragStart,
    dragging,
    dragStop,
    isWriting,
    center.x,
    center.y,
  ]);

  return (
    <div
      style={{
        position: 'absolute',
        top: position.y,
        left: position.x,
        transform: `rotate(${transfromRotate}deg)`,
        zIndex: 10,
      }}
    >
      <Textbox
        textMode={textMode}
        fillMode={fillMode}
        borderMode={borderMode}
        style={{
          fontSize: fillMode.lineWidth,
          color: fillMode.color,
          opacity: alpha,
        }}
        ref={textRef}
        // onDoubleClick={() => {
        //   textRef.current.contentEditable = isWriting;
        //   textRef.current.style = 'text';
        //   textRef.current.fucus();
        // }}
        onKeyDown={onEnterkeyDown}
        // onBlur={() => {
        //   textRef.current.contentEditable = false;
        //   textRef.current.style = 'default';
        // }}
        // onMouseEnter={() => (textRef.current.style = 'pointer')}
        // onMouseDown={dragStart}
        // onMouseMove={dragging}
        // onMouseUp={dragStop}
        // onMouseLeave={dragStop}
      >
        작성 후 엔터를 치세요
      </Textbox>
      <Rotater ref={rotateRef}>
        <span class="rotater rotate_left"></span>
        <span class="rotater rotate_right"></span>
      </Rotater>
    </div>
  );
}

export default CreateText;
