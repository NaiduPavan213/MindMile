import React, { useState, useCallback } from "react";
import { ModalContext } from "../contexts/ModalContext";

export const ModalProvider = ({ children }) => {
  const [modalState, setModalState] = useState({
    type: null,
    props: {},
  });

  const openModal = useCallback((type, props = {}) => {
    setModalState({ type, props });
  }, []);

  const closeModal = useCallback(() => {
    setModalState({ type: null, props: {} });
  }, []);

  // Allows components to update modal props dynamically
  const setModalProps = useCallback((newProps) => {
    setModalState((prevState) => ({
      ...prevState,
      props: { ...prevState.props, ...newProps },
    }));
  }, []);

  return (
    <ModalContext.Provider
      value={{ ...modalState, openModal, closeModal, setModalProps }}
    >
      {children}
    </ModalContext.Provider>
  );
};
