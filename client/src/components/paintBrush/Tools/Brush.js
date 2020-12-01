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
    /* ${(props) => props.foldTools && 'height:56px'} */
  }
`;
const TabToggle = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 30px;

  & > div {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    margin: 10px;
    box-sizing: border-box;
    cursor: pointer;
  }
  ${(props) =>
    props.switch
      ? css`
          div:nth-of-type(3) svg {
            path {
              fill: hotpink;
            }
          }
        `
      : css`
          div:nth-of-type(1) svg {
            path {
              fill: hotpink;
            }
          }
        `}

  svg {
    width: 20px;
    height: 20px;
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
  border: 0.8px solid #c6c6c6;
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
  foldTools,
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
      viewBox="0 0 15 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      width="30"
      height="30"
    >
      <path
        d="M14.854.146a.5.5 0 01.079.605l-3.841 6.634-3.477-3.477L14.25.068a.5.5 0 01.605.078zM6.72 4.427l-1.97 1.14a.5.5 0 00-.104.787l4 4a.5.5 0 00.787-.103l1.14-1.97L6.72 4.426zM.99 10.441a3.063 3.063 0 012.947-2.227H4a3 3 0 013 3v.053a2.947 2.947 0 01-2.947 2.947h-.08a2.59 2.59 0 01-1.115-.252 1.594 1.594 0 00-1.57.113l-.51.341a.5.5 0 01-.759-.553l.971-3.422z"
        fill="currentColor"
      ></path>
    </svg>
  );

  const FillIcon = () => (
    <svg
      viewBox="0 0 15 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      width="30"
      height="30"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M4.5 0A2.5 2.5 0 002 2.5v3.793l-.44.44a2.5 2.5 0 000 3.535l3.172 3.171a2.5 2.5 0 003.536 0l4.171-4.171a2.5 2.5 0 000-3.536L9.268 2.561a2.498 2.498 0 00-2.342-.666A2.501 2.501 0 004.5 0zM6 3.707V7h1V2.914a1.5 1.5 0 011.56.354l3.172 3.171a1.5 1.5 0 010 2.122l-.44.439H1.915a1.5 1.5 0 01.354-1.56L6 3.706zm-.009-1.372A1.5 1.5 0 003 2.5v2.793L5.732 2.56c.082-.083.169-.158.259-.226z"
        fill="currentColor"
      ></path>
      <path
        d="M12.645 9.737l1.534 1.534a2.17 2.17 0 11-3.069 0l1.535-1.534z"
        fill="currentColor"
      ></path>
    </svg>
  );

  return (
    <BrushContainer foldTools={foldTools}>
      <TabToggle switch={Switch}>
        <div
          onClick={
            (canvasMode === 'brush' || canvasMode === 'shape') && Switch
              ? onToggleSwitch
              : undefined
          }
          title="채우기"
        >
          <FillIcon />
        </div>
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
        <div
          onClick={
            (canvasMode === 'brush' || canvasMode === 'shape') && !Switch
              ? onToggleSwitch
              : undefined
          }
          title="그리기"
        >
          <BrushIcon />
        </div>
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
