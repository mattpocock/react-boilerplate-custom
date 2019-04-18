import { useEffect } from 'react';

export default func => {
  useEffect(() => {
    return func;
  }, []);
};
