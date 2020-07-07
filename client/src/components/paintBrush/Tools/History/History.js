import React from 'react';
import Undo from './Undo';
import Redo from './Redo';

function History({ onUndo, onRedo }) {
  return (
    <>
      <Undo onUndo={onUndo} />
      <Redo onRedo={onRedo} />
    </>
  );
}

export default History;
