import React, { useRef, useLayoutEffect, useCallback } from 'react';
import NavContainer from '../containers/NavContainer';
import CanvasContainer from '../containers/CanvasContainer';
import ToolsContainer from '../containers/ToolsContainer';
import { useDispatch } from 'react-redux';
import { Width, Height } from '../redux/modules/canvas';
import Footer from '../components/Footer/Footer';
import { useLocation } from 'react-router-dom';

function Main() {
  const location = useLocation();
  const dispatch = useDispatch();
  const onchangeWidth = useCallback((value) => dispatch(Width(value)), [
    dispatch,
  ]);

  const onchangeHeight = useCallback((value) => dispatch(Height(value)), [
    dispatch,
  ]);

  const Container = React.forwardRef((props, ref) => (
    <div ref={ref}>{props.children}</div>
  ));

  const refs = {
    header: useRef(),
    footer: useRef(),
  };

  const { header, footer } = refs;

  const updateSize = useCallback(
    function () {
      const width = window.innerWidth;
      const height =
        window.innerHeight -
        header.current.offsetHeight -
        footer.current.offsetHeight;
      onchangeWidth(width);
      onchangeHeight(height);
    },
    [onchangeWidth, onchangeHeight, header, footer],
  );

  useLayoutEffect(() => {
    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
  }, [updateSize]);

  return (
    <>
      <Container ref={header}>
        <NavContainer location={location.pathname} />
        <ToolsContainer />
      </Container>
      <CanvasContainer />
      <Container ref={footer}>
        <Footer />
      </Container>
    </>
  );
}

export default Main;
