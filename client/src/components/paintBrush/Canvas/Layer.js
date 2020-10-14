import React, { useRef, useEffect, useState, useCallback } from 'react';
// import { is_writing } from '../../../redux/modules/canvas';
// import { useSelector } from 'react-redux';
import CreateText from '../Tools/CreateText';

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
  canvasMode,
  shapes,
  onChangeStatusToPainting,
  onChangeStatusToClicking,
  onChangeStatusTowriting,
  onStackHistory,
  onRemoveRedo,
  onChangeColor,
  textMode,
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
  setInitialSwitch,
  onChangeButtonMode,
  onChangeActive,
  onChangeTextColor,
  textColor,
  loadImage,
}) {
  const layerRef = useRef();
  const [position, setPosition] = useState({ x: 10, y: 10 });

  useEffect(() => {
    const layer = layerRef.current;
    const ctx = layer.getContext('2d');
    layer.width = width;
    layer.height = height;
    ctx.fillStyle = 'rgba(255,255,255,0)';
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
    onChangeStatusToClicking(true);
  };

  const onMouseMove = (e) => {
    const layer = layerRef.current;
    const ctx = layer.getContext('2d');
    const x = e.nativeEvent.offsetX;
    const y = e.nativeEvent.offsetY;

    if (!isPainting) {
      ctx.beginPath();
      ctx.moveTo(x, y);
    } else if (isDrawingShapes) {
      e.preventDefault();
      ctx.fillStyle = color;
      ctx.strokeStyle = color;
      shapes.location.end = getMousePosition(layer, e);
      ctx.clearRect(0, 0, width, height);
      ctx.beginPath();

      if (shapes.type === 'rectangle') {
        ctx.strokeRect(
          shapes.location.start.x,
          shapes.location.start.y,
          shapes.location.end.x - shapes.location.start.x,
          shapes.location.end.y - shapes.location.start.y,
        );
      } else if (shapes.type === 'triangle') {
        const triangle = new Path2D();
        triangle.moveTo(
          shapes.location.start.x +
            (shapes.location.end.x - shapes.location.start.x) / 2,
          shapes.location.start.y,
        );
        triangle.lineTo(shapes.location.start.x, shapes.location.end.y);
        triangle.lineTo(shapes.location.end.x, shapes.location.end.y);
        triangle.closePath();
        ctx.stroke(triangle);
      } else if (shapes.type === 'circle') {
        const circle = new Path2D();
        circle.arc(
          shapes.location.start.x +
            (shapes.location.end.x - shapes.location.start.x) / 2,
          shapes.location.start.y +
            (shapes.location.end.y - shapes.location.start.y) / 2,
          (shapes.location.end.x - shapes.location.start.x) / 2,
          -0.5 * Math.PI,
          2 * Math.PI,
        );
        ctx.stroke(circle);
      }
    } else {
      layer.style.webkitFilter = 'blur(0.4px)';
      ctx.fillStyle = color;
      ctx.strokeStyle = color;
      ctx.lineTo(x, y);
      ctx.stroke();
    }
  };

  const handleHtmlToImage = useCallback(
    (src, ctx) => {
      const canvasImg = new Image();
      const style = layerRef.current.attributes.style.value;
      console.log(style, layerRef.current);
      const xml = `
    <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
      <foreignObject width="100%" height="100%">
        <div xmlns="http://www.w3.org/1999/xhtml">
          <style>
          img {
            position: absolute;
            top:0;
            left:0;
            background: transparent;
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
        onChangeStatusToClicking(false);
        onRemoveRedo();
        ctx.clearRect(0, 0, width, height);
      };
    },
    [
      onStackHistory,
      onChangeStatusToPainting,
      onChangeStatusToClicking,
      onRemoveRedo,
      width,
      height,
    ],
  );

  const onMouseUp = (e) => {
    const layer = layerRef.current;
    const ctx = layer.getContext('2d');
    if (isFilling) ctx.fillRect(0, 0, width, height);
    const layerImg = new Image();
    const src = layer.toDataURL('image/png');
    layerImg.src = src;
    handleHtmlToImage(src, ctx);
  };

  const fillCanvas = (ctx) => {
    ctx.fillRect(0, 0, width, height);
  };

  const onHandleLayerClick = (e) => {
    const layer = layerRef.current;
    const ctx = layer.getContext('2d');
    isFilling && fillCanvas(ctx);
    isWriting && setPosition({ x: e.offsetX, y: e.offsetY });
  };

  // function setCurrentColor2ctx() {
  //   const layer = layerRef.current;
  //   const ctx = layer.getContext('2d');
  //   handleAlphaValue();
  //   ctx.fillStyle = color;
  //   layerCtx.fillStyle = color;
  //   layerCtx.strokeStyle = color;
  // }
  const watchLoadFileButton = useCallback(() => {
    const layer = layerRef.current;
    const ctx = layer.getContext('2d');
    const img = new Image();
    const url = window.URL || window.webkitURL;

    img.src = loadImage.src;
    img.onload = function () {
      const width = img.width;
      const height = img.height;
      ctx.drawImage(img, 0, 0, width, height);
      url.revokeObjectURL(img.src);
      const imgToDataURL = layer.toDataURL('image/png');
      handleHtmlToImage(imgToDataURL, ctx);
    };
  }, [loadImage.src, handleHtmlToImage]);

  useEffect(() => {
    loadImage.isActive && watchLoadFileButton();
  }, [loadImage.isActive, watchLoadFileButton]);

  return (
    <div
      style={{
        position: 'relative',
        overflow: 'hidden',
        height: '100%',
      }}
    >
      {isWriting && (
        <CreateText
          text_position={position}
          size={lineWidth}
          isWriting={isWriting}
          alpha={alpha}
          textMode={textMode}
          onChangeStatusTowriting={onChangeStatusTowriting}
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
          onStackHistory={onStackHistory}
          layerRef={layerRef}
          width={width}
          height={height}
          setInitialSwitch={setInitialSwitch}
          onChangeButtonMode={onChangeButtonMode}
          onChangeActive={onChangeActive}
          textColor={textColor}
        />
      )}
      <canvas
        className="layer"
        style={{
          position: 'absolute',
          top: '0',
          left: '0',
          width: width,
          height: height,
          opacity: alpha,
          zIndex: 0,
        }}
        onContextMenu={onRightClick}
        ref={layerRef}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={() => onChangeStatusToPainting(false)}
        onClick={onHandleLayerClick}
      ></canvas>
    </div>
  );
}

export default Layer;
