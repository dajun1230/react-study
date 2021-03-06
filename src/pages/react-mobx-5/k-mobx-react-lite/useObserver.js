import React, { useRef, useReducer, useEffect } from 'react';
import { Reaction } from 'mobx';

import { useForceUpdate } from './utils';

function observerComponentNameFor(baseComponentName) {
  return `observer${baseComponentName}`;
}

export function useObserver(fn, baseComponentName = "observed", options = {}) {

  // const [_, forceUpdate] = useReducer(x => x + 1, 0);

  // 组件有初次和更新，那这个时候reaction得做一个缓存
  const reactionTrackingRef = useRef(null);

  const wantedForceUpdate = options.useForceUpdate || useForceUpdate;
  const forceUpdate = wantedForceUpdate();
  if (!reactionTrackingRef.current) {
    reactionTrackingRef.current = {
      reaction: new Reaction(observerComponentNameFor(baseComponentName), () => {
        // 响应函数使用forceUpdate
        forceUpdate();
      })
    }
  }

  const { reaction } = reactionTrackingRef.current;

  useEffect(() => {
    return () => {
      // 清理reaction
      reactionTrackingRef.current.reaction.dispose();
      reactionTrackingRef.current = null;
    }
  }, [])

  let rendering;
  reaction.track(() => {
    rendering = fn();
  })

  return rendering;
}
