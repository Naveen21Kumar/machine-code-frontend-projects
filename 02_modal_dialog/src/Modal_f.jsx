import { useEffect, useRef } from 'react';
import './Modal_f.css';

export default function Modal_f({ isOpen, onClose, children }) {
  const modalRef = useRef();
  const previouslyFocused = useRef(null);

  // Focus trap + return focus on close
  useEffect(() => {
    if (!isOpen) {
      // restore focus to previous element
      if (previouslyFocused.current) {
        previouslyFocused.current.focus();
      }
      return;
    }

    previouslyFocused.current = document.activeElement;

    // Modal might not render instantly
    const modalNode = modalRef.current;
    if (!modalNode) return;

    const focusable = modalNode.querySelectorAll(
      "button, a, input, textarea, select, [tabindex]:not([tabindex='-1'])"
    );

    if (focusable.length > 0) {
      focusable[0].focus();
    }

    function handleTab(e) {
      if (e.key !== 'Tab') return;

      const items = Array.from(focusable);
      if (items.length === 0) return;

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

    // SAFE CLEANUP
    return () => {
      if (modalNode) {
        modalNode.removeEventListener('keydown', handleTab);
      }
    };
  }, [isOpen]);

  // ESC close
  useEffect(() => {
    function handleKey(e) {
      if (e.key === 'Escape') onClose();
    }

    if (isOpen) {
      document.addEventListener('keydown', handleKey);
    }
    return () => document.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  function handleBackdropClick(e) {
    if (e.target === e.currentTarget) onClose();
  }

  return (
    <div className='modal-backdrop' onClick={handleBackdropClick}>
      <div
        className='modal-content'
        ref={modalRef}
        role='dialog'
        aria-modal='true'>
        {children}
      </div>
    </div>
  );
}
