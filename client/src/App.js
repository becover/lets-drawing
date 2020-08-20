import React, {
  useRef,
  useEffect,
  useCallback,
  useState,
  useLayoutEffect,
} from 'react';
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
  const [width, height] = UseWindowSize();

  function UseWindowSize() {
    const [size, setSize] = useState([0, 0]);
    useLayoutEffect(() => {
      function updateSize() {
        setSize([
          window.innerWidth,
          window.innerHeight -
            header.current.offsetHeight -
            footer.current.offsetHeight,
        ]);
      }
      window.addEventListener('resize', updateSize);
      updateSize();
      return () => window.removeEventListener('resize', updateSize);
    }, []);
    return size;
  }

  useEffect(() => {
    onchangeWidth(width);
    onchangeHeight(height);
    console.log(width, height);
  }, [onchangeWidth, onchangeHeight, width, height, header, footer]);

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
