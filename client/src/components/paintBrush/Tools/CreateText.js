import React, { useState, useRef, useEffect, useCallback } from 'react';
import styled, { css } from 'styled-components';
import { STATES } from 'mongoose';
// import fontFace from '../../../assets/fontFace-DoHyeon';

const Textbox = styled.span`
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

function CreateText({
  position,
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
}) {
  // const [mode, setMode] = useState(textMode);
  const [positon, setPosition] = useState({ x: 0, y: 0 });

  const textRef = useRef();

  // const paintText2canvas = (e) =>{
  //   const style = e.target.attributes.style.value;
  //   const text = e.target.innerText;
  //   const xml = `
  //   <svg xmlns="http://www.w3.org/2000/svg" width="500" height="500">
  //     <foreignObject width="100%" height="100%">
  //       <div xmlns="http://www.w3.org/1999/xhtml">
  //         <style>
  //         ${fontFace}
  //         span {
  //           position: absolute;
  //           display: inline-block;
  //           font-family: "Do Hyeon", sans-serif;
  //           background-color: transparent;
  //           word-wrap: break-word;
  //           word-break: break-all;
  //           line-height: 1;
  //           -webkit-user-select: none;
  //           -moz-user-select: none;
  //           -ms-user-select: none;
  //           user-select: none;
  //           ${style}
  //         }
  //         </style>
  //         <span font-family="Do Hyeon">${text}</span>
  //       </div>
  //     </foreignObject>
  //   </svg>`;
  //   const img = new Image();
  //   img.src = "data:image/svg+xml," + encodeURIComponent(xml);
  //   img.onload = function () {
  //     ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
  //     removeEl(e.target);
  //     stackCanvasHistory();
  //   };
  // }

  const dragStart = useCallback(
    (e) => {
      e.preventDefault();
      const {
        top,
        left,
        height,
        width,
      } = textRef.current.getBoundingClientRect();
      console.log(top, left, height, width, e.offsetX, e.offsetY);

      onOffset('x', e.offsetX);
      onOffset('y', e.offsetY);

      onCenter('x', left + width / 2);
      onCenter('y', top + height / 2);

      if (
        Math.abs(center.x - e.clientX) <= 50 &&
        Math.abs(center.y - e.clientY) <= 50
      ) {
        textRef.current.style.cursor = 'move';
        onMove(true);
      } else {
        const x = e.clientX - center.x;
        const y = e.clientY - center.y;
        onStartAngle((180 / Math.PI) * Math.atan2(y, x));
        onRotate(true);
      }
    },
    [onOffset, onCenter, center.x, center.y, onMove, onStartAngle, onRotate],
  );

  const dragging = useCallback(
    (e) => {
      e.preventDefault();
      if (rotate) {
        const x = e.clientX - center.x;
        const y = e.clientY - center.y;
        const degree = Math.round((180 / Math.PI) * Math.atan2(y, x));
        onRotation(degree - startAngle);
        textRef.current.style.transform = `rotate(${angle + rotation}deg)`;
      }
      if (move) {
        const y = e.clientY - offset.y;
        const x = e.clientX - offset.x;
        console.log(
          'move! x y top',
          x,
          y,
          textRef.current.getBoundingClientRect().top,
        );

        setPosition({
          x: x - textRef.current.getBoundingClientRect().left,
          y: y - textRef.current.getBoundingClientRect().top,
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
      // paintText2canvas(e);
      // initDragStatus();
      onChangeStatusTowriting(false);
      onChangeMode('brush');
    }
  };

  useEffect(() => {
    const textDom = textRef.current;
    textDom.addEventListener('dblclick', function dbClick() {
      textDom.contentEditable = isWriting;
      textDom.style.cursor = 'text';
      textDom.focus();
    });
    textDom.addEventListener('blur', function loseFocus() {
      textDom.contentEditable = false;
      textDom.style.cursor = 'default';
    });
    textDom.addEventListener('mouseenter', function hover() {
      textDom.style.cursor = 'pointer';
    });
    textDom.addEventListener('mousedown', dragStart, false);
    textDom.addEventListener('mousemove', dragging, false);
    textDom.addEventListener('mouseup', dragStop, false);
    textDom.addEventListener('mouseleave', dragStop, false);
    return () => {
      textDom.removeEventListener('dblclick', function dbClick() {
        textDom.contentEditable = isWriting;
        textDom.style.cursor = 'text';
        textDom.focus();
      });
      textDom.removeEventListener('blur', function loseFocus() {
        textDom.contentEditable = false;
        textDom.style.cursor = 'default';
      });
      textDom.removeEventListener('mouseenter', function hover() {
        textDom.style.cursor = 'pointer';
      });
      textDom.removeEventListener('mousedown', dragStart, false);
      textDom.removeEventListener('mousemove', dragging, false);
      textDom.removeEventListener('mouseup', dragStop, false);
      textDom.removeEventListener('mouseleave', dragStop, false);
    };
  }, [dragStart, dragging, dragStop, isWriting]);

  return (
    <Textbox
      textMode={textMode}
      fillMode={fillMode}
      borderMode={borderMode}
      style={{
        position: 'absolute',
        zIndex: 10,
        top: positon.y,
        left: positon.x,
        fontSize: fillMode.lineWidth,
        color: fillMode.color,
        opacity: alpha,
        textShadow: `1px 1px ${borderMode.lineWidth}px
        -1px 1px ${borderMode.lineWidth}px ${borderMode.color},
        -1px -1px ${borderMode.lineWidth}px ${borderMode.color},
        1px -1px ${borderMode.lineWidth}px ${borderMode.color},
        -1px 0 ${borderMode.lineWidth}px ${borderMode.color},
        0 -1px ${borderMode.lineWidth}px ${borderMode.color},
        1px 0 ${borderMode.lineWidth}px ${borderMode.color},
        0 1px ${borderMode.lineWidth}px ${borderMode.color}`,
        transform: `rotate(${angle + rotation})deg`,
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
  );
}

export default CreateText;
