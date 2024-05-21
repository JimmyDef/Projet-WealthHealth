import React, { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import PropTypes from "prop-types";

import styles from "./modal.module.scss";

const Modal = ({ isOpen, onClose, children, title, onConfirm }) => {
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
      className={styles.overlay}
      onClick={onClose}
      role="dialog"
      aria-modal="true">
      <div
        className={styles.content}
        onClick={(e) => e.stopPropagation()}
        tabIndex={0}>
        <h1>{title}</h1>
        {onConfirm && (
          <button className={styles.closeButton} onClick={onConfirm}>
            Confirmation
          </button>
        )}
        <button className={styles.closeButton} onClick={onClose}>
          Cancel
        </button>
        {children}
      </div>
    </div>,
    document.body
  );
};

Modal.propTypes = {};

export default Modal;
