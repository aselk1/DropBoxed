import React, { useContext, useRef, useState, useEffect } from "react";
import ReactDOM from "react-dom";
import "./Modal.css";

const DropDownContext = React.createContext();

export function DropDownProvider({ children }) {
  const modalRef = useRef();
  const [value, setValue] = useState();

  useEffect(() => {
    setValue(modalRef.current);
  }, []);

  return (
    <>
      <DropDownContext.Provider value={value}>{children}</DropDownContext.Provider>
      <div ref={modalRef} />
    </>
  );
}

export function DropDownModal({ onClose, children }) {
  const modalNode = useContext(DropDownContext);
  if (!modalNode) return null;

  return ReactDOM.createPortal(
    <div id="dropDown">
      <div id="dropDown-background" onClick={onClose} />
      <div id="dropDown-content">{children}</div>
    </div>,
    modalNode
  );
}
