import React from 'react';
import { useSelector } from 'react-redux';
import GalleryBoard from '../components/gallery/GalleryBoard';

export default function GalleryContainer() {
  const { imageList } = useSelector(({ gallery }) => ({
    imageList: gallery.imageList,
  }));
  return (
    <>
      <GalleryBoard imageList={imageList} />
    </>
  );
}
