import { useState } from 'react';

const useModalState = (defaultOpen = false) => {
  const [isOpen, changeIsOpen] = useState(defaultOpen);
  const close = () => changeIsOpen(false);
  const open = () => changeIsOpen(true);
  return {
    isOpen,
    close,
    open,
  };
};

export default useModalState;
