import React from 'react';
import { useLocation } from 'react-router-dom';
import GalleryBoard from '../components/gallery/GalleryBoard';
import NavContainer from '../containers/NavContainer';

function Gallery() {
  const location = useLocation();
  console.log(location);
  return (
    <div>
      <NavContainer />
      <GalleryBoard />
    </div>
  );
}

export default Gallery;
