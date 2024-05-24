import { useEffect } from "react";
import { createPortal } from "react-dom";
import PropTypes from "prop-types";
import { handleEsc } from "../../util/modules";
import styles from "./modal.module.scss";
import crossButton from "./../../assets/cross.png";
const Modal = ({
  isOpen,
  onClose,
  children,
  title,
  onConfirm,
  toFocusRef,
  showCrossButton = false,
  showCancelButton = true,
  closeButtonText = "Close",
  imageCloseButton = crossButton,
}) => {
  Modal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    closeButtonText: PropTypes.string,
    showCrossButton: PropTypes.bool,
    showCancelButton: PropTypes.bool,
    onClose: PropTypes.func.isRequired,
    onConfirm: PropTypes.func,
    toFocusRef: PropTypes.oneOfType([
      PropTypes.func,
      PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
    ]),
    title: PropTypes.string.isRequired,
    children: PropTypes.node,
    imageCloseButton: PropTypes.string,
  };

  useEffect(() => {
    const handleKeyDown = (event) => handleEsc(event, onClose);

    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    } else {
      window.removeEventListener("keydown", handleKeyDown);
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;
  return createPortal(
    <div
      tabIndex={0}
      ref={toFocusRef}
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
          {onConfirm && (
            <button
              className={`${styles.confirmButton} jcm_ConfirmButton`}
              onClick={onConfirm}>
              Confirmation
            </button>
          )}
          {showCancelButton && (
            <button
              className={`${styles.closeButton} jcm_CloseButton`}
              onClick={onClose}>
              {closeButtonText}
            </button>
          )}
          {showCrossButton && (
            <button
              className={`${styles.crossButton} jcm_CrossButton`}
              onClick={onClose}>
              <img
                src={imageCloseButton}
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

export default Modal;
