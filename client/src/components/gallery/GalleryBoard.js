import React from 'react';
import styled from 'styled-components';
const GalleryLayout = styled.div`
  padding: 5rem 6rem;
  height: 87vh;
  ul {
    display: flex;
    justify-content: flex-start;
    li {
      width: 30%;
      margin: 0 auto;
      box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
      padding: 15px 20px;
      border-radius: 10px;
      box-sizing: border-box;
      p {
        border-top: 1px solid #ccc;
        margin-top: 5px;
        padding-top: 10px;
        font-size: 0.9rem;
        color: rgb(134, 133, 133);
        span {
          margin-left: 5px;
        }
      }
    }
  }
`;

function GalleryBoard({ imageList }) {
  return (
    <GalleryLayout>
      <ul>
        {imageList.map((image, index) => (
          <li key={'gallery' + index}>
            <div>
              <img src={image[0]} alt="user's drawing" />
            </div>
            <p>
              <span>Date : </span>
              <span>{image[1]}</span>
            </p>
          </li>
        ))}
      </ul>
    </GalleryLayout>
  );
}

export default GalleryBoard;
