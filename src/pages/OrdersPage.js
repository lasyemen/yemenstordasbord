import { useState } from "react";

export default function OrdersPage() {
  const [orders] = useState([
    { id: 101, customer: "أحمد", total: 120, status: "جديد" },
    { id: 102, customer: "منى", total: 80, status: "قيد التنفيذ" },
    { id: 103, customer: "محمد", total: 410, status: "مكتمل" },
    { id: 104, customer: "سارة", total: 200, status: "قيد الشحن" },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("الكل");

  const statuses = ["الكل", "جديد", "قيد التنفيذ", "مكتمل", "قيد الشحن"];

  const getStatusColor = (status) => {
    switch (status) {
      case "جديد":
        return "linear-gradient(135deg, #32CD32, #28a745)";
      case "قيد التنفيذ":
        return "linear-gradient(135deg, #ffa500, #ff8c00)";
      case "مكتمل":
        return "linear-gradient(135deg, #87CEEB, #4682B4)";
      case "قيد الشحن":
        return "linear-gradient(135deg, #ffa500, #ff8c00)";
      default:
        return "linear-gradient(135deg, #ff4444, #cc0000)";
    }
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.id.toString().includes(searchTerm);
    const matchesStatus = selectedStatus === "الكل" || order.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

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
          الطلبات
        </h1>
        <div style={{
          display: "flex",
          gap: "15px",
          color: "#fff"
        }}>
          <span>إجمالي الطلبات: {orders.length}</span>
          <span>إجمالي المبيعات: {orders.reduce((sum, order) => sum + order.total, 0)} ريال</span>
        </div>
      </div>

      {/* Search and Filter Section */}
      <div style={{
        background: "rgba(255, 255, 255, 0.05)",
        borderRadius: "15px",
        padding: "20px",
        marginBottom: "20px",
        border: "1px solid rgba(255, 255, 255, 0.1)"
      }}>
        <div style={{
          display: "flex",
          gap: "15px",
          flexWrap: "wrap"
        }}>
          {/* Search Input */}
          <div style={{ flex: 1, minWidth: "200px" }}>
            <input
              type="text"
              placeholder="البحث بالعميل أو رقم الطلب..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                width: "100%",
                padding: "12px 15px",
                border: "2px solid",
                borderImage: "linear-gradient(135deg, #32CD32, #87CEEB) 1",
                borderRadius: "8px",
                background: "transparent",
                color: "#fff",
                fontSize: "14px",
                textAlign: "right"
              }}
            />
          </div>

          {/* Status Filter */}
          <div style={{ minWidth: "150px" }}>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              style={{
                width: "100%",
                padding: "12px 15px",
                border: "2px solid",
                borderImage: "linear-gradient(135deg, #32CD32, #87CEEB) 1",
                borderRadius: "8px",
                background: "transparent",
                color: "#fff",
                fontSize: "14px",
                textAlign: "right"
              }}
            >
              {statuses.map(status => (
                <option key={status} value={status} style={{ background: "#000", color: "#fff" }}>
                  {status}
                </option>
              ))}
            </select>
          </div>

          {/* Results Count */}
          <div style={{
            display: "flex",
            alignItems: "center",
            color: "#32CD32",
            fontSize: "14px",
            fontWeight: "bold"
          }}>
            {filteredOrders.length} طلب
          </div>
        </div>
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
                رقم الطلب
              </th>
              <th style={{
                padding: "15px",
                textAlign: "right"
              }}>
                العميل
              </th>
              <th style={{
                padding: "15px",
                textAlign: "right"
              }}>
                الإجمالي
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
            {filteredOrders.map((o, index) => (
              <tr key={o.id} style={{
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
                <td style={{ padding: "15px" }}>
                  <span style={{
                    color: "#32CD32",
                    fontWeight: "bold"
                  }}>
                    #{o.id}
                  </span>
                </td>
                <td style={{ padding: "15px" }}>{o.customer}</td>
                <td style={{ padding: "15px" }}>
                  <span style={{
                    color: "#32CD32",
                    fontWeight: "bold"
                  }}>
                    {o.total} ريال
                  </span>
                </td>
                <td style={{ padding: "15px" }}>
                  <span style={{
                    padding: "5px 12px",
                    background: getStatusColor(o.status),
                    color: "#fff",
                    borderRadius: "15px",
                    fontSize: "12px",
                    fontWeight: "bold"
                  }}>
                    {o.status}
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
                    تفاصيل
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

        {filteredOrders.length === 0 && (
          <div style={{
            textAlign: "center",
            padding: "40px",
            color: "#888"
          }}>
            لا توجد طلبات تطابق البحث
          </div>
        )}
      </div>
    </div>
  );
} 