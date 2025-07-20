import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

export default function DashboardLayout() {
  return (
    <div style={{
      display: "flex",
      minHeight: "100vh",
      background: "linear-gradient(135deg, #0f1419 0%, #1a1f2e 50%, #2d3748 100%)"
    }}>
      <Sidebar />
      <main 
        className="content-responsive"
        style={{
          flex: 1,
          padding: "30px",
          transition: "margin-right 0.3s ease",
          minHeight: "100vh",
          overflowX: "hidden",
          marginRight: "250px"
        }}
      >
        <div style={{
          maxWidth: "1400px",
          margin: "0 auto"
        }}>
          <Outlet />
        </div>
      </main>
    </div>
  );
} 