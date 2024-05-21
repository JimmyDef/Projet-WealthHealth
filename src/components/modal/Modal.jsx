import React, { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import PropTypes from "prop-types";

import styles from "./modal.module.scss";

const Modal = ({ isOpen, onClose, children, title, onConfirm, toFocusRef }) => {
  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      window.addEventListener("keydown", handleEsc);
    } else {
      window.removeEventListener("keydown", handleEsc);
    }
    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;
  return createPortal(
    <div
      tabIndex={0}
      className={styles.overlay}
      onClick={onClose}
      role="dialog"
      aria-modal="true">
      <div
        ref={toFocusRef}
        tabIndex={0}
        className={styles.content}
        onClick={(e) => e.stopPropagation()}>
        <h1 id="modal-h1">{title}</h1>
        <div className={styles.buttonWrapper}>
          {onConfirm && (
            <button className={styles.confirmButton} onClick={onConfirm}>
              Confirmation
            </button>
          )}
          <button className={styles.closeButton} onClick={onClose}>
            Cancel
          </button>
        </div>
        {children}
      </div>
    </div>,
    document.body
  );
};

Modal.propTypes = {};

export default Modal;
