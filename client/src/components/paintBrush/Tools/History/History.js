import React, { useEffect } from 'react';
import Undo from './Undo';
import Redo from './Redo';
import { useCallback } from 'react';

function History({ onUndo, onRedo }) {
  const handleShortKey = useCallback(
    (e) => {
      if (e.shiftKey && e.ctrlKey && e.code === 'KeyZ') return onRedo();
      if (e.ctrlKey && e.code === 'KeyZ') return onUndo();
    },
    [onUndo, onRedo],
  );
  useEffect(() => {
    window.addEventListener('keydown', handleShortKey);
    return () => window.removeEventListener('keydown', handleShortKey);
  }, [handleShortKey]);
  return (
    <>
      <Undo onUndo={onUndo} />
      <Redo onRedo={onRedo} />
    </>
  );
}

export default History;
