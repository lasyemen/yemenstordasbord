import { useEffect, useState } from "react";

export default function Notification({ message, type = "success", duration = 3000, onClose }) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(() => {
        onClose();
      }, 300);
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const getBackgroundColor = () => {
    switch (type) {
      case "success":
        return "linear-gradient(135deg, #32CD32, #28a745)";
      case "error":
        return "linear-gradient(135deg, #ff4444, #cc0000)";
      case "warning":
        return "linear-gradient(135deg, #ffa500, #ff8c00)";
      case "info":
        return "linear-gradient(135deg, #87CEEB, #4682B4)";
      default:
        return "linear-gradient(135deg, #32CD32, #28a745)";
    }
  };

  const getIcon = () => {
    switch (type) {
      case "success":
        return "✅";
      case "error":
        return "❌";
      case "warning":
        return "⚠️";
      case "info":
        return "ℹ️";
      default:
        return "✅";
    }
  };

  return (
    <div
      className="success-message"
      style={{
        position: "fixed",
        top: "20px",
        left: "20px",
        right: "20px",
        maxWidth: "400px",
        background: getBackgroundColor(),
        color: "#fff",
        padding: "15px 20px",
        borderRadius: "10px",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)",
        zIndex: 1001,
        display: "flex",
        alignItems: "center",
        gap: "12px",
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(-20px)",
        transition: "all 0.3s ease"
      }}
    >
      <div style={{ fontSize: "20px" }}>
        {getIcon()}
      </div>
      <div style={{ flex: 1, fontSize: "14px" }}>
        {message}
      </div>
      <button
        onClick={() => {
          setIsVisible(false);
          setTimeout(() => {
            onClose();
          }, 300);
        }}
        style={{
          background: "none",
          border: "none",
          color: "#fff",
          cursor: "pointer",
          fontSize: "18px",
          padding: "0",
          width: "20px",
          height: "20px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        ×
      </button>
    </div>
  );
} 