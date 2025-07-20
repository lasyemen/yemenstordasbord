import { useState } from "react";
import Modal from "../components/Modal";
import Notification from "../components/Notification";

export default function CustomersPage() {
  const [customers, setCustomers] = useState([
    { 
      id: 1, 
      name: "أحمد الصبري", 
      phone: "777123456", 
      email: "ahmed@email.com", 
      address: "صنعاء، شارع الستين",
      registrationDate: "2024-01-15",
      totalOrders: 5,
      lastOrder: "2024-03-10",
      totalSpent: 1250
    },
    { 
      id: 2, 
      name: "منى الجبلي", 
      phone: "777654321", 
      email: "muna@email.com", 
      address: "عدن، شارع الملكة",
      registrationDate: "2024-01-20",
      totalOrders: 3,
      lastOrder: "2024-03-05",
      totalSpent: 850
    },
    { 
      id: 3, 
      name: "محمد عبدالله", 
      phone: "777987654", 
      email: "mohammed@email.com", 
      address: "تعز، شارع القاهرة",
      registrationDate: "2024-02-01",
      totalOrders: 8,
      lastOrder: "2024-03-12",
      totalSpent: 2100
    },
    { 
      id: 4, 
      name: "سارة أحمد", 
      phone: "777456789", 
      email: "sara@email.com", 
      address: "الحديدة، شارع البحر",
      registrationDate: "2024-01-10",
      totalOrders: 2,
      lastOrder: "2024-02-28",
      totalSpent: 450
    }
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    address: ""
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [notification, setNotification] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCustomers, setSelectedCustomers] = useState([]);
  const [showCustomerDetails, setShowCustomerDetails] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "اسم العميل مطلوب";
    } else if (formData.name.trim().length < 3) {
      newErrors.name = "اسم العميل يجب أن يكون 3 أحرف على الأقل";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "رقم الهاتف مطلوب";
    } else if (!/^\d{9}$/.test(formData.phone.trim())) {
      newErrors.phone = "رقم الهاتف يجب أن يكون 9 أرقام";
    }

    if (!formData.email.trim()) {
      newErrors.email = "البريد الإلكتروني مطلوب";
    } else if (!/\S+@\S+\.\S+/.test(formData.email.trim())) {
      newErrors.email = "البريد الإلكتروني غير صحيح";
    }

    if (!formData.address.trim()) {
      newErrors.address = "العنوان مطلوب";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const showNotification = (message, type = "success") => {
    setNotification({ message, type });
  };

  const handleAddCustomer = () => {
    setEditingCustomer(null);
    setFormData({
      name: "",
      phone: "",
      email: "",
      address: ""
    });
    setErrors({});
    setIsModalOpen(true);
  };

  const handleEditCustomer = (customer) => {
    setEditingCustomer(customer);
    setFormData({
      name: customer.name,
      phone: customer.phone,
      email: customer.email,
      address: customer.address
    });
    setErrors({});
    setIsModalOpen(true);
  };

  const handleDeleteCustomer = (customerId) => {
    const customer = customers.find(c => c.id === customerId);
    if (window.confirm(`هل أنت متأكد من حذف العميل "${customer.name}"؟`)) {
      setCustomers(customers.filter(c => c.id !== customerId));
      showNotification(`تم حذف العميل "${customer.name}" بنجاح`, "success");
    }
  };

  const handleBulkDelete = () => {
    if (window.confirm(`هل أنت متأكد من حذف ${selectedCustomers.length} عميل؟`)) {
      setCustomers(customers.filter(c => !selectedCustomers.includes(c.id)));
      setSelectedCustomers([]);
      showNotification(`تم حذف ${selectedCustomers.length} عميل بنجاح`, "success");
    }
  };

  const handleViewCustomerDetails = (customer) => {
    setSelectedCustomer(customer);
    setShowCustomerDetails(true);
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
      if (editingCustomer) {
        // Edit existing customer
        setCustomers(customers.map(c => 
          c.id === editingCustomer.id 
            ? { 
                ...c, 
                name: formData.name.trim(),
                phone: formData.phone.trim(),
                email: formData.email.trim(),
                address: formData.address.trim()
              }
            : c
        ));
        showNotification(`تم تحديث العميل "${formData.name}" بنجاح`, "success");
      } else {
        // Add new customer
        const newCustomer = {
          id: Math.max(...customers.map(c => c.id)) + 1,
          name: formData.name.trim(),
          phone: formData.phone.trim(),
          email: formData.email.trim(),
          address: formData.address.trim(),
          registrationDate: new Date().toISOString().split('T')[0],
          totalOrders: 0,
          lastOrder: null,
          totalSpent: 0
        };
        setCustomers([...customers, newCustomer]);
        showNotification(`تم إضافة العميل "${formData.name}" بنجاح`, "success");
      }
      
      setIsModalOpen(false);
      setErrors({});
    } catch (error) {
      console.error("خطأ في حفظ العميل:", error);
      showNotification("حدث خطأ في حفظ العميل. يرجى المحاولة مرة أخرى.", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const filteredCustomers = customers.filter(customer => {
    const matchesSearch = customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         customer.phone.includes(searchTerm) ||
                         customer.address.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesSearch;
  });

  const handleSelectAll = () => {
    if (selectedCustomers.length === filteredCustomers.length) {
      setSelectedCustomers([]);
    } else {
      setSelectedCustomers(filteredCustomers.map(c => c.id));
    }
  };

  const handleSelectCustomer = (customerId) => {
    if (selectedCustomers.includes(customerId)) {
      setSelectedCustomers(selectedCustomers.filter(id => id !== customerId));
    } else {
      setSelectedCustomers([...selectedCustomers, customerId]);
    }
  };

  // محاكاة تاريخ الطلبات
  const getCustomerOrders = (customerId) => {
    const mockOrders = [
      { id: 1, date: "2024-03-12", total: 250, status: "مكتمل" },
      { id: 2, date: "2024-03-05", total: 180, status: "مكتمل" },
      { id: 3, date: "2024-02-28", total: 320, status: "مكتمل" },
      { id: 4, date: "2024-02-15", total: 150, status: "مكتمل" },
      { id: 5, date: "2024-02-01", total: 200, status: "مكتمل" }
    ];
    return mockOrders.slice(0, Math.floor(Math.random() * 5) + 1);
  };

  return (
    <div>
      {/* Notification */}
      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification(null)}
        />
      )}

      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "30px",
        flexWrap: "wrap",
        gap: "15px"
      }}>
        <h1 style={{
          color: "#fff",
          fontSize: "28px",
          margin: 0
        }}>
          إدارة العملاء
        </h1>
        <button 
          onClick={handleAddCustomer}
          className="add-product-btn"
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
        >
          <span style={{ fontSize: "20px", fontWeight: "bold" }}>+</span>
          إضافة عميل جديد
        </button>
      </div>

      {/* Statistics Cards */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
        gap: "20px",
        marginBottom: "30px"
      }}>
        <div style={{
          background: "linear-gradient(135deg, #32CD32, #28a745)",
          borderRadius: "15px",
          padding: "20px",
          color: "#000",
          textAlign: "center"
        }}>
          <h3 style={{ margin: 0, fontSize: "14px", opacity: 0.8 }}>إجمالي العملاء</h3>
          <h2 style={{ margin: "10px 0", fontSize: "32px", fontWeight: "bold" }}>
            {customers.length}
          </h2>
        </div>
        <div style={{
          background: "linear-gradient(135deg, #87CEEB, #4682B4)",
          borderRadius: "15px",
          padding: "20px",
          color: "#fff",
          textAlign: "center"
        }}>
          <h3 style={{ margin: 0, fontSize: "14px", opacity: 0.8 }}>إجمالي الطلبات</h3>
          <h2 style={{ margin: "10px 0", fontSize: "32px", fontWeight: "bold" }}>
            {customers.reduce((sum, c) => sum + c.totalOrders, 0)}
          </h2>
        </div>
        <div style={{
          background: "linear-gradient(135deg, #ffa500, #ff8c00)",
          borderRadius: "15px",
          padding: "20px",
          color: "#fff",
          textAlign: "center"
        }}>
          <h3 style={{ margin: 0, fontSize: "14px", opacity: 0.8 }}>إجمالي المبيعات</h3>
          <h2 style={{ margin: "10px 0", fontSize: "32px", fontWeight: "bold" }}>
            {customers.reduce((sum, c) => sum + c.totalSpent, 0).toLocaleString()} ريال
          </h2>
        </div>
      </div>

      {/* Search Section */}
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
          flexWrap: "wrap",
          marginBottom: "15px"
        }}>
          {/* Search Input */}
          <div style={{ flex: 1, minWidth: "200px" }}>
            <input
              type="text"
              placeholder="البحث في العملاء..."
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

          {/* Results Count */}
          <div style={{
            display: "flex",
            alignItems: "center",
            color: "#32CD32",
            fontSize: "14px",
            fontWeight: "bold"
          }}>
            {filteredCustomers.length} عميل
          </div>
        </div>

        {/* Bulk Actions */}
        {selectedCustomers.length > 0 && (
          <div style={{
            display: "flex",
            gap: "10px",
            alignItems: "center",
            padding: "10px",
            background: "rgba(50, 205, 50, 0.1)",
            borderRadius: "8px",
            border: "1px solid rgba(50, 205, 50, 0.3)"
          }}>
            <span style={{ color: "#32CD32", fontSize: "14px" }}>
              تم تحديد {selectedCustomers.length} عميل
            </span>
            <button
              onClick={handleBulkDelete}
              style={{
                background: "linear-gradient(135deg, #ff4444, #cc0000)",
                color: "#fff",
                border: "none",
                padding: "8px 15px",
                borderRadius: "6px",
                cursor: "pointer",
                fontSize: "12px",
                fontWeight: "bold"
              }}
            >
              حذف المحددين
            </button>
          </div>
        )}
      </div>

      {/* Customers Table */}
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
                textAlign: "center",
                borderRadius: "8px 0 0 8px"
              }}>
                <input
                  type="checkbox"
                  checked={selectedCustomers.length === filteredCustomers.length && filteredCustomers.length > 0}
                  onChange={handleSelectAll}
                  style={{ transform: "scale(1.2)" }}
                />
              </th>
              <th style={{
                padding: "15px",
                textAlign: "right"
              }}>
                الاسم
              </th>
              <th style={{
                padding: "15px",
                textAlign: "right"
              }}>
                الهاتف
              </th>
              <th style={{
                padding: "15px",
                textAlign: "right"
              }}>
                البريد الإلكتروني
              </th>
              <th style={{
                padding: "15px",
                textAlign: "right"
              }}>
                عدد الطلبات
              </th>
              <th style={{
                padding: "15px",
                textAlign: "right"
              }}>
                إجمالي المشتريات
              </th>
              <th style={{
                padding: "15px",
                textAlign: "right"
              }}>
                تاريخ التسجيل
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
            {filteredCustomers.map((customer) => (
              <tr key={customer.id} style={{
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
                <td style={{ padding: "15px", textAlign: "center" }}>
                  <input
                    type="checkbox"
                    checked={selectedCustomers.includes(customer.id)}
                    onChange={() => handleSelectCustomer(customer.id)}
                    style={{ transform: "scale(1.2)" }}
                  />
                </td>
                <td style={{ padding: "15px" }}>{customer.name}</td>
                <td style={{ padding: "15px" }}>{customer.phone}</td>
                <td style={{ padding: "15px" }}>{customer.email}</td>
                <td style={{ padding: "15px" }}>
                  <span style={{
                    padding: "5px 12px",
                    background: "linear-gradient(135deg, #32CD32, #87CEEB)",
                    color: "#000",
                    borderRadius: "15px",
                    fontSize: "12px",
                    fontWeight: "bold"
                  }}>
                    {customer.totalOrders}
                  </span>
                </td>
                <td style={{ padding: "15px" }}>
                  <span style={{
                    color: "#32CD32",
                    fontWeight: "bold"
                  }}>
                    {customer.totalSpent.toLocaleString()} ريال
                  </span>
                </td>
                <td style={{ padding: "15px" }}>{customer.registrationDate}</td>
                <td style={{ padding: "15px" }}>
                  <button 
                    onClick={() => handleViewCustomerDetails(customer)}
                    style={{
                      background: "linear-gradient(135deg, #87CEEB, #4682B4)",
                      color: "#fff",
                      border: "none",
                      borderRadius: "6px",
                      margin: "0 4px",
                      padding: "8px 15px",
                      cursor: "pointer",
                      fontSize: "12px",
                      fontWeight: "bold"
                    }}
                  >
                    تفاصيل
                  </button>
                  <button 
                    onClick={() => handleEditCustomer(customer)}
                    style={{
                      background: "linear-gradient(135deg, #32CD32, #87CEEB)",
                      color: "#000",
                      border: "none",
                      borderRadius: "6px",
                      margin: "0 4px",
                      padding: "8px 15px",
                      cursor: "pointer",
                      fontSize: "12px",
                      fontWeight: "bold"
                    }}
                  >
                    تعديل
                  </button>
                  <button 
                    onClick={() => handleDeleteCustomer(customer.id)}
                    style={{
                      background: "linear-gradient(135deg, #ff4444, #cc0000)",
                      color: "#fff",
                      border: "none",
                      borderRadius: "6px",
                      margin: "0 4px",
                      padding: "8px 15px",
                      cursor: "pointer",
                      fontSize: "12px",
                      fontWeight: "bold"
                    }}
                  >
                    حذف
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredCustomers.length === 0 && (
          <div style={{
            textAlign: "center",
            padding: "40px",
            color: "#888"
          }}>
            لا يوجد عملاء تطابق البحث
          </div>
        )}
      </div>

      {/* Add/Edit Customer Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingCustomer ? "تعديل العميل" : "إضافة عميل جديد"}
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
              اسم العميل *
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
              رقم الهاتف *
            </label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => {
                setFormData({...formData, phone: e.target.value});
                if (errors.phone) {
                  setErrors({...errors, phone: null});
                }
              }}
              required
              style={{
                width: "100%",
                padding: "12px 15px",
                border: "2px solid",
                borderColor: errors.phone ? "#ff4444" : "rgba(255, 255, 255, 0.3)",
                borderImage: errors.phone ? "none" : "linear-gradient(135deg, #32CD32, #87CEEB) 1",
                borderRadius: "8px",
                background: "transparent",
                color: "#fff",
                fontSize: "14px",
                textAlign: "right"
              }}
            />
            {errors.phone && (
              <div style={{
                color: "#ff4444",
                fontSize: "12px",
                marginTop: "5px"
              }}>
                {errors.phone}
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
              البريد الإلكتروني *
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => {
                setFormData({...formData, email: e.target.value});
                if (errors.email) {
                  setErrors({...errors, email: null});
                }
              }}
              required
              style={{
                width: "100%",
                padding: "12px 15px",
                border: "2px solid",
                borderColor: errors.email ? "#ff4444" : "rgba(255, 255, 255, 0.3)",
                borderImage: errors.email ? "none" : "linear-gradient(135deg, #32CD32, #87CEEB) 1",
                borderRadius: "8px",
                background: "transparent",
                color: "#fff",
                fontSize: "14px",
                textAlign: "right"
              }}
            />
            {errors.email && (
              <div style={{
                color: "#ff4444",
                fontSize: "12px",
                marginTop: "5px"
              }}>
                {errors.email}
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
              العنوان *
            </label>
            <textarea
              value={formData.address}
              onChange={(e) => {
                setFormData({...formData, address: e.target.value});
                if (errors.address) {
                  setErrors({...errors, address: null});
                }
              }}
              required
              rows="3"
              style={{
                width: "100%",
                padding: "12px 15px",
                border: "2px solid",
                borderColor: errors.address ? "#ff4444" : "rgba(255, 255, 255, 0.3)",
                borderImage: errors.address ? "none" : "linear-gradient(135deg, #32CD32, #87CEEB) 1",
                borderRadius: "8px",
                background: "transparent",
                color: "#fff",
                fontSize: "14px",
                textAlign: "right",
                resize: "vertical"
              }}
            />
            {errors.address && (
              <div style={{
                color: "#ff4444",
                fontSize: "12px",
                marginTop: "5px"
              }}>
                {errors.address}
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
                  جاري الحفظ...
                </>
              ) : (
                editingCustomer ? "تحديث العميل" : "إضافة العميل"
              )}
            </button>
          </div>
        </form>
      </Modal>

      {/* Customer Details Modal */}
      <Modal
        isOpen={showCustomerDetails}
        onClose={() => setShowCustomerDetails(false)}
        title={`تفاصيل العميل - ${selectedCustomer?.name}`}
      >
        {selectedCustomer && (
          <div>
            <div style={{
              background: "rgba(255, 255, 255, 0.05)",
              borderRadius: "10px",
              padding: "15px",
              marginBottom: "20px",
              border: "1px solid rgba(255, 255, 255, 0.1)"
            }}>
              <h4 style={{ color: "#fff", margin: "0 0 10px 0" }}>
                معلومات العميل
              </h4>
              <div style={{ color: "#888", fontSize: "14px" }}>
                <p style={{ margin: "5px 0" }}><strong>الاسم:</strong> {selectedCustomer.name}</p>
                <p style={{ margin: "5px 0" }}><strong>الهاتف:</strong> {selectedCustomer.phone}</p>
                <p style={{ margin: "5px 0" }}><strong>البريد الإلكتروني:</strong> {selectedCustomer.email}</p>
                <p style={{ margin: "5px 0" }}><strong>العنوان:</strong> {selectedCustomer.address}</p>
                <p style={{ margin: "5px 0" }}><strong>تاريخ التسجيل:</strong> {selectedCustomer.registrationDate}</p>
              </div>
            </div>

            <div style={{
              background: "rgba(255, 255, 255, 0.05)",
              borderRadius: "10px",
              padding: "15px",
              marginBottom: "20px",
              border: "1px solid rgba(255, 255, 255, 0.1)"
            }}>
              <h4 style={{ color: "#fff", margin: "0 0 15px 0" }}>
                إحصائيات العميل
              </h4>
              <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
                gap: "15px"
              }}>
                <div style={{
                  background: "rgba(50, 205, 50, 0.1)",
                  padding: "10px",
                  borderRadius: "8px",
                  textAlign: "center"
                }}>
                  <div style={{ color: "#32CD32", fontSize: "18px", fontWeight: "bold" }}>
                    {selectedCustomer.totalOrders}
                  </div>
                  <div style={{ color: "#888", fontSize: "12px" }}>
                    إجمالي الطلبات
                  </div>
                </div>
                <div style={{
                  background: "rgba(135, 206, 235, 0.1)",
                  padding: "10px",
                  borderRadius: "8px",
                  textAlign: "center"
                }}>
                  <div style={{ color: "#87CEEB", fontSize: "18px", fontWeight: "bold" }}>
                    {selectedCustomer.totalSpent.toLocaleString()} ريال
                  </div>
                  <div style={{ color: "#888", fontSize: "12px" }}>
                    إجمالي المشتريات
                  </div>
                </div>
                <div style={{
                  background: "rgba(255, 165, 0, 0.1)",
                  padding: "10px",
                  borderRadius: "8px",
                  textAlign: "center"
                }}>
                  <div style={{ color: "#ffa500", fontSize: "18px", fontWeight: "bold" }}>
                    {selectedCustomer.lastOrder || "لا يوجد"}
                  </div>
                  <div style={{ color: "#888", fontSize: "12px" }}>
                    آخر طلب
                  </div>
                </div>
              </div>
            </div>

            <div style={{
              background: "rgba(255, 255, 255, 0.05)",
              borderRadius: "10px",
              padding: "15px",
              border: "1px solid rgba(255, 255, 255, 0.1)"
            }}>
              <h4 style={{ color: "#fff", margin: "0 0 15px 0" }}>
                تاريخ الطلبات
              </h4>
              <div style={{
                display: "flex",
                flexDirection: "column",
                gap: "10px"
              }}>
                {getCustomerOrders(selectedCustomer.id).map((order) => (
                  <div key={order.id} style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "10px",
                    background: "rgba(255, 255, 255, 0.05)",
                    borderRadius: "8px",
                    border: "1px solid rgba(255, 255, 255, 0.1)"
                  }}>
                    <div>
                      <div style={{ color: "#fff", fontWeight: "bold" }}>
                        طلب #{order.id}
                      </div>
                      <div style={{ color: "#888", fontSize: "12px" }}>
                        {order.date}
                      </div>
                    </div>
                    <div style={{
                      color: "#32CD32",
                      fontWeight: "bold"
                    }}>
                      {order.total} ريال
                    </div>
                    <span style={{
                      padding: "3px 8px",
                      background: "linear-gradient(135deg, #32CD32, #28a745)",
                      color: "#fff",
                      borderRadius: "10px",
                      fontSize: "10px",
                      fontWeight: "bold"
                    }}>
                      {order.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div style={{
              display: "flex",
              justifyContent: "flex-end",
              marginTop: "20px"
            }}>
              <button
                onClick={() => setShowCustomerDetails(false)}
                style={{
                  background: "linear-gradient(135deg, #32CD32, #87CEEB)",
                  color: "#000",
                  border: "none",
                  padding: "10px 20px",
                  borderRadius: "8px",
                  fontWeight: "bold",
                  cursor: "pointer",
                  fontSize: "14px"
                }}
              >
                إغلاق
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
} 