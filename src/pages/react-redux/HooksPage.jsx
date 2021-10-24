import React, { useReducer, useEffect, useLayoutEffect } from 'react';
import { countReducer } from '../redux/store';

const init = initArg => {
  return initArg - 0;
}

export default function HooksPage() {
  const [state, dispatch] = useReducer(countReducer, "0", init);

  useEffect(() => {
    console.log("useEffect");
  })

  useLayoutEffect(() => {
    console.log("useLayoutEffect");
  })

  return (
    <div>
      <h3>HooksPage</h3>
      <p>{state}</p>
      <button onClick={() => dispatch({ type: "ADD" })}>add</button>
    </div>
  )
}
