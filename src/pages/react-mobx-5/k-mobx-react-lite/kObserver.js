import React from 'react';
import { useObserver } from './useObserver';

export function observer(baseComponent, options = {}) {
  let realOptions = {
    forwardRef: false,
    ...options
  }

  const useWrappedComponent = (props, ref) => {
    return useObserver(() => baseComponent(props, ref));
  }

  let memoComponent;
  if (realOptions.forwardRef) {
    memoComponent = React.memo(React.forwardRef(useWrappedComponent));
  } else {
    memoComponent = React.memo(useWrappedComponent);
  }

  return memoComponent;
}
