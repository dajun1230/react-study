import React, { useState, useCallback } from "react";

export function useForceUpdate() {
  const [_, setTick] = useState(0);
  const update = useCallback(() => {
    setTick(tick => tick + 1);
  }, [])
  return update;
}
