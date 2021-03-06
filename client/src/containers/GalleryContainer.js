import Axios from 'axios';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import config from '../_config/config.json';
import { modal, modalProps } from '../redux/modules/portal';
import { useDispatch, useSelector } from 'react-redux';
import GalleryBoard from '../components/gallery/GalleryBoard';
import { initState } from '../redux/modules/gallery';

export default function GalleryContainer() {
  const dispatch = useDispatch();
  const onModal = useCallback((state, compo) => dispatch(modal(state, compo)), [
    dispatch,
  ]);
  const onModalProps = useCallback((obj) => dispatch(modalProps(obj)), [
    dispatch,
  ]);
  const onInitialGalleryStore = useCallback(() => dispatch(initState()), [
    dispatch,
  ]);
  const { isRemove, id } = useSelector(({ gallery }) => ({
    isRemove: gallery.isRemove,
    id: gallery.id,
  }));

  const [galleryList, setGalleryList] = useState(null);
  const lastPageNumber = useRef();
  const getGallery = useCallback(() => {
    const body = {
      Authorization: JSON.parse(localStorage.getItem('dw-token')),
    };
    Axios.post(`${config.URI}gallery/`, body).then((res) => {
      lastPageNumber.current = res.data.lastPage;
      setGalleryList(res.data.gallery);
    });
  }, []);

  const handleRemoveImage = useCallback(
    async (removeId) => {
      const newList = galleryList.filter((list) => list._id !== removeId);
      await setGalleryList(newList);
      onInitialGalleryStore();
    },
    [galleryList, onInitialGalleryStore],
  );
  useEffect(() => {
    getGallery();
  }, [getGallery]);

  useEffect(() => {
    isRemove && handleRemoveImage(id);
  }, [getGallery, isRemove, handleRemoveImage, id]);

  return (
    <>
      <GalleryBoard
        galleryList={galleryList}
        onModal={onModal}
        onModalProps={onModalProps}
        lastPageNumber={lastPageNumber}
      />
    </>
  );
}
