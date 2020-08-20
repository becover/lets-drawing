import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useCallback } from 'react';

const TextContain = styled.div`
  width: 10%;
  display: flex;
  justify-content: center;
  align-items: center;
  > div {
    display: flex;
    margin-right: 10px;
  }
  label {
    padding: 2px 5px;
    border: 1px solid #ddd;
    border-radius: 5px;
    cursor: pointer;
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
}) {
  const [Switch, setSwitch] = useState([
    { id: 'fill', checked: false },
    { id: 'border', checked: false },
  ]);

  const passingSwitchResult = useCallback(() => {
    onChangeStatusToWriting(Switch.some((status) => status.checked));
    Switch.forEach(
      (status) => status.checked && onChangeStatusToTextMode(status.id),
    );
  }, [Switch, onChangeStatusToWriting, onChangeStatusToTextMode]);

  const handleMode = useCallback(() => {
    const status = Switch.every((status) => status.checked === false);
    if (status) {
      onChangeMode('brush');
    } else {
      onChangeMode('text');
    }
  }, [Switch, onChangeMode]);

  useEffect(() => {
    passingSwitchResult();
    handleMode();
  }, [passingSwitchResult, handleMode]);

  const onToggleSwitch = (id) => {
    setSwitch(
      Switch.map((switchs) =>
        switchs.id !== id
          ? { ...switchs, checked: false }
          : { ...switchs, checked: !switchs.checked },
      ),
    );

    return (e) => e.preventDefault();
  };

  return (
    <TextContain>
      <div>
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
      </div>
      <div>
        <input
          type="checkbox"
          id="fillInput"
          checked={Switch[0].checked}
          readOnly
        />
        <label htmlFor="fillInput" onClick={() => onToggleSwitch('fill')}>
          Fill
        </label>
        <input
          type="checkbox"
          id="borderInput"
          checked={Switch[1].checked}
          readOnly
        />
        <label htmlFor="borderInput" onClick={() => onToggleSwitch('border')}>
          Border
        </label>
      </div>
    </TextContain>
  );
}

export default Text;
