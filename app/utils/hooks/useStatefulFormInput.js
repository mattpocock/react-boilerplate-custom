import { useState } from 'react';

export default initialValue => {
  const [value, onChange] = useState(initialValue);
  return { value, onChange };
};
