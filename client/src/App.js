import React, {
  useRef,
  useEffect,
  useCallback,
  useReducer,
  useState,
} from 'react';
import './App.css';
import CanvasContainer from './containers/CanvasContainer';
import NavContainer from './containers/NavContainer';
import ToolsContainer from './containers/ToolsContainer';
import { useDispatch } from 'react-redux';
import { Width, Height } from './redux/modules/canvas';
import Footer from './components/Footer/Footer';

const computedValue = (state, action) => {
  if (action.type === 'SIZE') {
    return { ...state, width: action.width, height: action.height };
  } else if (action.type === 'WIDH') {
    return { ...state, width: action.width };
  } else if (action.type === 'HEIGHT') {
    return { ...state, height: action.height };
  } else {
    return state;
  }
};

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
    app: useRef(),
    header: useRef(),
    footer: useRef(),
  };

  const { app, header, footer } = refs;

  const [size, dispatchSize] = useReducer(computedValue, {
    width: null,
    height: null,
  });

  const [checkingResize, setCheckingResize] = useState(0);

  const ComputedCanvasSize = useCallback(() => {
    setCheckingResize((pre) => pre + 1);
    const height =
      app.current.offsetHeight -
      header.current.offsetHeight -
      footer.current.offsetHeight;

    const width = app.current.offsetWidth;

    dispatchSize({
      type: 'WIDTH',
      width,
    });

    dispatchSize({
      type: 'HEIGHT',
      height,
    });
  }, [app, header, footer, setCheckingResize]);

  useEffect(() => {
    ComputedCanvasSize();
    onchangeWidth(size.width);
    onchangeHeight(size.height);
    console.log(
      'computedWidth >> ',
      size.width,
      '\n computedHeight >> ',
      size.height,
      '\n refs >> ',
      refs,
      checkingResize,
    );
  }, [
    onchangeWidth,
    onchangeHeight,
    size.width,
    size.height,
    ComputedCanvasSize,
  ]);

  useEffect(() => {
    window.addEventListener('resize', ComputedCanvasSize);
    ComputedCanvasSize();
    return () => window.removeEventListener('resize', ComputedCanvasSize);
    // eslint-disable-next-line
  }, []);

  return (
    <div style={{ height: '100vh' }} ref={app}>
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
