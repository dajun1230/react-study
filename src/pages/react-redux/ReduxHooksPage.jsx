import React, { useCallback } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
import { useSelector, useDispatch } from './k-react-redux';

export default function ReduxHooksPage() {
  // 获取状态值
  const count = useSelector(({ count }) => count);
  const dispatch = useDispatch();

  const add = useCallback(() => {
    dispatch({ type: "ADD" });
  }, []);

  return (
    <div>
      <h3>HooksPage</h3>
      <p>{count}</p>
      <button onClick={add}>add</button>
    </div>
  )
}
