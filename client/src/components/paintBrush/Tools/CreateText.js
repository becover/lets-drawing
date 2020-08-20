import React, { useState, useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import styled, { css } from 'styled-components';
import fontFace from '../../../assets/fontFace-DoHyeon';

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
}) {
  // const [mode, setMode] = useState(textMode);
  const textRef = useRef();

  useEffect(() => {
    console.log(fillMode, borderMode);
  }, [fillMode, borderMode]);

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

  const onEnterkeyDown = (e) => {
    if (e.keyCode === 13) {
      e.preventDefault();
      // paintText2canvas(e);
      // initDragStatus();
      onChangeStatusTowriting(false);
      onChangeMode('brush');
    }
  };

  return (
    <Textbox
      textMode={textMode}
      fillMode={fillMode}
      borderMode={borderMode}
      style={{
        position: 'absolute',
        top: position.y,
        left: position.x,
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
      }}
      ref={textRef}
      onDoubleClick={() => (textRef.current.contentEditable = isWriting)}
      onKeyDown={onEnterkeyDown}
    >
      작성 후 엔터를 치세요
    </Textbox>
  );
}

export default CreateText;
