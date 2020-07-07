import React, { useRef, useEffect } from 'react';
// import { useSelector } from 'react-redux';

function Layer({
  width,
  height,
  alpha,
  color,
  lineWidth,
  lineCap,
  lineJoin,
  isPainting,
  isFilling,
  isPicking,
  isWriting,
  isDrawingShapes,
  mode,
  shapes,
  onChangeStatusToPainting,
  onChangeStatuesToClicking,
  onStackHistory,
  onRemoveRedo,
  onChangeColor,
}) {
  const layerRef = useRef();

  useEffect(() => {
    const layer = layerRef.current;
    const ctx = layer.getContext('2d');
    layer.width = width;
    layer.height = height;
    ctx.fillStyle = 'rgba(255,255,255,0';
    ctx.fillRect(0, 0, width, height);
    ctx.fillStyle = color;
    ctx.lineWidth = lineWidth;
    ctx.lineCap = lineCap;
    ctx.lineJoin = lineJoin;
  }, [width, height, color, lineWidth, lineCap, lineJoin]);

  const onRightClick = (e) => {
    e.preventDefault();
  };

  function getMousePosition(canvas, e) {
    const rect = canvas.getBoundingClientRect();
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
  }

  const onMouseDown = (e) => {
    if (isWriting) return false;
    if (isDrawingShapes) {
      e.preventDefault();
      shapes.location.start = getMousePosition(layerRef.current, e);
    }
    onChangeStatusToPainting(true);
    onChangeStatuesToClicking(true);
  };

  const onMouseMove = (e) => {
    const layer = layerRef.current;
    const ctx = layer.getContext('2d');
    const x = e.nativeEvent.offsetX;
    const y = e.nativeEvent.offsetY;
    if (!isPainting) {
      ctx.beginPath();
      ctx.moveTo(x, y);
    } else {
      layer.style.webkitFilter = 'blur(0.4px)';
      ctx.fillStyle = color;
      ctx.strokeStyle = color;
      ctx.lineTo(x, y);
      ctx.stroke();
    }
  };

  const onMouseUp = (e) => {
    const layer = layerRef.current;
    const ctx = layer.getContext('2d');
    const layerImg = new Image();
    const src = layer.toDataURL('image/png');
    layerImg.src = src;
    const canvasImg = new Image();
    const style = e.target.attributes.style.value;
    const xml = `
    <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
      <foreignObject width="100%" height="100%">
        <div xmlns="http://www.w3.org/1999/xhtml">
          <style>
          img {
            position: absolute;
            top:0;
            left:0;
            ${style}
          }
          </style>
          <img src="${src}"/>
        </div>
      </foreignObject>
    </svg>`;
    canvasImg.src = 'data:image/svg+xml,' + encodeURIComponent(xml);
    canvasImg.onload = function () {
      onStackHistory(canvasImg);
      onChangeStatusToPainting(false);
      onChangeStatuesToClicking(false);
      onRemoveRedo();
      ctx.clearRect(0, 0, width, height);
    };
  };

  // const onHandleLayerClick = (e) => {
  //   const layer = layerRef.current;
  //   const ctx = layer.getContext('2d');
  //   // isFilling &&
  //   // (setCurrentColor2ctx(),
  //   // ctx.fillRect(0, 0, width, height));
  //   // isWriting && handleFillText(e.offsetX, e.offsetY);
  // };

  // function setCurrentColor2ctx() {
  //   const layer = layerRef.current;
  //   const ctx = layer.getContext('2d');
  //   handleAlphaValue();
  //   ctx.fillStyle = color;
  //   layerCtx.fillStyle = color;
  //   layerCtx.strokeStyle = color;
  // }

  return (
    <canvas
      style={{
        boxShadow: '1px 1px 5px #c0c0c0, -1px 1px 5px #c0c0c0',
        position: 'absolute',
        top: '0',
        left: '0',
        width: width,
        height: height,
        opacity: alpha,
      }}
      onContextMenu={onRightClick}
      ref={layerRef}
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
      onMouseLeave={() => onChangeStatusToPainting(false)}
      // onClick={onHandleLayerClick}
    ></canvas>
  );
}

export default Layer;
