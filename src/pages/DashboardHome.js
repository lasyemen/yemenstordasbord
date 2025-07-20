import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "../components/Modal";
import ImageUpload from "../components/ImageUpload";
import Notification from "../components/Notification";

export default function DashboardHome() {
  const navigate = useNavigate();
  
  const [stats] = useState({
    totalProducts: 156,
    totalOrders: 89,
    pendingOrders: 12,
    totalSales: 45600,
    todayOrders: 8,
    todaySales: 3200
  });

  const [recentOrders] = useState([
    { id: 101, customer: "أحمد الصبري", total: 450, status: "جديد", time: "منذ 5 دقائق" },
    { id: 102, customer: "منى الجبلي", total: 320, status: "قيد التنفيذ", time: "منذ 15 دقيقة" },
    { id: 103, customer: "محمد عبدالله", total: 180, status: "مكتمل", time: "منذ ساعة" },
    { id: 104, customer: "سارة أحمد", total: 650, status: "قيد الشحن", time: "منذ ساعتين" }
  ]);

  const [notifications] = useState([
    { type: "warning", message: "5 منتجات منخفضة في المخزون", time: "منذ 10 دقائق" },
    { type: "info", message: "طلب جديد #105 من أحمد", time: "منذ 15 دقيقة" },
    { type: "success", message: "تم تسليم الطلب #98 بنجاح", time: "منذ 30 دقيقة" }
  ]);

  // إضافة المنتج مباشرة
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    stock: "",
    category: "عسل",
    image: null
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [notification, setNotification] = useState(null);

  const categories = ["عسل", "قهوة", "بهارات", "منتجات غذائية"];

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "اسم المنتج مطلوب";
    } else if (formData.name.trim().length < 3) {
      newErrors.name = "اسم المنتج يجب أن يكون 3 أحرف على الأقل";
    }

    if (!formData.price) {
      newErrors.price = "السعر مطلوب";
    } else if (parseFloat(formData.price) <= 0) {
      newErrors.price = "السعر يجب أن يكون أكبر من صفر";
    }

    if (!formData.stock) {
      newErrors.stock = "المخزون مطلوب";
    } else if (parseInt(formData.stock) < 0) {
      newErrors.stock = "المخزون يجب أن يكون صفر أو أكثر";
    }

    if (!formData.category) {
      newErrors.category = "الفئة مطلوبة";
    }

    if (!formData.image) {
      newErrors.image = "صورة المنتج مطلوبة";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const showNotification = (message, type = "success") => {
    setNotification({ message, type });
  };

  const handleAddProduct = () => {
    setFormData({
      name: "",
      price: "",
      stock: "",
      category: "عسل",
      image: null
    });
    setErrors({});
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    // محاكاة تأخير الشبكة
    await new Promise(resolve => setTimeout(resolve, 1000));

    try {
      // إضافة المنتج الجديد
      const newProduct = {
        id: Math.floor(Math.random() * 1000) + 1,
        name: formData.name.trim(),
        price: parseFloat(formData.price),
        stock: parseInt(formData.stock),
        category: formData.category,
        image: formData.image || "📦"
      };
      
      // تحديث الإحصائيات
      stats.totalProducts += 1;
      
      showNotification("تم إضافة المنتج بنجاح", "success");
      setIsModalOpen(false);
      setErrors({});
    } catch (error) {
      console.error("خطأ في حفظ المنتج:", error);
      showNotification("حدث خطأ في حفظ المنتج. يرجى المحاولة مرة أخرى.", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleImageSelect = (imageData) => {
    setFormData({ ...formData, image: imageData });
    if (errors.image) {
      setErrors({ ...errors, image: null });
    }
  };

  const handleImageError = (errorMessage) => {
    setErrors({ ...errors, image: errorMessage });
  };

  const handleViewReports = () => {
    navigate('/reports');
  };

  const handleManageOrders = () => {
    navigate('/orders');
  };

  const handleManageUsers = () => {
    navigate('/users');
  };

  return (
    <div>
      <h1 style={{
        color: "#fff",
        fontSize: "28px",
        marginBottom: "30px"
      }}>
        لوحة التحكم الرئيسية
      </h1>

      {/* Quick Add Product Button */}
      <div className="dashboard-welcome" style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "30px",
        background: "rgba(255, 255, 255, 0.05)",
        borderRadius: "15px",
        padding: "20px",
        border: "1px solid rgba(255, 255, 255, 0.1)"
      }}>
        <div>
          <h3 style={{
            color: "#fff",
            margin: 0,
            fontSize: "18px",
            marginBottom: "5px"
          }}>
            مرحباً بك في لوحة تحكم متجر اليمن
          </h3>
          <p style={{
            color: "#888",
            margin: 0,
            fontSize: "14px"
          }}>
            إدارة المنتجات، الطلبات، والمبيعات بسهولة
          </p>
        </div>
        <button 
          onClick={handleAddProduct}
          className="add-product-btn dashboard-btn"
          style={{
            background: "linear-gradient(135deg, #32CD32, #87CEEB)",
            color: "#000",
            border: "none",
            padding: "15px 30px",
            borderRadius: "12px",
            fontWeight: "bold",
            fontSize: "16px",
            cursor: "pointer",
            transition: "all 0.3s ease",
            display: "flex",
            alignItems: "center",
            gap: "10px",
            boxShadow: "0 4px 15px rgba(50, 205, 50, 0.3)",
            minWidth: "200px",
            justifyContent: "center"
          }}
          onMouseEnter={(e) => {
            e.target.style.transform = "translateY(-2px)";
            e.target.style.boxShadow = "0 6px 20px rgba(50, 205, 50, 0.4)";
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = "translateY(0)";
            e.target.style.boxShadow = "0 4px 15px rgba(50, 205, 50, 0.3)";
          }}
        >
          <span style={{ fontSize: "20px", fontWeight: "bold" }}>+</span>
          إضافة منتج جديد
        </button>
      </div>

      {/* Statistics Cards */}
      <div className="stats-grid" style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
        gap: "20px",
        marginBottom: "30px"
      }}>
        <div style={{
          background: "linear-gradient(135deg, #32CD32, #28a745)",
          borderRadius: "15px",
          padding: "25px",
          color: "#000"
        }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <h3 style={{ margin: 0, fontSize: "14px", opacity: 0.8 }}>إجمالي المنتجات</h3>
              <h2 style={{ margin: "10px 0 0 0", fontSize: "32px", fontWeight: "bold" }}>
                {stats.totalProducts}
              </h2>
            </div>
            <div style={{ fontSize: "40px" }}>📦</div>
          </div>
        </div>

        <div style={{
          background: "linear-gradient(135deg, #87CEEB, #4682B4)",
          borderRadius: "15px",
          padding: "25px",
          color: "#fff"
        }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <h3 style={{ margin: 0, fontSize: "14px", opacity: 0.8 }}>إجمالي الطلبات</h3>
              <h2 style={{ margin: "10px 0 0 0", fontSize: "32px", fontWeight: "bold" }}>
                {stats.totalOrders}
              </h2>
            </div>
            <div style={{ fontSize: "40px" }}>📋</div>
          </div>
        </div>

        <div style={{
          background: "linear-gradient(135deg, #ffa500, #ff8c00)",
          borderRadius: "15px",
          padding: "25px",
          color: "#fff"
        }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <h3 style={{ margin: 0, fontSize: "14px", opacity: 0.8 }}>الطلبات المعلقة</h3>
              <h2 style={{ margin: "10px 0 0 0", fontSize: "32px", fontWeight: "bold" }}>
                {stats.pendingOrders}
              </h2>
            </div>
            <div style={{ fontSize: "40px" }}>⏳</div>
          </div>
        </div>

        <div style={{
          background: "linear-gradient(135deg, #32CD32, #87CEEB)",
          borderRadius: "15px",
          padding: "25px",
          color: "#000"
        }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <h3 style={{ margin: 0, fontSize: "14px", opacity: 0.8 }}>إجمالي المبيعات</h3>
              <h2 style={{ margin: "10px 0 0 0", fontSize: "32px", fontWeight: "bold" }}>
                {stats.totalSales.toLocaleString()} ريال
              </h2>
            </div>
            <div style={{ fontSize: "40px" }}>💰</div>
          </div>
        </div>
      </div>

      {/* Recent Activity and Notifications */}
      <div className="activity-grid" style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))",
        gap: "20px"
      }}>
        {/* Recent Orders */}
        <div className="dashboard-card" style={{
          background: "rgba(255, 255, 255, 0.05)",
          borderRadius: "15px",
          padding: "25px",
          border: "1px solid rgba(255, 255, 255, 0.1)"
        }}>
          <h3 style={{
            color: "#fff",
            marginBottom: "20px",
            fontSize: "18px"
          }}>
            الطلبات الحديثة
          </h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
            {recentOrders.map((order) => (
              <div key={order.id} style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "15px",
                background: "rgba(255, 255, 255, 0.05)",
                borderRadius: "10px",
                border: "1px solid rgba(255, 255, 255, 0.1)"
              }}>
                <div>
                  <div style={{ color: "#fff", fontWeight: "bold" }}>
                    #{order.id} - {order.customer}
                  </div>
                  <div style={{ color: "#888", fontSize: "12px" }}>
                    {order.time}
                  </div>
                </div>
                <div style={{ textAlign: "left" }}>
                  <div style={{ color: "#32CD32", fontWeight: "bold" }}>
                    {order.total} ريال
                  </div>
                  <span style={{
                    padding: "3px 8px",
                    background: order.status === "جديد" ? "linear-gradient(135deg, #32CD32, #28a745)" :
                              order.status === "قيد التنفيذ" ? "linear-gradient(135deg, #ffa500, #ff8c00)" :
                              order.status === "مكتمل" ? "linear-gradient(135deg, #87CEEB, #4682B4)" :
                              "linear-gradient(135deg, #ff4444, #cc0000)",
                    color: "#fff",
                    borderRadius: "10px",
                    fontSize: "10px",
                    fontWeight: "bold"
                  }}>
                    {order.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Notifications */}
        <div className="dashboard-card" style={{
          background: "rgba(255, 255, 255, 0.05)",
          borderRadius: "15px",
          padding: "25px",
          border: "1px solid rgba(255, 255, 255, 0.1)"
        }}>
          <h3 style={{
            color: "#fff",
            marginBottom: "20px",
            fontSize: "18px"
          }}>
            الإشعارات
          </h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
            {notifications.map((notification, index) => (
              <div key={index} style={{
                display: "flex",
                alignItems: "center",
                gap: "15px",
                padding: "15px",
                background: "rgba(255, 255, 255, 0.05)",
                borderRadius: "10px",
                border: "1px solid rgba(255, 255, 255, 0.1)"
              }}>
                <div style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: notification.type === "warning" ? "linear-gradient(135deg, #ffa500, #ff8c00)" :
                            notification.type === "info" ? "linear-gradient(135deg, #87CEEB, #4682B4)" :
                            "linear-gradient(135deg, #32CD32, #28a745)",
                  color: "#fff",
                  fontSize: "18px"
                }}>
                  {notification.type === "warning" ? "⚠️" : 
                   notification.type === "info" ? "ℹ️" : "✅"}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ color: "#fff", fontSize: "14px" }}>
                    {notification.message}
                  </div>
                  <div style={{ color: "#888", fontSize: "12px" }}>
                    {notification.time}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="dashboard-card" style={{
        marginTop: "30px",
        background: "rgba(255, 255, 255, 0.05)",
        borderRadius: "15px",
        padding: "25px",
        border: "1px solid rgba(255, 255, 255, 0.1)"
      }}>
        <h3 style={{
          color: "#fff",
          marginBottom: "20px",
          fontSize: "18px"
        }}>
          إجراءات سريعة
        </h3>
        <div className="quick-actions-grid" style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "15px"
        }}>
          <button 
            onClick={handleAddProduct}
            className="add-product-btn"
            style={{
              background: "linear-gradient(135deg, #32CD32, #87CEEB)",
              color: "#000",
              border: "none",
              padding: "15px 20px",
              borderRadius: "12px",
              fontWeight: "bold",
              cursor: "pointer",
              fontSize: "14px",
              transition: "all 0.3s ease",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
              boxShadow: "0 4px 15px rgba(50, 205, 50, 0.3)",
              position: "relative",
              overflow: "hidden"
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = "translateY(-2px)";
              e.target.style.boxShadow = "0 6px 20px rgba(50, 205, 50, 0.4)";
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = "translateY(0)";
              e.target.style.boxShadow = "0 4px 15px rgba(50, 205, 50, 0.3)";
            }}
          >
            <span style={{ fontSize: "16px", fontWeight: "bold" }}>+</span>
            إضافة منتج جديد
          </button>
          <button 
            onClick={handleViewReports}
            style={{
              background: "linear-gradient(135deg, #87CEEB, #4682B4)",
              color: "#fff",
              border: "none",
              padding: "15px 20px",
              borderRadius: "12px",
              fontWeight: "bold",
              cursor: "pointer",
              fontSize: "14px",
              transition: "all 0.3s ease",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
              boxShadow: "0 4px 15px rgba(135, 206, 235, 0.3)"
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = "translateY(-2px)";
              e.target.style.boxShadow = "0 6px 20px rgba(135, 206, 235, 0.4)";
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = "translateY(0)";
              e.target.style.boxShadow = "0 4px 15px rgba(135, 206, 235, 0.3)";
            }}
          >
            📊 عرض التقارير
          </button>
          <button 
            onClick={handleManageOrders}
            style={{
              background: "linear-gradient(135deg, #ffa500, #ff8c00)",
              color: "#fff",
              border: "none",
              padding: "15px 20px",
              borderRadius: "12px",
              fontWeight: "bold",
              cursor: "pointer",
              fontSize: "14px",
              transition: "all 0.3s ease",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
              boxShadow: "0 4px 15px rgba(255, 165, 0, 0.3)"
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = "translateY(-2px)";
              e.target.style.boxShadow = "0 6px 20px rgba(255, 165, 0, 0.4)";
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = "translateY(0)";
              e.target.style.boxShadow = "0 4px 15px rgba(255, 165, 0, 0.3)";
            }}
          >
            📋 إدارة الطلبات
          </button>
          <button 
            onClick={handleManageUsers}
            style={{
              background: "linear-gradient(135deg, #ff4444, #cc0000)",
              color: "#fff",
              border: "none",
              padding: "15px 20px",
              borderRadius: "12px",
              fontWeight: "bold",
              cursor: "pointer",
              fontSize: "14px",
              transition: "all 0.3s ease",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
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
            👥 إدارة المستخدمين
          </button>
        </div>
      </div>

      {/* Add Product Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="إضافة منتج جديد"
      >
        <form onSubmit={handleSubmit}>
          {/* Error Message */}
          {errors.submit && (
            <div style={{
              background: "linear-gradient(135deg, #ff4444, #cc0000)",
              color: "#fff",
              padding: "12px",
              borderRadius: "8px",
              marginBottom: "20px",
              fontSize: "14px"
            }}>
              {errors.submit}
            </div>
          )}

          <div style={{ marginBottom: "20px" }}>
            <label style={{
              display: "block",
              color: "#fff",
              marginBottom: "8px",
              fontSize: "14px"
            }}>
              اسم المنتج *
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => {
                setFormData({...formData, name: e.target.value});
                if (errors.name) {
                  setErrors({...errors, name: null});
                }
              }}
              required
              style={{
                width: "100%",
                padding: "12px 15px",
                border: "2px solid",
                borderColor: errors.name ? "#ff4444" : "rgba(255, 255, 255, 0.3)",
                borderImage: errors.name ? "none" : "linear-gradient(135deg, #32CD32, #87CEEB) 1",
                borderRadius: "8px",
                background: "transparent",
                color: "#fff",
                fontSize: "14px",
                textAlign: "right"
              }}
            />
            {errors.name && (
              <div style={{
                color: "#ff4444",
                fontSize: "12px",
                marginTop: "5px"
              }}>
                {errors.name}
              </div>
            )}
          </div>

          <div style={{ marginBottom: "20px" }}>
            <label style={{
              display: "block",
              color: "#fff",
              marginBottom: "8px",
              fontSize: "14px"
            }}>
              الفئة *
            </label>
            <select
              value={formData.category}
              onChange={(e) => {
                setFormData({...formData, category: e.target.value});
                if (errors.category) {
                  setErrors({...errors, category: null});
                }
              }}
              style={{
                width: "100%",
                padding: "12px 15px",
                border: "2px solid",
                borderColor: errors.category ? "#ff4444" : "rgba(255, 255, 255, 0.3)",
                borderImage: errors.category ? "none" : "linear-gradient(135deg, #32CD32, #87CEEB) 1",
                borderRadius: "8px",
                background: "transparent",
                color: "#fff",
                fontSize: "14px",
                textAlign: "right"
              }}
            >
              {categories.map(category => (
                <option key={category} value={category} style={{ background: "#000", color: "#fff" }}>
                  {category}
                </option>
              ))}
            </select>
            {errors.category && (
              <div style={{
                color: "#ff4444",
                fontSize: "12px",
                marginTop: "5px"
              }}>
                {errors.category}
              </div>
            )}
          </div>

          <div style={{ marginBottom: "20px" }}>
            <label style={{
              display: "block",
              color: "#fff",
              marginBottom: "8px",
              fontSize: "14px"
            }}>
              السعر (ريال) *
            </label>
            <input
              type="number"
              value={formData.price}
              onChange={(e) => {
                setFormData({...formData, price: e.target.value});
                if (errors.price) {
                  setErrors({...errors, price: null});
                }
              }}
              required
              min="0"
              step="0.01"
              style={{
                width: "100%",
                padding: "12px 15px",
                border: "2px solid",
                borderColor: errors.price ? "#ff4444" : "rgba(255, 255, 255, 0.3)",
                borderImage: errors.price ? "none" : "linear-gradient(135deg, #32CD32, #87CEEB) 1",
                borderRadius: "8px",
                background: "transparent",
                color: "#fff",
                fontSize: "14px",
                textAlign: "right"
              }}
            />
            {errors.price && (
              <div style={{
                color: "#ff4444",
                fontSize: "12px",
                marginTop: "5px"
              }}>
                {errors.price}
              </div>
            )}
          </div>

          <div style={{ marginBottom: "20px" }}>
            <label style={{
              display: "block",
              color: "#fff",
              marginBottom: "8px",
              fontSize: "14px"
            }}>
              المخزون *
            </label>
            <input
              type="number"
              value={formData.stock}
              onChange={(e) => {
                setFormData({...formData, stock: e.target.value});
                if (errors.stock) {
                  setErrors({...errors, stock: null});
                }
              }}
              required
              min="0"
              style={{
                width: "100%",
                padding: "12px 15px",
                border: "2px solid",
                borderColor: errors.stock ? "#ff4444" : "rgba(255, 255, 255, 0.3)",
                borderImage: errors.stock ? "none" : "linear-gradient(135deg, #32CD32, #87CEEB) 1",
                borderRadius: "8px",
                background: "transparent",
                color: "#fff",
                fontSize: "14px",
                textAlign: "right"
              }}
            />
            {errors.stock && (
              <div style={{
                color: "#ff4444",
                fontSize: "12px",
                marginTop: "5px"
              }}>
                {errors.stock}
              </div>
            )}
          </div>

          <div style={{ marginBottom: "30px" }}>
            <label style={{
              display: "block",
              color: "#fff",
              marginBottom: "8px",
              fontSize: "14px"
            }}>
              صورة المنتج *
            </label>
            <ImageUpload 
              onImageSelect={handleImageSelect}
              onError={handleImageError}
              currentImage={formData.image}
            />
            {errors.image && (
              <div style={{
                color: "#ff4444",
                fontSize: "12px",
                marginTop: "5px"
              }}>
                {errors.image}
              </div>
            )}
          </div>

          <div style={{
            display: "flex",
            gap: "15px",
            justifyContent: "flex-end"
          }}>
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              disabled={isSubmitting}
              style={{
                background: "transparent",
                color: "#fff",
                border: "2px solid rgba(255, 255, 255, 0.2)",
                padding: "12px 25px",
                borderRadius: "8px",
                fontWeight: "bold",
                cursor: isSubmitting ? "not-allowed" : "pointer",
                fontSize: "14px",
                opacity: isSubmitting ? 0.5 : 1
              }}
            >
              إلغاء
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              style={{
                background: "linear-gradient(135deg, #32CD32, #87CEEB)",
                color: "#000",
                border: "none",
                padding: "12px 25px",
                borderRadius: "8px",
                fontWeight: "bold",
                cursor: isSubmitting ? "not-allowed" : "pointer",
                fontSize: "14px",
                opacity: isSubmitting ? 0.5 : 1,
                display: "flex",
                alignItems: "center",
                gap: "8px"
              }}
            >
              {isSubmitting ? (
                <>
                  <div style={{
                    width: "16px",
                    height: "16px",
                    border: "2px solid #000",
                    borderTop: "2px solid transparent",
                    borderRadius: "50%",
                    animation: "spin 1s linear infinite"
                  }}></div>
                  جاري الإضافة...
                </>
              ) : (
                "إضافة المنتج"
              )}
            </button>
          </div>
        </form>
      </Modal>

      {/* Notification */}
      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification(null)}
        />
      )}
    </div>
  );
} 