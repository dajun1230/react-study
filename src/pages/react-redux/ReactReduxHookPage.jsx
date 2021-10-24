import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

export default function ReactReduxHookPage() {
  const count = useSelector(({ count }) => count);
  const dispatch = useDispatch();

  const add = () => {
    dispatch({ type: "ADD" })
  }

  return (
    <div>
      <h1>ReactReduxHookPage</h1>
      <p>count: {count}</p>
      <button onClick={add}>add</button>
    </div>
  )
}
