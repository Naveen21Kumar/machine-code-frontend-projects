import { useRef } from 'react';
import './Modal.css';
import { useEffect } from 'react';

const Modal = ({ children, isOpen, onClose }) => {
  const previouslyFocused = useRef(null);
  const modalRef = useRef();
  // Focus trap + return focus on close
  useEffect(() => {
    if (!isOpen) {
      if (previouslyFocused.current) {
        previouslyFocused.current.focus();
      }
      return;
    }

    previouslyFocused.current = document.activeElement;

    // Modal might not render instantly
    const modalNode = modalRef.current;

    const focusable = modalNode.querySelectorAll(
      "button, [tabindex]:not([tabindex='-1'])"
    );

    if (focusable.length > 0) {
      focusable[0].focus();
    }

    function handleTab(e) {
      if (e.key !== 'Tab') return;

      const items = Array.from(focusable);
      const first = items[0];
      const last = items[items.length - 1];

      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    }

    modalNode.addEventListener('keydown', handleTab);

    return () => {
      if (modalNode) {
        modalNode.removeEventListener('keydown', handleTab);
      }
    };
  }, [isOpen]);

  // ESC close
  useEffect(() => {
    function handleKey(e) {
      if (e.key === 'Escape') {
        onClose();
      }
    }
    if (isOpen) {
      document.addEventListener('keydown', handleKey);
    }
    return () => document.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  function handleBackdropClick(e) {
    if (e.target === e.currentTarget) {
      onClose();
    }
  }

  return (
    <div className='modal-backdrop' onClick={handleBackdropClick}>
      <div className='modal-content' ref={modalRef}>
        {children}
      </div>
    </div>
  );
};

export default Modal;
