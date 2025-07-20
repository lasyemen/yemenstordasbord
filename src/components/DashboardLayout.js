import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

export default function DashboardLayout() {
  return (
    <div style={{ 
      display: "flex",
      minHeight: "100vh",
      background: "#000",
      color: "#fff",
      fontFamily: "Arial, sans-serif"
    }}>
      <Sidebar />
      <div style={{ 
        flex: 1, 
        padding: "30px",
        background: "#000",
        minHeight: "100vh",
        overflowY: "auto"
      }}>
        <Outlet />
      </div>
    </div>
  );
} 