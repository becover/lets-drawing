import React, { useRef, useLayoutEffect, useCallback } from 'react';
import './App.css';
import CanvasContainer from './containers/CanvasContainer';
import NavContainer from './containers/NavContainer';
import ToolsContainer from './containers/ToolsContainer';
import { useDispatch } from 'react-redux';
import { Width, Height } from './redux/modules/canvas';
import Footer from './components/Footer/Footer';

function App() {
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
    <div style={{ height: '100vh' }}>
      <Container ref={header}>
        <NavContainer />
        <ToolsContainer />
      </Container>
      <CanvasContainer />
      <Container ref={footer}>
        <Footer />
      </Container>
    </div>
  );
}

export default App;
