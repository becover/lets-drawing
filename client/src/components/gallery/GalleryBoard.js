import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import 'dayjs';
import dayjs from 'dayjs';
import GalleryBoradDetail from './GalleryBoradDetail';
import { useEffect } from 'react';
const GalleryLayout = styled.div`
  padding: 5rem 6rem;
  height: 87vh;
  ul {
    display: flex;
    justify-content: flex-start;
    li {
      width: 32%;
      margin: 0 0.5%;
      box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
      padding: 15px 20px;
      border-radius: 5px;
      box-sizing: border-box;
      cursor: pointer;
      &:hover {
        transition: ease-in 0.2s;
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3), 0 5px 10px rgba(0, 0, 0, 0.3);
      }
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
  > p {
    text-align: center;
    font-size: 3rem;
    color: #ccc;
    span {
      vertical-align: top;
    }
  }
`;

function GalleryBoard({ galleryList: gallery, onModal, onModalProps }) {
  const [galleryList, setGalleryList] = useState(gallery);
  // eslint-disable-next-line
  const [isLoading, _] = useState(galleryList.length > 0 ? false : true);
  const handleDetail = (id, img) => {
    onModal(true, GalleryBoradDetail);
    onModalProps({ id: id, img: img });
  };

  useEffect(() => {
    setGalleryList(gallery);
  }, [gallery]);
  return (
    <GalleryLayout>
      {!isLoading ? (
        <p>
          그린 그림이 없어요
          <span role="img" aria-label="안타까운 이모티콘">
            😯
          </span>
        </p>
      ) : galleryList.length <= 0 ? (
        <p>
          잠시만 기다려 주세요
          <span role="img" aria-label="스마일 이모티콘">
            😊
          </span>
        </p>
      ) : (
        <ul>
          {isLoading &&
            galleryList.map((image, index) => (
              <li
                key={image._id}
                onClick={() => handleDetail(image._id, image.imagePath)}
              >
                <div>
                  <img src={image.imagePath} alt="user's drawing" />
                </div>
                <p>
                  <span>Date : </span>
                  <span>
                    {dayjs(image.createdAt).format('YYYY-MM-DD HH:mm:ss')}
                  </span>
                </p>
              </li>
            ))}
        </ul>
      )}
    </GalleryLayout>
  );
}

export default GalleryBoard;
