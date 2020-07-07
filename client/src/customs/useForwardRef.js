import React, { useRef } from 'react';

function useForwardRef(Compo) {
  const elemRef = useRef();
  const Element = React.forwardRef((props, ref) => (
    <Compo ref={ref}>{props.children}</Compo>
  ));
  return { elemRef, Element };
}

export default useForwardRef;
