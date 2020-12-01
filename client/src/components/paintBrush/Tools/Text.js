import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useCallback } from 'react';

const TextContain = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
  @media only screen and (max-width: 900px) {
    justify-content: flex-start;
  }

  > h2 {
    width: 20px;
    height: 25px;
    margin-right: 10px;
    position: relative;
  }

  > h2 svg {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  > div {
    display: flex;
    margin-right: 10px;
  }
  label {
    padding: 2px 5px;
    border: 1px solid #c6c6c6;
    border-radius: 5px;
    cursor: pointer;
    font-size: small;
  }

  label ~ label {
    margin-left: 5px;
  }

  input {
    opacity: 0;
    width: 0;
    height: 0;
  }

  input:checked + label {
    border-color: #2196f3;
    color: #2196f3;
  }
`;

function Text({
  onChangeStatusToWriting,
  onChangeStatusToTextMode,
  onChangeMode,
  onChangeActive,
  onChangeButtonMode,
  textState,
  onChangeTextColor,
  color,
}) {
  const [Switch, setSwitch] = useState(textState.mode);

  const passingSwitchResult = useCallback(() => {
    onChangeStatusToWriting(Switch.some((status) => status.checked));
    const [checkedType] = Switch.filter((status) => status.checked);
    checkedType && onChangeStatusToTextMode(checkedType['type']);
  }, [Switch, onChangeStatusToWriting, onChangeStatusToTextMode]);

  const handleMode = useCallback(() => {
    const status = Switch.every((status) => status.checked === false);
    if (status) {
      onChangeMode('brush');
      onChangeActive('brush', true);
      onChangeActive('text', false);
    } else {
      onChangeMode('text');
      onChangeActive('brush', false);
      onChangeActive('text', true);
    }
  }, [Switch, onChangeMode, onChangeActive]);

  useEffect(() => {
    onChangeButtonMode('text', Switch);
    passingSwitchResult();
    handleMode();
    const filterMode = Switch.filter((button) => button.checked);
    filterMode.length > 0 && onChangeTextColor(filterMode[0]?.type, color);
  }, [
    passingSwitchResult,
    handleMode,
    onChangeButtonMode,
    Switch,
    onChangeTextColor,
    color,
  ]);

  const onToggleSwitch = (type) => {
    setSwitch(
      Switch.map((switchs) =>
        switchs.type !== type
          ? { ...switchs, checked: false }
          : { ...switchs, checked: !switchs.checked },
      ),
    );

    return (e) => e.preventDefault();
  };

  return (
    <TextContain>
      <h2>
        <svg
          viewBox="0 0 15 15"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          width="23"
          height="23"
        >
          <path
            d="M7.5 14V1.5M1.5 5V1.5h12V5m-10 8.5H11"
            stroke="currentColor"
          ></path>
        </svg>
      </h2>
      <div>
        {Switch.map((input, index) => (
          <React.Fragment key={input.type}>
            <input
              type="checkbox"
              id={input.type + 'Input'}
              checked={textState.isActive ? input.checked : false}
              readOnly
            />
            <label
              htmlFor={input.type + 'Input'}
              onClick={() => onToggleSwitch(input.type)}
            >
              {input.type}
            </label>
          </React.Fragment>
        ))}
      </div>
    </TextContain>
  );
}

export default Text;
