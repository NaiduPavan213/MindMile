import React, { createContext, useContext } from 'react';

// Create the context with default values
export const ModalContext = createContext({
  type: null,
  props: {},
  openModal: () => {},
  closeModal: () => {},
  setModalProps: () => {},
});

// Custom hook for accessing the modal context
export const useModal = () => useContext(ModalContext);
