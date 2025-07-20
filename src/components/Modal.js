import { useEffect } from "react";

export default function Modal({ isOpen, onClose, title, children }) {
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div 
      className="modern-modal"
      onClick={onClose}
    >
      <div 
        className="modern-modal-content"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modern-modal-header">
          <h2 className="modern-modal-title">{title}</h2>
          <button 
            className="modern-modal-close"
            onClick={onClose}
            aria-label="إغلاق"
          >
            ✕
          </button>
        </div>
        <div>
          {children}
        </div>
      </div>
    </div>
  );
} 