import { useLayoutEffect } from 'react';

export default () => {
  useLayoutEffect(() => {
    // Grab the original body overflow property
    const originalOverflow = window.getComputedStyle(document.body).overflow;
    // Set overflow to hidden on the body to prevent scrolling
    document.body.style.overflow = 'hidden';
    // Re-enable scrolling (or whatever the original overflow was) when component unmounts
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, []); 
};
