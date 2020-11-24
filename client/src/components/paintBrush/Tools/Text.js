import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useCallback } from 'react';

const TextContain = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 5px;
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
    border: 1px solid #ddd;
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
          xmlns="http://www.w3.org/2000/svg"
          width="14"
          height="15"
          viewBox="0 0 14 15"
        >
          <path
            id="ic_title_24px"
            d="M5,4V7h5.5V19h3V7H19V4Z"
            transform="translate(-5 -4)"
          />
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
