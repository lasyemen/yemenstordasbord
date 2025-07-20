import { useEffect } from "react";

export default function Notification({ message, type = "success", onClose }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 5000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div 
      className={`modern-notification ${type}`}
      style={{
        animation: "slideIn 0.3s ease"
      }}
    >
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
      }}>
        <span>{message}</span>
        <button 
          onClick={onClose}
          style={{
            background: "none",
            border: "none",
            color: "inherit",
            cursor: "pointer",
            fontSize: "18px",
            padding: "0",
            marginLeft: "15px"
          }}
          aria-label="إغلاق"
        >
          ✕
        </button>
      </div>
    </div>
  );
} 