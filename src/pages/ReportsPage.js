import { useState } from "react";

export default function ReportsPage() {
  const [selectedReport, setSelectedReport] = useState("sales");
  const [dateRange, setDateRange] = useState("week");

  const [salesData] = useState({
    week: [1200, 1800, 2100, 1600, 2400, 1900, 2200],
    month: [45000, 52000, 48000, 61000, 58000, 67000, 72000, 68000, 75000, 82000, 78000, 89000],
    labels: {
      week: ["الأحد", "الاثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة", "السبت"],
      month: ["يناير", "فبراير", "مارس", "أبريل", "مايو", "يونيو", "يوليو", "أغسطس", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر"]
    }
  });

  const [topProducts] = useState([
    { name: "عسل دوعني", sales: 45, revenue: 2250 },
    { name: "قهوة يمنية طازجة", sales: 38, revenue: 5700 },
    { name: "أفضل العسل اليمني", sales: 32, revenue: 6400 },
    { name: "بُن يمني", sales: 28, revenue: 840 },
    { name: "بهارات يمنية", sales: 25, revenue: 1250 }
  ]);

  const [orderStats] = useState({
    total: 156,
    completed: 134,
    pending: 12,
    cancelled: 10,
    averageOrder: 320
  });

  const getCurrentData = () => {
    return salesData[dateRange];
  };

  const getCurrentLabels = () => {
    return salesData.labels[dateRange];
  };

  const maxValue = Math.max(...getCurrentData());

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
          التقارير والإحصائيات
        </h1>
        <div style={{
          display: "flex",
          gap: "15px"
        }}>
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            style={{
              padding: "10px 15px",
              border: "2px solid",
              borderImage: "linear-gradient(135deg, #32CD32, #87CEEB) 1",
              borderRadius: "8px",
              background: "transparent",
              color: "#fff",
              fontSize: "14px"
            }}
          >
            <option value="week" style={{ background: "#000", color: "#fff" }}>آخر أسبوع</option>
            <option value="month" style={{ background: "#000", color: "#fff" }}>آخر شهر</option>
          </select>
          <button style={{
            background: "linear-gradient(135deg, #32CD32, #87CEEB)",
            color: "#000",
            border: "none",
            padding: "10px 20px",
            borderRadius: "8px",
            fontWeight: "bold",
            cursor: "pointer"
          }}>
            📥 تصدير PDF
          </button>
        </div>
      </div>

      {/* Report Type Selector */}
      <div style={{
        background: "rgba(255, 255, 255, 0.05)",
        borderRadius: "15px",
        padding: "20px",
        marginBottom: "30px",
        border: "1px solid rgba(255, 255, 255, 0.1)"
      }}>
        <div style={{
          display: "flex",
          gap: "10px",
          flexWrap: "wrap"
        }}>
          {[
            { id: "sales", label: "تقرير المبيعات", icon: "💰" },
            { id: "orders", label: "تقرير الطلبات", icon: "📋" },
            { id: "products", label: "تقرير المنتجات", icon: "📦" },
            { id: "customers", label: "تقرير العملاء", icon: "👥" }
          ].map((report) => (
            <button
              key={report.id}
              onClick={() => setSelectedReport(report.id)}
              style={{
                background: selectedReport === report.id 
                  ? "linear-gradient(135deg, #32CD32, #87CEEB)" 
                  : "transparent",
                color: selectedReport === report.id ? "#000" : "#fff",
                border: "2px solid",
                borderColor: selectedReport === report.id ? "transparent" : "rgba(255, 255, 255, 0.2)",
                padding: "12px 20px",
                borderRadius: "8px",
                cursor: "pointer",
                fontWeight: "bold",
                fontSize: "14px",
                transition: "all 0.3s ease"
              }}
            >
              {report.icon} {report.label}
            </button>
          ))}
        </div>
      </div>

      {/* Sales Chart */}
      {selectedReport === "sales" && (
        <div style={{
          background: "rgba(255, 255, 255, 0.05)",
          borderRadius: "15px",
          padding: "25px",
          marginBottom: "30px",
          border: "1px solid rgba(255, 255, 255, 0.1)"
        }}>
          <h3 style={{
            color: "#fff",
            marginBottom: "20px",
            fontSize: "18px"
          }}>
            رسم بياني للمبيعات
          </h3>
          <div style={{
            display: "flex",
            alignItems: "end",
            gap: "10px",
            height: "200px",
            padding: "20px 0"
          }}>
            {getCurrentData().map((value, index) => (
              <div key={index} style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "10px"
              }}>
                <div style={{
                  width: "100%",
                  height: `${(value / maxValue) * 150}px`,
                  background: "linear-gradient(135deg, #32CD32, #87CEEB)",
                  borderRadius: "5px",
                  minHeight: "10px"
                }}></div>
                <div style={{
                  color: "#fff",
                  fontSize: "12px",
                  textAlign: "center"
                }}>
                  {getCurrentLabels()[index]}
                </div>
                <div style={{
                  color: "#32CD32",
                  fontSize: "10px",
                  fontWeight: "bold"
                }}>
                  {value.toLocaleString()} ريال
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Order Statistics */}
      {selectedReport === "orders" && (
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "20px",
          marginBottom: "30px"
        }}>
          <div style={{
            background: "linear-gradient(135deg, #32CD32, #28a745)",
            borderRadius: "15px",
            padding: "25px",
            color: "#000",
            textAlign: "center"
          }}>
            <h3 style={{ margin: 0, fontSize: "14px", opacity: 0.8 }}>إجمالي الطلبات</h3>
            <h2 style={{ margin: "10px 0", fontSize: "32px", fontWeight: "bold" }}>
              {orderStats.total}
            </h2>
          </div>
          <div style={{
            background: "linear-gradient(135deg, #87CEEB, #4682B4)",
            borderRadius: "15px",
            padding: "25px",
            color: "#fff",
            textAlign: "center"
          }}>
            <h3 style={{ margin: 0, fontSize: "14px", opacity: 0.8 }}>الطلبات المكتملة</h3>
            <h2 style={{ margin: "10px 0", fontSize: "32px", fontWeight: "bold" }}>
              {orderStats.completed}
            </h2>
          </div>
          <div style={{
            background: "linear-gradient(135deg, #ffa500, #ff8c00)",
            borderRadius: "15px",
            padding: "25px",
            color: "#fff",
            textAlign: "center"
          }}>
            <h3 style={{ margin: 0, fontSize: "14px", opacity: 0.8 }}>الطلبات المعلقة</h3>
            <h2 style={{ margin: "10px 0", fontSize: "32px", fontWeight: "bold" }}>
              {orderStats.pending}
            </h2>
          </div>
          <div style={{
            background: "linear-gradient(135deg, #ff4444, #cc0000)",
            borderRadius: "15px",
            padding: "25px",
            color: "#fff",
            textAlign: "center"
          }}>
            <h3 style={{ margin: 0, fontSize: "14px", opacity: 0.8 }}>متوسط الطلب</h3>
            <h2 style={{ margin: "10px 0", fontSize: "32px", fontWeight: "bold" }}>
              {orderStats.averageOrder} ريال
            </h2>
          </div>
        </div>
      )}

      {/* Top Products */}
      {selectedReport === "products" && (
        <div style={{
          background: "rgba(255, 255, 255, 0.05)",
          borderRadius: "15px",
          padding: "25px",
          marginBottom: "30px",
          border: "1px solid rgba(255, 255, 255, 0.1)"
        }}>
          <h3 style={{
            color: "#fff",
            marginBottom: "20px",
            fontSize: "18px"
          }}>
            أفضل المنتجات مبيعاً
          </h3>
          <div style={{
            display: "flex",
            flexDirection: "column",
            gap: "15px"
          }}>
            {topProducts.map((product, index) => (
              <div key={index} style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "15px",
                background: "rgba(255, 255, 255, 0.05)",
                borderRadius: "10px",
                border: "1px solid rgba(255, 255, 255, 0.1)"
              }}>
                <div style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "15px"
                }}>
                  <div style={{
                    width: "40px",
                    height: "40px",
                    background: "linear-gradient(135deg, #32CD32, #87CEEB)",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#000",
                    fontWeight: "bold"
                  }}>
                    #{index + 1}
                  </div>
                  <div>
                    <div style={{ color: "#fff", fontWeight: "bold" }}>
                      {product.name}
                    </div>
                    <div style={{ color: "#888", fontSize: "12px" }}>
                      {product.sales} مبيعات
                    </div>
                  </div>
                </div>
                <div style={{
                  color: "#32CD32",
                  fontWeight: "bold",
                  fontSize: "18px"
                }}>
                  {product.revenue.toLocaleString()} ريال
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Summary Cards */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
        gap: "20px"
      }}>
        <div style={{
          background: "rgba(255, 255, 255, 0.05)",
          borderRadius: "15px",
          padding: "25px",
          border: "1px solid rgba(255, 255, 255, 0.1)"
        }}>
          <h3 style={{
            color: "#fff",
            marginBottom: "15px",
            fontSize: "16px"
          }}>
            ملخص سريع
          </h3>
          <div style={{
            display: "flex",
            flexDirection: "column",
            gap: "10px"
          }}>
            <div style={{
              display: "flex",
              justifyContent: "space-between",
              color: "#fff"
            }}>
              <span>إجمالي المبيعات:</span>
              <span style={{ color: "#32CD32", fontWeight: "bold" }}>
                {getCurrentData().reduce((sum, val) => sum + val, 0).toLocaleString()} ريال
              </span>
            </div>
            <div style={{
              display: "flex",
              justifyContent: "space-between",
              color: "#fff"
            }}>
              <span>متوسط المبيعات اليومية:</span>
              <span style={{ color: "#32CD32", fontWeight: "bold" }}>
                {(getCurrentData().reduce((sum, val) => sum + val, 0) / getCurrentData().length).toFixed(0)} ريال
              </span>
            </div>
            <div style={{
              display: "flex",
              justifyContent: "space-between",
              color: "#fff"
            }}>
              <span>أعلى مبيعات:</span>
              <span style={{ color: "#32CD32", fontWeight: "bold" }}>
                {Math.max(...getCurrentData()).toLocaleString()} ريال
              </span>
            </div>
          </div>
        </div>

        <div style={{
          background: "rgba(255, 255, 255, 0.05)",
          borderRadius: "15px",
          padding: "25px",
          border: "1px solid rgba(255, 255, 255, 0.1)"
        }}>
          <h3 style={{
            color: "#fff",
            marginBottom: "15px",
            fontSize: "16px"
          }}>
            إجراءات سريعة
          </h3>
          <div style={{
            display: "flex",
            flexDirection: "column",
            gap: "10px"
          }}>
            <button style={{
              background: "linear-gradient(135deg, #32CD32, #87CEEB)",
              color: "#000",
              border: "none",
              padding: "10px",
              borderRadius: "8px",
              fontWeight: "bold",
              cursor: "pointer",
              fontSize: "12px"
            }}>
              📊 تصدير التقرير
            </button>
            <button style={{
              background: "linear-gradient(135deg, #87CEEB, #4682B4)",
              color: "#fff",
              border: "none",
              padding: "10px",
              borderRadius: "8px",
              fontWeight: "bold",
              cursor: "pointer",
              fontSize: "12px"
            }}>
              📧 إرسال بالبريد
            </button>
            <button style={{
              background: "linear-gradient(135deg, #ffa500, #ff8c00)",
              color: "#fff",
              border: "none",
              padding: "10px",
              borderRadius: "8px",
              fontWeight: "bold",
              cursor: "pointer",
              fontSize: "12px"
            }}>
              🖨️ طباعة التقرير
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 