import React, { useCallback, useState, useEffect } from 'react';
import styled from 'styled-components';

const ShapesBox = styled.div`
  display: flex;
  > ul {
    display: flex;
  }

  > h2 {
    position: relative;
    margin-right: 5px;
    width: 20px;
    height: 25px;
  }

  > h2 > svg {
    position: absolute;
    stroke-width: 2.2;
    stroke-linejoin: round;
    stroke-linecap: round;
  }

  > h2 > svg:first-of-type {
    top: 10%;
    left: 20%;
  }
  > h2 > svg:nth-of-type(2) {
    /* top: 50%; */
    bottom: 15%;
    right: 0;
    margin-top: -6.5px;
  }

  > h2 > svg:last-of-type {
    bottom: 15%;
    left: 0;
  }

  ul > li {
    border: 1px solid #ddd;
    border-radius: 5px;
    width: 23px;
    height: 23px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: 5px;
  }
  input {
    opacity: 0;
    width: 0;
    height: 0;
  }
  label {
    display: inline-block;
    width: 13px;
    height: 13px;
    border: 0.9px dashed rgb(134, 133, 133);
    box-sizing: border-box;
  }

  #shape__circle + label {
    border-radius: 50%;
  }

  #shape__triangle + label {
    position: relative;
    border: none;
  }

  input + label svg {
    fill: none;
    stroke: rgb(134, 133, 133);
    stroke-width: 0.8;
    stroke-dasharray: 2.2;
  }

  input:checked + label {
    border: 1.5px solid #2196f3;
    svg {
      fill: none;
      stroke: rgb(33, 150, 243);
      stroke-width: 1.5;
      stroke-dasharray: 0;
    }
  }
`;

function Shapes({ onChangeMode, onDrawingShapes, onChangesShapesType }) {
  const shapes = [
    { type: 'rectangle', checked: false },
    { type: 'triangle', checked: false },
    { type: 'circle', checked: false },
  ];

  const [Shapes, setShapes] = useState(shapes);

  const onChangeShapes = (index) => {
    setShapes(
      Shapes.map((shape, i) =>
        i === index
          ? { ...shape, checked: true }
          : { ...shape, checked: false },
      ),
    );
  };

  const handleMode = useCallback(() => {
    const status = Shapes.every((status) => status.checked === false);
    const [shape] = Shapes.filter((shape) => shape.checked === true);
    if (status) {
      onDrawingShapes(false);
    } else {
      onDrawingShapes(true);
      onChangeMode('shape');
      onChangesShapesType(shape.type);
    }
  }, [Shapes, onChangeMode, onDrawingShapes, onChangesShapesType]);

  useEffect(() => {
    handleMode();
  }, [handleMode]);

  const ShapsIcon = () => (
    <h2>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="12"
        height="12"
        viewBox="0 0 18 18"
      >
        <path
          id="ic_check_box_outline_blank_24px"
          d="M19,5V19H5V5H19m0-2H5A2.006,2.006,0,0,0,3,5V19a2.006,2.006,0,0,0,2,2H19a2.006,2.006,0,0,0,2-2V5A2.006,2.006,0,0,0,19,3Z"
          transform="translate(-3 -3)"
        />
      </svg>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="12"
        height="12"
        viewBox="0 0 20 20"
      >
        <polygon points="0,20 10.5,0 20,20 0,20" fill="none" stroke="#000" />
      </svg>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="12"
        height="12"
        viewBox="0 0 20 20"
      >
        <path
          id="ic_radio_button_unchecked_24px"
          d="M12,2A10,10,0,1,0,22,12,10,10,0,0,0,12,2Zm0,18a8,8,0,1,1,8-8A8,8,0,0,1,12,20Z"
          transform="translate(-2 -2)"
        />
      </svg>
    </h2>
  );
  return (
    <ShapesBox>
      <ShapsIcon />
      <ul>
        {Shapes.map((shape, index) => (
          <li key={index} onClick={() => onChangeShapes(index)}>
            <input
              type="radio"
              id={'shape__' + shape.type}
              name="shapes"
              disabled={!shape.checked}
              checked={shape.checked}
              readOnly
            />
            <label htmlFor={'shape__' + shape.type}>
              {shape.type === 'triangle' && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="17"
                  height="19"
                  viewBox="0 0 17 20"
                >
                  <polygon points="0,13 6.5,0 13,13" />
                </svg>
              )}
            </label>
          </li>
        ))}
      </ul>
    </ShapesBox>
  );
}

export default Shapes;
