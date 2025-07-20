import { useState } from "react";

export default function UsersPage() {
  const [users] = useState([
    { id: 1, name: "أحمد الصبري", role: "مشرف", phone: "0555555", status: "نشط" },
    { id: 2, name: "منى الجبلي", role: "موظف", phone: "0505050", status: "نشط" },
    { id: 3, name: "محمد عبدالله", role: "مدير", phone: "0777777", status: "نشط" },
    { id: 4, name: "سارة أحمد", role: "موظف", phone: "0666666", status: "معلق" },
  ]);

  const getRoleColor = (role) => {
    switch (role) {
      case "مدير":
        return "linear-gradient(135deg, #ff4444, #cc0000)";
      case "مشرف":
        return "linear-gradient(135deg, #ffa500, #ff8c00)";
      default:
        return "linear-gradient(135deg, #87CEEB, #4682B4)";
    }
  };

  const getStatusColor = (status) => {
    return status === "نشط" 
      ? "linear-gradient(135deg, #32CD32, #28a745)"
      : "linear-gradient(135deg, #ff4444, #cc0000)";
  };

  return (
    <div>
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "30px"
      }}>
        <h1 style={{
          color: "#fff",
          fontSize: "28px",
          margin: 0
        }}>
          المستخدمين والموظفين
        </h1>
        <button style={{
          background: "linear-gradient(135deg, #32CD32, #87CEEB)",
          color: "#000",
          border: "none",
          padding: "12px 25px",
          borderRadius: "8px",
          fontWeight: "bold",
          fontSize: "16px",
          cursor: "pointer",
          transition: "all 0.3s ease"
        }}>
          + إضافة مستخدم
        </button>
      </div>

      <div style={{
        background: "rgba(255, 255, 255, 0.05)",
        borderRadius: "15px",
        padding: "25px",
        border: "1px solid rgba(255, 255, 255, 0.1)"
      }}>
        <table style={{
          width: "100%",
          borderCollapse: "collapse",
          color: "#fff"
        }}>
          <thead>
            <tr style={{
              background: "linear-gradient(135deg, #32CD32, #87CEEB)",
              color: "#000"
            }}>
              <th style={{
                padding: "15px",
                textAlign: "right",
                borderRadius: "8px 0 0 8px"
              }}>
                الاسم
              </th>
              <th style={{
                padding: "15px",
                textAlign: "right"
              }}>
                الدور
              </th>
              <th style={{
                padding: "15px",
                textAlign: "right"
              }}>
                رقم الجوال
              </th>
              <th style={{
                padding: "15px",
                textAlign: "right"
              }}>
                الحالة
              </th>
              <th style={{
                padding: "15px",
                textAlign: "right",
                borderRadius: "0 8px 8px 0"
              }}>
                إجراءات
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((u, index) => (
              <tr key={u.id} style={{
                borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
                transition: "background 0.3s ease"
              }}
              onMouseEnter={(e) => {
                e.target.parentElement.style.background = "rgba(255, 255, 255, 0.05)";
              }}
              onMouseLeave={(e) => {
                e.target.parentElement.style.background = "transparent";
              }}
              >
                <td style={{ padding: "15px" }}>{u.name}</td>
                <td style={{ padding: "15px" }}>
                  <span style={{
                    padding: "5px 12px",
                    background: getRoleColor(u.role),
                    color: "#fff",
                    borderRadius: "15px",
                    fontSize: "12px",
                    fontWeight: "bold"
                  }}>
                    {u.role}
                  </span>
                </td>
                <td style={{ padding: "15px" }}>{u.phone}</td>
                <td style={{ padding: "15px" }}>
                  <span style={{
                    padding: "5px 12px",
                    background: getStatusColor(u.status),
                    color: "#fff",
                    borderRadius: "15px",
                    fontSize: "12px",
                    fontWeight: "bold"
                  }}>
                    {u.status}
                  </span>
                </td>
                <td style={{ padding: "15px" }}>
                  <button style={{
                    background: "linear-gradient(135deg, #32CD32, #87CEEB)",
                    color: "#000",
                    border: "none",
                    borderRadius: "6px",
                    margin: "0 4px",
                    padding: "8px 15px",
                    cursor: "pointer",
                    fontSize: "12px",
                    fontWeight: "bold"
                  }}>
                    تعديل
                  </button>
                  <button style={{
                    background: u.status === "نشط" 
                      ? "linear-gradient(135deg, #ff4444, #cc0000)"
                      : "linear-gradient(135deg, #32CD32, #28a745)",
                    color: "#fff",
                    border: "none",
                    borderRadius: "6px",
                    margin: "0 4px",
                    padding: "8px 15px",
                    cursor: "pointer",
                    fontSize: "12px",
                    fontWeight: "bold"
                  }}>
                    {u.status === "نشط" ? "إيقاف" : "تفعيل"}
                  </button>
                  <button style={{
                    background: "linear-gradient(135deg, #ff4444, #cc0000)",
                    color: "#fff",
                    border: "none",
                    borderRadius: "6px",
                    margin: "0 4px",
                    padding: "8px 15px",
                    cursor: "pointer",
                    fontSize: "12px",
                    fontWeight: "bold"
                  }}>
                    حذف
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
} 