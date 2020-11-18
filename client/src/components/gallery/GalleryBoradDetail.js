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
      position: absolute;
      top: 20px;
      right: 15px;
      display: flex;
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
          border-radius: 50%;
          background: #000;
          svg {
            transition: fill 0.5s;

            fill: #fff;
          }
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
    Axios.post(`${config.URI}/gallery/deleteImage`, body).then(() => {
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
              </Link>
            </li>
            <li onClick={handleSaveImage}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="18"
                viewBox="0 0 16 18"
              >
                <path
                  id="ic_vertical_align_bottom_24px"
                  d="M16,13H13V3H11V13H8l4,4ZM4,19v2H20V19Z"
                  transform="translate(-4 -3)"
                />
              </svg>
            </li>
            <li onClick={handleDeleteImage}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="18"
                viewBox="0 0 14 18"
              >
                <path
                  id="ic_delete_24px"
                  d="M6,19a2.006,2.006,0,0,0,2,2h8a2.006,2.006,0,0,0,2-2V7H6ZM19,4H15.5l-1-1h-5l-1,1H5V6H19Z"
                  transform="translate(-5 -3)"
                />
              </svg>
            </li>
            <li onClick={handleCloseModal}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 14 14"
              >
                <path
                  id="ic_clear_24px"
                  d="M19,6.41,17.59,5,12,10.59,6.41,5,5,6.41,10.59,12,5,17.59,6.41,19,12,13.41,17.59,19,19,17.59,13.41,12Z"
                  transform="translate(-5 -5)"
                />
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
