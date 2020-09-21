import React, { useState } from 'react';
import './App.css';
import CanvasContainer from './containers/CanvasContainer';
import NavContainer from './containers/NavContainer';
import ToolsContainer from './containers/ToolsContainer';
import Footer from './components/Footer/Footer';

function App() {
  const [initialSwitch, setInitialSwitch] = useState([
    { id: 'fill', checked: false },
    { id: 'border', checked: false },
  ]);

  return (
    <div style={{ height: '100vh' }}>
      <NavContainer />
      <ToolsContainer initialSwitch={initialSwitch} />
      <CanvasContainer setInitialSwitch={setInitialSwitch} />
      <Footer />
    </div>
  );
}

export default App;
