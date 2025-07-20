import { Link } from "react-router-dom";
import { useState } from "react";

export default function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <>
      {/* Mobile Menu Button */}
      <div style={{
        position: "fixed",
        top: "20px",
        right: "20px",
        zIndex: 1000,
        display: "none"
      }}
      className="mobile-menu-btn"
      onClick={() => setIsCollapsed(!isCollapsed)}
      >
        <div style={{
          width: "30px",
          height: "3px",
          background: "#32CD32",
          margin: "5px 0",
          borderRadius: "2px"
        }}></div>
        <div style={{
          width: "30px",
          height: "3px",
          background: "#32CD32",
          margin: "5px 0",
          borderRadius: "2px"
        }}></div>
        <div style={{
          width: "30px",
          height: "3px",
          background: "#32CD32",
          margin: "5px 0",
          borderRadius: "2px"
        }}></div>
      </div>

      <div style={{
        width: isCollapsed ? "80px" : "250px",
        background: "#000",
        color: "#fff",
        minHeight: "100vh",
        padding: "20px",
        borderRight: "1px solid #333",
        transition: "width 0.3s ease",
        position: "relative"
      }}>
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
            flexShrink: 0
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
                style={{ 
                  color: "#fff", 
                  textDecoration: "none",
                  display: "flex",
                  alignItems: "center",
                  padding: "12px 15px",
                  borderRadius: "8px",
                  transition: "all 0.3s ease",
                  fontSize: "16px"
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = "linear-gradient(135deg, #32CD32, #87CEEB)";
                  e.target.style.color = "#000";
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = "transparent";
                  e.target.style.color = "#fff";
                }}
              >
                <span style={{ marginLeft: "10px" }}>🏠</span>
                {!isCollapsed && <span>الرئيسية</span>}
              </Link>
            </li>
            <li style={{ marginBottom: "15px" }}>
              <Link 
                to="/products" 
                style={{ 
                  color: "#fff", 
                  textDecoration: "none",
                  display: "flex",
                  alignItems: "center",
                  padding: "12px 15px",
                  borderRadius: "8px",
                  transition: "all 0.3s ease",
                  fontSize: "16px"
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = "linear-gradient(135deg, #32CD32, #87CEEB)";
                  e.target.style.color = "#000";
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = "transparent";
                  e.target.style.color = "#fff";
                }}
              >
                <span style={{ marginLeft: "10px" }}>📦</span>
                {!isCollapsed && <span>المنتجات</span>}
              </Link>
            </li>
            <li style={{ marginBottom: "15px" }}>
              <Link 
                to="/orders" 
                style={{ 
                  color: "#fff", 
                  textDecoration: "none",
                  display: "flex",
                  alignItems: "center",
                  padding: "12px 15px",
                  borderRadius: "8px",
                  transition: "all 0.3s ease",
                  fontSize: "16px"
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = "linear-gradient(135deg, #32CD32, #87CEEB)";
                  e.target.style.color = "#000";
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = "transparent";
                  e.target.style.color = "#fff";
                }}
              >
                <span style={{ marginLeft: "10px" }}>📋</span>
                {!isCollapsed && <span>الطلبات</span>}
              </Link>
            </li>
            <li style={{ marginBottom: "15px" }}>
              <Link 
                to="/categories" 
                style={{ 
                  color: "#fff", 
                  textDecoration: "none",
                  display: "flex",
                  alignItems: "center",
                  padding: "12px 15px",
                  borderRadius: "8px",
                  transition: "all 0.3s ease",
                  fontSize: "16px"
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = "linear-gradient(135deg, #32CD32, #87CEEB)";
                  e.target.style.color = "#000";
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = "transparent";
                  e.target.style.color = "#fff";
                }}
              >
                <span style={{ marginLeft: "10px" }}>📂</span>
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
                opacity: 0.8
              }}>
                {!isCollapsed && "إدارة الموظفين"}
              </div>
            </li>
            <li style={{ marginBottom: "15px" }}>
              <Link 
                to="/staff" 
                style={{ 
                  color: "#fff", 
                  textDecoration: "none",
                  display: "flex",
                  alignItems: "center",
                  padding: "12px 15px",
                  borderRadius: "8px",
                  transition: "all 0.3s ease",
                  fontSize: "16px"
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = "linear-gradient(135deg, #32CD32, #87CEEB)";
                  e.target.style.color = "#000";
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = "transparent";
                  e.target.style.color = "#fff";
                }}
              >
                <span style={{ marginLeft: "10px" }}>👥</span>
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
                opacity: 0.8
              }}>
                {!isCollapsed && "إدارة العملاء"}
              </div>
            </li>
            <li style={{ marginBottom: "15px" }}>
              <Link 
                to="/customers" 
                style={{ 
                  color: "#fff", 
                  textDecoration: "none",
                  display: "flex",
                  alignItems: "center",
                  padding: "12px 15px",
                  borderRadius: "8px",
                  transition: "all 0.3s ease",
                  fontSize: "16px"
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = "linear-gradient(135deg, #32CD32, #87CEEB)";
                  e.target.style.color = "#000";
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = "transparent";
                  e.target.style.color = "#fff";
                }}
              >
                <span style={{ marginLeft: "10px" }}>👤</span>
                {!isCollapsed && <span>إدارة العملاء</span>}
              </Link>
            </li>
            <li style={{ marginBottom: "15px" }}>
              <Link 
                to="/reports" 
                style={{ 
                  color: "#fff", 
                  textDecoration: "none",
                  display: "flex",
                  alignItems: "center",
                  padding: "12px 15px",
                  borderRadius: "8px",
                  transition: "all 0.3s ease",
                  fontSize: "16px"
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = "linear-gradient(135deg, #32CD32, #87CEEB)";
                  e.target.style.color = "#000";
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = "transparent";
                  e.target.style.color = "#fff";
                }}
              >
                <span style={{ marginLeft: "10px" }}>📊</span>
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
            style={{
              display: "block",
              padding: "12px",
              background: "linear-gradient(135deg, #ff4444, #cc0000)",
              color: "#fff",
              textDecoration: "none",
              borderRadius: "8px",
              textAlign: "center",
              fontSize: "14px",
              fontWeight: "bold"
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