import { Link } from "react-router-dom";
import { useState } from "react";

export default function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileOpen(!isMobileOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileOpen(false);
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <div 
        className="mobile-menu-btn"
        onClick={toggleMobileMenu}
        style={{
          display: "none",
          position: "fixed",
          top: "20px",
          right: "20px",
          zIndex: 1000,
          background: "rgba(0, 0, 0, 0.8)",
          border: "none",
          borderRadius: "8px",
          padding: "10px",
          cursor: "pointer",
          backdropFilter: "blur(10px)",
          border: "1px solid rgba(255, 255, 255, 0.1)"
        }}
      >
        <div style={{
          width: "25px",
          height: "3px",
          background: "#32CD32",
          margin: "5px 0",
          borderRadius: "2px",
          transition: "all 0.3s ease"
        }}></div>
        <div style={{
          width: "25px",
          height: "3px",
          background: "#32CD32",
          margin: "5px 0",
          borderRadius: "2px",
          transition: "all 0.3s ease"
        }}></div>
        <div style={{
          width: "25px",
          height: "3px",
          background: "#32CD32",
          margin: "5px 0",
          borderRadius: "2px",
          transition: "all 0.3s ease"
        }}></div>
      </div>

      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div 
          onClick={closeMobileMenu}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(0, 0, 0, 0.5)",
            zIndex: 998,
            backdropFilter: "blur(5px)"
          }}
        ></div>
      )}

      <div 
        className={`sidebar-responsive ${isMobileOpen ? 'open' : ''}`}
        style={{
          width: isCollapsed ? "80px" : "250px",
          background: "linear-gradient(135deg, #000000, #1a1a1a)",
          color: "#fff",
          minHeight: "100vh",
          padding: "20px",
          borderLeft: "1px solid rgba(255, 255, 255, 0.1)",
          transition: "all 0.3s ease",
          position: "fixed",
          top: 0,
          right: 0,
          height: "100vh",
          zIndex: 999,
          boxShadow: "0 0 20px rgba(0, 0, 0, 0.3)",
          backdropFilter: "blur(10px)",
          overflowY: "auto"
        }}
      >
        {/* Logo */}
        <div style={{
          display: "flex",
          alignItems: "center",
          marginBottom: "40px",
          padding: "10px"
        }}>
          <div style={{
            width: "40px",
            height: "40px",
            background: "linear-gradient(135deg, #32CD32, #87CEEB)",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginLeft: "10px",
            flexShrink: 0,
            boxShadow: "0 4px 15px rgba(50, 205, 50, 0.3)"
          }}>
            <div style={{
              width: "25px",
              height: "30px",
              border: "2px solid #000",
              borderRadius: "0 0 12px 12px",
              position: "relative"
            }}>
              <div style={{
                width: "10px",
                height: "8px",
                border: "1px solid #000",
                borderRadius: "0 0 5px 5px",
                position: "absolute",
                top: "-8px",
                left: "50%",
                transform: "translateX(-50%)"
              }}></div>
            </div>
          </div>
          {!isCollapsed && (
            <h2 style={{ 
              color: "#32CD32", 
              margin: 0,
              fontSize: "20px",
              fontWeight: "bold"
            }}>
              YemenStore
            </h2>
          )}
        </div>

        {/* Navigation */}
        <nav>
          <ul style={{ 
            listStyle: "none", 
            padding: 0, 
            margin: 0 
          }}>
            <li style={{ marginBottom: "15px" }}>
              <Link 
                to="/" 
                onClick={closeMobileMenu}
                style={{ 
                  color: "#fff", 
                  textDecoration: "none",
                  display: "flex",
                  alignItems: "center",
                  padding: "12px 15px",
                  borderRadius: "12px",
                  transition: "all 0.3s ease",
                  fontSize: "16px",
                  fontWeight: "500"
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = "linear-gradient(135deg, #32CD32, #87CEEB)";
                  e.target.style.color = "#000";
                  e.target.style.transform = "translateX(-5px)";
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = "transparent";
                  e.target.style.color = "#fff";
                  e.target.style.transform = "translateX(0)";
                }}
              >
                <span style={{ marginLeft: "10px", fontSize: "18px" }}>🏠</span>
                {!isCollapsed && <span>الرئيسية</span>}
              </Link>
            </li>
            <li style={{ marginBottom: "15px" }}>
              <Link 
                to="/products" 
                onClick={closeMobileMenu}
                style={{ 
                  color: "#fff", 
                  textDecoration: "none",
                  display: "flex",
                  alignItems: "center",
                  padding: "12px 15px",
                  borderRadius: "12px",
                  transition: "all 0.3s ease",
                  fontSize: "16px",
                  fontWeight: "500"
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = "linear-gradient(135deg, #32CD32, #87CEEB)";
                  e.target.style.color = "#000";
                  e.target.style.transform = "translateX(-5px)";
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = "transparent";
                  e.target.style.color = "#fff";
                  e.target.style.transform = "translateX(0)";
                }}
              >
                <span style={{ marginLeft: "10px", fontSize: "18px" }}>📦</span>
                {!isCollapsed && <span>المنتجات</span>}
              </Link>
            </li>
            <li style={{ marginBottom: "15px" }}>
              <Link 
                to="/orders" 
                onClick={closeMobileMenu}
                style={{ 
                  color: "#fff", 
                  textDecoration: "none",
                  display: "flex",
                  alignItems: "center",
                  padding: "12px 15px",
                  borderRadius: "12px",
                  transition: "all 0.3s ease",
                  fontSize: "16px",
                  fontWeight: "500"
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = "linear-gradient(135deg, #32CD32, #87CEEB)";
                  e.target.style.color = "#000";
                  e.target.style.transform = "translateX(-5px)";
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = "transparent";
                  e.target.style.color = "#fff";
                  e.target.style.transform = "translateX(0)";
                }}
              >
                <span style={{ marginLeft: "10px", fontSize: "18px" }}>📋</span>
                {!isCollapsed && <span>الطلبات</span>}
              </Link>
            </li>
            <li style={{ marginBottom: "15px" }}>
              <Link 
                to="/categories" 
                onClick={closeMobileMenu}
                style={{ 
                  color: "#fff", 
                  textDecoration: "none",
                  display: "flex",
                  alignItems: "center",
                  padding: "12px 15px",
                  borderRadius: "12px",
                  transition: "all 0.3s ease",
                  fontSize: "16px",
                  fontWeight: "500"
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = "linear-gradient(135deg, #32CD32, #87CEEB)";
                  e.target.style.color = "#000";
                  e.target.style.transform = "translateX(-5px)";
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = "transparent";
                  e.target.style.color = "#fff";
                  e.target.style.transform = "translateX(0)";
                }}
              >
                <span style={{ marginLeft: "10px", fontSize: "18px" }}>📂</span>
                {!isCollapsed && <span>الفئات</span>}
              </Link>
            </li>

            {/* Staff Management Section */}
            <li style={{ marginBottom: "15px" }}>
              <div style={{
                color: "#32CD32",
                fontSize: "14px",
                fontWeight: "bold",
                marginBottom: "10px",
                padding: "0 15px",
                opacity: 0.8,
                borderBottom: "1px solid rgba(50, 205, 50, 0.3)",
                paddingBottom: "5px"
              }}>
                {!isCollapsed && "إدارة الموظفين"}
              </div>
            </li>
            <li style={{ marginBottom: "15px" }}>
              <Link 
                to="/staff" 
                onClick={closeMobileMenu}
                style={{ 
                  color: "#fff", 
                  textDecoration: "none",
                  display: "flex",
                  alignItems: "center",
                  padding: "12px 15px",
                  borderRadius: "12px",
                  transition: "all 0.3s ease",
                  fontSize: "16px",
                  fontWeight: "500"
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = "linear-gradient(135deg, #32CD32, #87CEEB)";
                  e.target.style.color = "#000";
                  e.target.style.transform = "translateX(-5px)";
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = "transparent";
                  e.target.style.color = "#fff";
                  e.target.style.transform = "translateX(0)";
                }}
              >
                <span style={{ marginLeft: "10px", fontSize: "18px" }}>👥</span>
                {!isCollapsed && <span>إدارة الموظفين</span>}
              </Link>
            </li>

            {/* Customers Management Section */}
            <li style={{ marginBottom: "15px" }}>
              <div style={{
                color: "#32CD32",
                fontSize: "14px",
                fontWeight: "bold",
                marginBottom: "10px",
                padding: "0 15px",
                opacity: 0.8,
                borderBottom: "1px solid rgba(50, 205, 50, 0.3)",
                paddingBottom: "5px"
              }}>
                {!isCollapsed && "إدارة العملاء"}
              </div>
            </li>
            <li style={{ marginBottom: "15px" }}>
              <Link 
                to="/customers" 
                onClick={closeMobileMenu}
                style={{ 
                  color: "#fff", 
                  textDecoration: "none",
                  display: "flex",
                  alignItems: "center",
                  padding: "12px 15px",
                  borderRadius: "12px",
                  transition: "all 0.3s ease",
                  fontSize: "16px",
                  fontWeight: "500"
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = "linear-gradient(135deg, #32CD32, #87CEEB)";
                  e.target.style.color = "#000";
                  e.target.style.transform = "translateX(-5px)";
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = "transparent";
                  e.target.style.color = "#fff";
                  e.target.style.transform = "translateX(0)";
                }}
              >
                <span style={{ marginLeft: "10px", fontSize: "18px" }}>👤</span>
                {!isCollapsed && <span>إدارة العملاء</span>}
              </Link>
            </li>

            <li style={{ marginBottom: "15px" }}>
              <Link 
                to="/reports" 
                onClick={closeMobileMenu}
                style={{ 
                  color: "#fff", 
                  textDecoration: "none",
                  display: "flex",
                  alignItems: "center",
                  padding: "12px 15px",
                  borderRadius: "12px",
                  transition: "all 0.3s ease",
                  fontSize: "16px",
                  fontWeight: "500"
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = "linear-gradient(135deg, #32CD32, #87CEEB)";
                  e.target.style.color = "#000";
                  e.target.style.transform = "translateX(-5px)";
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = "transparent";
                  e.target.style.color = "#fff";
                  e.target.style.transform = "translateX(0)";
                }}
              >
                <span style={{ marginLeft: "10px", fontSize: "18px" }}>📊</span>
                {!isCollapsed && <span>التقارير</span>}
              </Link>
            </li>
          </ul>
        </nav>

        {/* Logout Button */}
        <div style={{
          position: "absolute",
          bottom: "20px",
          left: "20px",
          right: "20px"
        }}>
          <Link 
            to="/login" 
            onClick={closeMobileMenu}
            style={{
              display: "block",
              padding: "12px",
              background: "linear-gradient(135deg, #ff4444, #cc0000)",
              color: "#fff",
              textDecoration: "none",
              borderRadius: "12px",
              textAlign: "center",
              fontSize: "14px",
              fontWeight: "bold",
              transition: "all 0.3s ease",
              boxShadow: "0 4px 15px rgba(255, 68, 68, 0.3)"
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = "translateY(-2px)";
              e.target.style.boxShadow = "0 6px 20px rgba(255, 68, 68, 0.4)";
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = "translateY(0)";
              e.target.style.boxShadow = "0 4px 15px rgba(255, 68, 68, 0.3)";
            }}
          >
            {!isCollapsed && "🚪 تسجيل الخروج"}
            {isCollapsed && "🚪"}
          </Link>
        </div>
      </div>
    </>
  );
} 