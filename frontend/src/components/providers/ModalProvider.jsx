import React, { useState, useCallback } from "react";
import { ModalContext } from "../contexts/ModalContext";

export const ModalProvider = ({ children }) => {
  const [modalState, setModalState] = useState({
    type: null,
    props: {},
  });

  const openModal = useCallback((type, props) => {
    // Merge provided props with any existing modal props so global handlers
    // (set via setModalProps) are preserved when opening modals without props.
    setModalState((prevState) => ({
      type,
      props: { ...(prevState.props || {}), ...(props || {}) },
    }));
  }, []);

  const closeModal = useCallback(() => {
    // Close the active modal but preserve modal props (handlers) so global
    // callbacks set via setModalProps are not lost when a modal closes.
    setModalState((prevState) => ({ ...prevState, type: null }));
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
