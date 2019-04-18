import { useEffect, useState } from 'react';

export default (value, callback) => {
  const [prevValue, setPrevValue] = useState(null);
  const [isFirstRun, setIsFirstRun] = useState(true);
  useEffect(
    () => {
      if (!isFirstRun && !prevValue && value) {
        callback();
      }
      setPrevValue(value);
      if (isFirstRun) {
        setIsFirstRun(false);
      }
    },
    [value],
  );
};
