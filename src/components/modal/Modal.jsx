import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import PropTypes from "prop-types";
import styles from "./modal.module.css";
import crossButton from "./../../assets/cross.svg";

/**
 * Modal is a React component for displaying a modal window.
 *
 * @param {Object} props The properties of the component.
 * @param {boolean} props.isOpen Indicates whether the modal is open.
 * @param {function} props.onClose Function called to close the modal.
 * @param {React.ReactNode} props.children Content to be displayed in the modal.
 * @param {string} props.title The title of the modal.
 * @param {function} [props.onConfirmClick] Function called when the confirm button is clicked.
 * @param {React.RefObject} [props.focusRef] Reference to the element to focus when the modal opens.
 * @param {boolean} [props.showCloseButton=false] Indicates whether the cross close button should be displayed.
 * @param {boolean} [props.showCancelButton=true] Indicates whether the close button should be displayed.
 * @param {string} [props.closeButtonLabel="Close"] Alternative text for the close button.
 * @param {string} [props.closeButtonIcon=crossButton] Path of the image for the close button.
 * @returns {JSX.Element|null} The JSX rendered output of the component or null if the modal is closed.
 */

const Modal = ({
  isOpen,
  onClose,
  children,
  title,
  onConfirmClick,

  showCloseButton = false,
  showCancelButton = true,
  closeButtonLabel = "Close",
  closeButtonIcon = crossButton,
}) => {
  const focusRef = useRef();

  // Effect to manage focus when modal opens or closes
  useEffect(() => {
    const rootElement = document.getElementById("root");
    if (isOpen) {
      rootElement.setAttribute("aria-hidden", "true");
      rootElement.classList.add("modal-open");
      focusRef.current?.focus();
    } else {
      rootElement.setAttribute("aria-hidden", "false");
      rootElement.classList.remove("modal-open");
    }
  }, [isOpen]);

  // Effect to handle Escape key press to close the modal
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

  // Render nothing if modal is closed
  if (!isOpen) return null;

  // Render modal content
  return createPortal(
    <div
      tabIndex={0}
      ref={focusRef}
      className={`${styles.overlay} jcm_Overlay`}
      role="dialog"
      aria-modal="true">
      <div className={`${styles.content} jcm_Modal`}>
        <h1 id="modal-h1" className="normal">
          {title}
        </h1>
        <section className={`${styles.childrenSection} jcm_ChildrenSection`}>
          {children}
        </section>
        <section className={`${styles.buttonSection} jcm_ButtonSection`}>
          {onConfirmClick && (
            <button
              className={`${styles.confirmButton} jcm_ConfirmButton`}
              onClick={onConfirmClick}>
              Confirmation
            </button>
          )}
          {showCancelButton && (
            <button
              className={`${styles.closeButton} jcm_CloseButton`}
              onClick={onClose}>
              {closeButtonLabel}
            </button>
          )}
          {showCloseButton && (
            <button
              className={`${styles.crossButton} jcm_CrossButton`}
              onClick={onClose}>
              <img
                src={closeButtonIcon}
                alt="close icon"
                className={styles.crossImg}
              />
            </button>
          )}
        </section>
      </div>
    </div>,
    document.body
  );
};

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  closeButtonLabel: PropTypes.string,
  showCloseButton: PropTypes.bool,
  showCancelButton: PropTypes.bool,
  onConfirmClick: PropTypes.func,

  children: PropTypes.node,
  closeButtonIcon: PropTypes.string,
};
export default Modal;
