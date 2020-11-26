import React, { useRef, useEffect, useState, useCallback } from 'react';
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
  isWriting,
  isDrawingShapes,
  shapes,
  onChangeStatusToPainting,
  onChangeStatusToClicking,
  onChangeStatusTowriting,
  onStackHistory,
  onRemoveRedo,
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
  textColor,
  textSize,
  loadImage,
  undo,
  onClear,
  isClear,
  onSettingButton,
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

  function getEventPosition(canvas, e) {
    const rect = canvas.getBoundingClientRect();
    return {
      x: (e.targetTouches ? e.targetTouches[0].pageX : e.clientX) - rect.left,
      y: (e.targetTouches ? e.targetTouches[0].pageY : e.clientY) - rect.top,
    };
  }

  const onMouseDown = (e) => {
    if (isWriting) return false;
    if (isDrawingShapes) {
      e.preventDefault();
      shapes.location.start = getEventPosition(layerRef.current, e);
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
      shapes.location.end = getEventPosition(layer, e);
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

  const vCanvasRef = useRef();
  const handleHtmlToImage = useCallback(
    (src, ctx) => {
      const canvasImg = new Image();
      const vCanvas = vCanvasRef.current;
      const vCtx = vCanvas.getContext('2d');
      vCanvas.width = width;
      vCanvas.height = height;
      if (undo.length > 0) {
        vCtx.drawImage(undo[undo.length - 1], 0, 0, width, height);
      }
      const style = layerRef.current.attributes.style.value;
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
      canvasImg.onload = async function () {
        await vCtx.drawImage(canvasImg, 0, 0, width, height);
        const mergeImg = new Image();
        mergeImg.src = vCanvas.toDataURL('image/png');
        await onStackHistory(mergeImg);
        await onChangeStatusToPainting(false);
        await onChangeStatusToClicking(false);
        await onRemoveRedo();
        ctx.clearRect(0, 0, width, height);
        vCtx.clearRect(0, 0, width, height);
      };
    },
    [
      onStackHistory,
      onChangeStatusToPainting,
      onChangeStatusToClicking,
      onRemoveRedo,
      width,
      height,
      undo,
    ],
  );

  const onMouseUp = () => {
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
      onSettingButton('loadImage', 'isActive', false);
      onSettingButton('loadImage', 'src', null);
    };
  }, [loadImage.src, handleHtmlToImage, onSettingButton]);

  const handleClearCanvas = useCallback(async () => {
    const layer = await layerRef.current;
    const ctx = await layer.getContext('2d');
    ctx.fillStyle = 'rgba(255,255,255,0)';
    ctx.fillRect(0, 0, width, height);
    const layerImg = new Image();
    const src = await layer.toDataURL('image/png');
    layerImg.src = src;
    await onStackHistory(layerImg);
    await onRemoveRedo();
    await onClear(false);
  }, [onClear, width, height, onStackHistory, onRemoveRedo]);

  //#region
  const handleTouchStart = useCallback(
    function (e) {
      e.preventDefault();
      console.log(e.touches.length);
      if (e.touches.length === 1) {
        const layer = layerRef.current;
        const ctx = layer.getContext('2d');
        const touch = e.touches[0];
        const { x, y } = getEventPosition(layer, touch);

        if (isWriting) return false;
        if (isDrawingShapes) {
          e.preventDefault();
          shapes.location.start = getEventPosition(layerRef.current, e);
        }
        onChangeStatusToPainting(true);
        onChangeStatusToClicking(true);

        layer.style.webkitFilter = 'blur(0.4px)';
        ctx.fillStyle = color;
        ctx.strokeStyle = color;
        ctx.clearRect(0, 0, width, height);
        ctx.beginPath();
        ctx.moveTo(x, y);
      }
    },
    [
      color,
      width,
      height,
      isWriting,
      isDrawingShapes,
      onChangeStatusToPainting,
      onChangeStatusToClicking,
      shapes.location.start,
    ],
  );

  const handleTouchMove = useCallback(
    function (e) {
      e.preventDefault();
      if (e.touches.length === 1) {
        const layer = layerRef.current;
        const ctx = layer.getContext('2d');
        const touch = e.touches[0];
        const { x, y } = getEventPosition(layer, touch);

        if (isDrawingShapes) {
          e.preventDefault();
          ctx.fillStyle = color;
          ctx.strokeStyle = color;
          shapes.location.end = getEventPosition(layer, touch);
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
      }
    },
    [
      color,
      height,
      isDrawingShapes,
      shapes.location.end,
      shapes.location.start.x,
      shapes.location.start.y,
      shapes.type,
      width,
    ],
  );

  const handleTouchEnd = useCallback(
    function () {
      const layer = layerRef.current;
      const ctx = layer.getContext('2d');
      if (isFilling) ctx.fillRect(0, 0, width, height);
      const layerImg = new Image();
      const src = layer.toDataURL('image/png');
      layerImg.src = src;
      handleHtmlToImage(src, ctx);
      ctx.closePath();
      ctx.save();
    },
    [handleHtmlToImage, isFilling, width, height],
  );
  // function handleTouchCancel() {}
  //#endregion

  useEffect(() => {
    loadImage.isActive && watchLoadFileButton();
    isClear && handleClearCanvas();
  }, [loadImage.isActive, watchLoadFileButton, isClear, handleClearCanvas]);

  useEffect(() => {
    const layer = layerRef.current;
    layer.addEventListener('touchstart', handleTouchStart, false);
    layer.addEventListener('touchmove', handleTouchMove, false);
    layer.addEventListener('touchend', handleTouchEnd, false);
    layer.addEventListener('touchcancel', handleTouchEnd, false);
    layer.addEventListener(
      'scroll',
      (e) => {
        if (e.targetTouches) return false;
      },
      false,
    );
    return () => {
      layer.removeEventListener('touchstart', handleTouchStart, false);
      layer.removeEventListener('touchmove', handleTouchMove, false);
      layer.removeEventListener('touchend', handleTouchEnd, false);
      layer.removeEventListener('touchcancel', handleTouchEnd, false);
    };
  }, [handleTouchStart, handleTouchMove, handleTouchEnd]);

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
          textSize={textSize}
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
        onMouseLeave={() => {
          onChangeStatusToPainting(false);
        }}
        onClick={onHandleLayerClick}
      ></canvas>
      <canvas
        ref={vCanvasRef}
        style={{
          position: 'absolute',
          top: '-100%',
          left: '-100%',
          width: width,
          height: height,
          zIndex: -99999,
        }}
      />
    </div>
  );
}

export default Layer;
