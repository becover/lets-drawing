import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, useLocation } from 'react-router-dom';
import GalleryContainer from '../containers/GalleryContainer';
import NavContainer from '../containers/NavContainer';

function Gallery() {
  const location = useLocation();
  const { isLogged } = useSelector(({ auth }) => ({ isLogged: auth.isLogged }));
  return (
    <>
      {isLogged ? (
        <div>
          <NavContainer location={location.pathname} />
          <GalleryContainer />
        </div>
      ) : (
        <Redirect to="/" />
      )}
    </>
  );
}

export default Gallery;
