import React, { useState, useEffect, useCallback } from 'react';
import styled, { css } from 'styled-components';

const BrushContainer = styled.div`
  width: 15%;
  height: 100%;
  display: flex;
  flex-direction: column;
  margin-right: 10px;
  @media only screen and (max-width: 786px) {
    width: 120px;
  }
`;
const TabToggle = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  & > div {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    margin: 10px;
    box-sizing: border-box;
  }
  ${(props) =>
    props.switch
      ? css`
          svg:nth-of-type(1) {
            fill: #ccc;
          }
          svg:nth-of-type(2) {
            fill: hotpink;
          }
        `
      : css`
          svg:nth-of-type(1) {
            fill: #2196f3;
          }
          svg:nth-of-type(2) {
            fill: #ccc;
          }
        `}

  svg {
    width: 17px;
    height: 17px;
    fill: #2196f3;
  }
`;

const SwitchLabel = styled.label`
  position: relative;
  display: inline-block;
  width: 35px;
  height: 6px;

  input {
    opacity: 0;
    width: 0;
    height: 0;
  }

  span {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    transition: 0.4s;
    background: #ccc;
    border-radius: 14px;
  }

  span:before {
    content: '';
    position: absolute;
    width: 15px;
    height: 15px;
    left: 0;
    top: -80%;
    background: #fff;
    border-radius: 50%;
    transition: 0.4s;
    box-shadow: 0 0 3px rgba(0, 0, 0, 0.3);
  }

  input:checked + span {
    background: #ff528d9c;
  }

  input:focus + span {
    box-shadow: 0 0 1px hotpink;
  }

  input:checked + span:before {
    transform: translateX(20px);
  }
`;

const BrushTypes = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 0.8px solid #ddd;
  border-radius: 5px;
  min-width: 100px;

  & > div {
    position: relative;
    display: inline-block;
    width: 34px;
    height: 30px;
    cursor: pointer;

    label {
      position: absolute;
      top: 50%;
      left: 50%;
      background: #777;
      display: block;
      cursor: pointer;
      width: 13px;
    }
  }

  & > div:nth-of-type(1) label {
    height: 1.5px;
    transform-origin: center;
    transform: translate(-50%, -50%) rotate(42deg);
  }

  & > div:nth-of-type(2) label {
    height: 13px;
    transform: translate(-50%, -50%);
  }

  & > div:nth-of-type(3) label {
    height: 13px;
    border-radius: 50%;
    transform: translate(-50%, -50%);
  }

  input {
    opacity: 0;
    width: 0;
    height: 0;
  }

  input:checked + label {
    background: hotpink;
  }

  input:disabled + label {
    background: #ccc;
  }
`;

function Brush({
  onChangeLineCap,
  onChangeLineJoin,
  onChangeStatusToFilling,
  canvasMode,
  onChangeActive,
  onChangeButtonMode,
  brushsState,
  isWriting,
}) {
  const [Brushs, setBrushs] = useState(brushsState.mode);

  const onChangeLineCaps = useCallback(
    (e, index) => {
      setBrushs(
        Brushs.map((brush, idx) =>
          idx === index
            ? { ...brush, checked: true }
            : { ...brush, checked: false },
        ),
      );

      onChangeLineCap(e.currentTarget.id);
      onChangeLineJoin(e.currentTarget.dataset.join);
    },
    [Brushs, onChangeLineCap, onChangeLineJoin],
  );

  const [Switch, setSwitch] = useState(true);
  const toggleSwitch = useCallback(() => {
    if (Switch) {
      onChangeStatusToFilling(false);
    } else {
      onChangeStatusToFilling(true);
    }
  }, [Switch, onChangeStatusToFilling]);

  const onToggleSwitch = (e) => {
    e.preventDefault();
    setSwitch(!Switch);
  };

  useEffect(() => {
    onChangeButtonMode('brush', Brushs);
    (canvasMode === 'brush' || canvasMode === 'shape') && toggleSwitch();
  }, [toggleSwitch, canvasMode, Brushs, onChangeButtonMode]);

  const BrushIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="19.003"
      height="18.002"
      viewBox="0 0 19.003 18.002"
    >
      <path
        id="ic_brush_24px"
        d="M7,14a3,3,0,0,0-3,3,2.029,2.029,0,0,1-2,2,5.174,5.174,0,0,0,4,2,4,4,0,0,0,4-4A3,3,0,0,0,7,14ZM20.71,4.63,19.37,3.29a1,1,0,0,0-1.41,0L9,12.25,11.75,15l8.96-8.96A1,1,0,0,0,20.71,4.63Z"
        transform="translate(-2 -2.998)"
      />
    </svg>
  );

  const FillIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="17"
      height="20"
      viewBox="0 0 17 20"
    >
      <path
        id="ic_format_paint_24px"
        d="M18,4V3a1,1,0,0,0-1-1H5A1,1,0,0,0,4,3V7A1,1,0,0,0,5,8H17a1,1,0,0,0,1-1V6h1v4H9V21a1,1,0,0,0,1,1h2a1,1,0,0,0,1-1V12h8V4Z"
        transform="translate(-4 -2)"
      />
    </svg>
  );

  return (
    <BrushContainer>
      <TabToggle switch={Switch}>
        <FillIcon />
        <div>
          <SwitchLabel
            htmlFor="brushSwitch"
            className="switch"
            onClick={
              canvasMode === 'brush' || canvasMode === 'shape'
                ? onToggleSwitch
                : undefined
            }
          >
            <input type="checkbox" id="brushSwitch" checked={Switch} readOnly />
            <span></span>
          </SwitchLabel>
        </div>
        <BrushIcon />
      </TabToggle>
      <BrushTypes>
        {Brushs.map((brush, index) => (
          <div
            key={index}
            id={brush.type}
            data-join={brush.join}
            onClick={(e) =>
              brushsState.isActive &&
              (canvasMode === 'brush' || canvasMode === 'shape') &&
              onChangeLineCaps(e, index)
            }
          >
            <input
              type="radio"
              id={brush.type}
              name="linecap"
              disabled={brushsState.isActive && !Switch}
              checked={brushsState.isActive ? brush.checked : false}
              readOnly
            />
            <label htmlFor={brush.type}></label>
          </div>
        ))}
      </BrushTypes>
    </BrushContainer>
  );
}

export default React.memo(Brush);
