import Axios from 'axios';
import dayjs from 'dayjs';
import React, { useCallback } from 'react';
import config from '../../_config/config.json';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { removeId, on_remove_image } from '../../redux/modules/gallery';
import { on_setting_button } from '../../redux/modules/nav';
import { modal, modalProps } from '../../redux/modules/portal';

const DetailModal = styled.div`
  max-width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  .detailpage_layout {
    position: relative;
    border-radius: 3px;
    overflow: hidden;
    background: #fff;
    ul {
      width: 200px;
      height: 60px;
      display: flex;
      margin-left: auto;
      align-items: center;
      li {
        width: 32px;
        height: 32px;
        margin: 0 8px;
        cursor: pointer;
        display: flex;
        justify-content: center;
        align-items: center;
        &:hover {
          transition: background 0.5s;
          border-top: 1.8px solid transparent;
          border-bottom: 1.8px solid #000;
          box-sizing: border-box;
        }
      }
    }
  }
`;

function GalleryBoradDetail() {
  const dispatch = useDispatch();

  const onSettingButton = useCallback(
    (kinds, state, value) => dispatch(on_setting_button(kinds, state, value)),
    [dispatch],
  );
  const onModal = useCallback((state, compo) => dispatch(modal(state, compo)), [
    dispatch,
  ]);

  const onModalProps = useCallback((obj) => dispatch(modalProps(obj)), [
    dispatch,
  ]);

  const onRemoveId = useCallback((id) => dispatch(removeId(id)), [dispatch]);
  const onRemoveImage = useCallback(
    (boolean) => dispatch(on_remove_image(boolean)),
    [dispatch],
  );
  const { optionalProps } = useSelector(({ portal }) => ({
    optionalProps: portal.optionalProps,
  }));

  const handleEventPropagation = (e) => {
    e.stopPropagation();
  };

  const handleOverdrawing = async () => {
    await onSettingButton('loadImage', 'isActive', true);
    await onSettingButton('loadImage', 'src', optionalProps.img);
    handleCloseModal();
  };
  const handleSaveImage = () => {
    const currentTime = dayjs().format('YYYYMMDDHHmmss');
    const link = document.createElement('a');
    link.href = optionalProps.img;
    link.download = `letsdrawing${currentTime}`;
    link.click();
  };
  const handleCloseModal = useCallback(() => {
    onModal(false, null);
    onModalProps({});
  }, [onModal, onModalProps]);

  const handleDeleteImage = useCallback(() => {
    const body = {
      Authorization: JSON.parse(localStorage.getItem('dw-token')),
      id: optionalProps.id,
    };
    Axios.post(`${config.URI}gallery/deleteImage`, body).then(() => {
      onRemoveImage(true);
      onRemoveId(optionalProps.id);
      handleCloseModal();
    });
  }, [onRemoveImage, onRemoveId, handleCloseModal, optionalProps.id]);

  return (
    optionalProps.id &&
    optionalProps.img && (
      <DetailModal>
        <div className="detailpage_layout" onClick={handleEventPropagation}>
          <ul>
            <li onClick={handleOverdrawing}>
              <Link to="/">
                <svg
                  viewBox="0 0 15 15"
                  xmlns="http://www.w3.org/2000/svg"
                  width="19"
                  height="19"
                >
                  <path
                    d="M.5 14l-.481-.136a.5.5 0 00.758.552L.5 14zm.971-3.422l.481.136-.48-.136zm-.46 3.081l-.277-.416.277.416zm2.062-.148l-.215.451.215-.451zM5 6l-.25-.433a.5.5 0 00-.104.787L5 6zm4 4l-.354.354a.5.5 0 00.787-.103L9 10zM14.5.5l.433.25a.5.5 0 00-.684-.683L14.5.5zM.981 14.136l.971-3.422-.962-.273-.971 3.422.962.274zm2.956-4.922H4v-1h-.063v1zm2.063 2v.053h1v-.053H6zm-1.947 2h-.08v1h.08v-1zm-3.32.03l-.51.34.554.832.512-.34-.555-.833zm2.555-.185a2.594 2.594 0 00-2.554.184l.555.832a1.594 1.594 0 011.569-.113l.43-.903zm.685.155c-.237 0-.471-.053-.685-.155l-.43.903c.348.166.73.252 1.115.252v-1zM6 11.267a1.947 1.947 0 01-1.947 1.947v1A2.947 2.947 0 007 11.267H6zM4 9.214a2 2 0 012 2h1a3 3 0 00-3-3v1zm-2.048 1.5a2.063 2.063 0 011.985-1.5v-1c-1.37 0-2.573.91-2.947 2.227l.962.273zm2.694-4.36l4 4 .708-.708-4-4-.708.708zM14.25.067l-9.5 5.5.5.866 9.5-5.5-.5-.866zM9.432 10.251l5.5-9.5-.866-.502-5.5 9.5.866.502zM7.146 4.854l3 3 .708-.708-3-3-.708.708z"
                    fill="currentColor"
                  ></path>
                </svg>
              </Link>
            </li>
            <li onClick={handleSaveImage}>
              <svg
                viewBox="0 0 15 15"
                xmlns="http://www.w3.org/2000/svg"
                width="19"
                height="19"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M7 9.358V1h1v8.293l2.146-2.147.708.708-3.34 3.34L3.91 7.866l.678-.734L7 9.358zM2 13V7H1v7h13V7h-1v6H2z"
                  fill="currentColor"
                ></path>
              </svg>
            </li>
            <li onClick={handleDeleteImage}>
              <svg
                viewBox="0 0 15 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                width="19"
                height="19"
              >
                <path
                  d="M4.5 3V1.5a1 1 0 011-1h4a1 1 0 011 1V3M0 3.5h15m-13.5 0v10a1 1 0 001 1h10a1 1 0 001-1v-10M7.5 7v5m-3-3v3m6-3v3"
                  stroke="currentColor"
                ></path>
              </svg>
            </li>
            <li onClick={handleCloseModal}>
              <svg
                viewBox="0 0 15 15"
                xmlns="http://www.w3.org/2000/svg"
                width="19"
                height="19"
              >
                <path
                  d="M1.5 1.5l12 12m-12 0l12-12"
                  stroke="currentColor"
                ></path>
              </svg>
            </li>
          </ul>
          <img src={optionalProps.img} alt="User-drawn" />
        </div>
      </DetailModal>
    )
  );
}

export default GalleryBoradDetail;
