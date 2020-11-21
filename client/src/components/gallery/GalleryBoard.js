import React, { useCallback, useRef, useState } from 'react';
import config from '../../_config/config.json';
import styled from 'styled-components';
import 'dayjs';
import dayjs from 'dayjs';
import GalleryBoradDetail from './GalleryBoradDetail';
import { useEffect } from 'react';
import Axios from 'axios';
const GalleryLayout = styled.div`
  padding: 2rem 6rem;
  height: 87vh;
  overflow-y: auto;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  ul {
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    li {
      width: 32%;
      min-width: 300px;
      margin: 15px auto;
      box-shadow: 0 1px 5px rgba(0, 0, 0, 0.3);
      padding: 15px 20px;
      border-radius: 5px;
      box-sizing: border-box;
      cursor: pointer;
      &:hover {
        transition: ease-in 0.2s;
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3), 0 5px 10px rgba(0, 0, 0, 0.3),
          0 8px 15px rgba(0, 0, 0, 0.3);
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
  const [isLoading, setIsLoading] = useState(
    galleryList === null ? true : galleryList.length >= 0 ? false : false,
  );
  const handleDetail = (id, img) => {
    onModal(true, GalleryBoradDetail);
    onModalProps({ id: id, img: img });
  };

  const [fetching, setFetching] = useState(false);
  const page = useRef(2);
  const galleryLayoutRef = useRef();
  const fetchMoreInstaFeeds = useCallback(async () => {
    setFetching(true);
    const body = {
      Authorization: JSON.parse(localStorage.getItem('dw-token')),
    };
    await Axios.post(`${config.URI}gallery/?page=${page.current}`, body).then(
      (res) => {
        const fetchedData = res.data;
        const mergedData = galleryList.concat(...fetchedData);
        setGalleryList(mergedData);
      },
    );
    setFetching(false);
  }, [galleryList]);

  // 스크롤 이벤트 핸들러
  const handleScroll = useCallback(async () => {
    const scrollHeight = galleryLayoutRef.current.scrollHeight;
    const scrollTop = galleryLayoutRef.current.scrollTop;
    const clientHeight = galleryLayoutRef.current.clientHeight;
    console.log(scrollTop, clientHeight, scrollHeight);
    if (scrollTop + clientHeight >= scrollHeight - 10 && fetching === false) {
      await fetchMoreInstaFeeds();
      page.current += 1;
    }
  }, [fetchMoreInstaFeeds, fetching]);

  useEffect(() => {
    const galleryLayout = galleryLayoutRef.current;
    galleryLayout.addEventListener('scroll', handleScroll);
    return () => galleryLayout.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    setGalleryList(gallery);
  }, [gallery]);

  useEffect(() => {
    setIsLoading(galleryList === null ? true : false);
  }, [isLoading, galleryList]);
  return (
    <GalleryLayout ref={galleryLayoutRef}>
      {isLoading ? (
        <p>
          잠시만 기다려 주세요
          <span role="img" aria-label="스마일 이모티콘">
            😊
          </span>
        </p>
      ) : galleryList.length > 0 ? (
        <ul>
          {galleryList.map((image, index) => (
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
      ) : (
        <p>
          그린 그림이 없어요
          <span role="img" aria-label="안타까운 이모티콘">
            😯
          </span>
        </p>
      )}
    </GalleryLayout>
  );
}

export default GalleryBoard;
