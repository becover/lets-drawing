import React, { useState, useRef, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import fontFace from '../../../assets/fontFace-DoHyeon';

const borderStyledString = (border, size) =>
  `
  text-shadow: 1px 1px ${size}px ${border},
  -1px 1px ${size}px ${border},
  -1px -1px ${size}px ${border},
  1px -1px ${size}px ${border},
  -1px 0 ${size}px ${border},
  0 -1px ${size}px ${border},
  1px 0 ${size}px ${border},
  0 1px ${size}px ${border};
`;

const fillStyledString = (fill, size) =>
  `color: ${fill};
  font-size: ${size}px;
`;

const Textbox = styled.span`
  display: inline-block;
  font-family: 'Do Hyeon', sans-serif;
  box-sizing: border-box;
  border: 1.5px dashed paleturquoise;
  line-height: 1;

  ${(props) => borderStyledString(props.border, props.size.border)}

  ${(props) => fillStyledString(props.fill, props.size.text)}
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
  text_position,
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
  onChangeButtonMode,
  onChangeActive,
  textColor,
  textSize,
}) {
  const { fill, border } = textColor;
  const [positions, setPositions] = useState(text_position);
  const [transfromRotate, setTransfromRotate] = useState(0);
  const [fillStyleStrings, setFillStyleStrings] = useState(null);
  const [borderStyleStrings, setBorderStyleStrings] = useState(null);

  const textRef = useRef();
  const rotateRef = useRef();

  useEffect(() => {
    setFillStyleStrings(fillStyledString(fill, textSize.text));
    setBorderStyleStrings(borderStyledString(border, textSize.border));
  }, [textMode, fill, border, textSize]);

  const paintText2canvas = (e) => {
    const style = `${e.target.attributes.style.value} ${e.target.parentNode.attributes.style.value} ${fillStyleStrings} ${borderStyleStrings}`;
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
      textRef.current.style.cursor = 'move';
      onMove(true);
      // }
    },
    [onOffset, onMove],
  );

  const rotationStart = useCallback(
    (e) => {
      e.preventDefault();
      if (e.target.className.includes('rotater')) {
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
        setPositions({
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
      onChangeButtonMode('text', [
        { type: 'fill', checked: false },
        { type: 'border', checked: false },
      ]);
      onChangeActive('brush', true);
      onChangeActive('text', false);
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
        top: positions.y,
        left: positions.x,
        transform: `rotate(${transfromRotate}deg)`,
        zIndex: 10,
      }}
    >
      <Textbox
        textMode={textMode}
        fill={fill}
        border={border}
        size={textSize}
        style={{
          fontSize: textSize.text,
          color: fill,
          opacity: alpha,
        }}
        ref={textRef}
        onKeyDown={onEnterkeyDown}
      >
        작성 후 엔터를 치세요
      </Textbox>
      <Rotater ref={rotateRef}>
        <span className="rotater rotate_left"></span>
        <span className="rotater rotate_right"></span>
      </Rotater>
    </div>
  );
}

export default CreateText;
