import React from 'react';
import { useLocation } from 'react-router-dom';
import GalleryContainer from '../containers/GalleryContainer';
import NavContainer from '../containers/NavContainer';

function Gallery() {
  const location = useLocation();
  return (
    <div>
      <NavContainer location={location.pathname} />
      <GalleryContainer />
    </div>
  );
}

export default Gallery;
