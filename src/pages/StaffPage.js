import { useState } from "react";
import Modal from "../components/Modal";
import Notification from "../components/Notification";

export default function StaffPage() {
  const [staff, setStaff] = useState([
    { 
      id: 1, 
      name: "أحمد محمد", 
      phone: "777123456", 
      email: "ahmed@yemenstore.com", 
      role: "مدير", 
      status: "نشط", 
      dateAdded: "2024-01-15",
      permissions: ["إدارة المنتجات", "إدارة الطلبات", "إدارة الموظفين"]
    },
    { 
      id: 2, 
      name: "فاطمة علي", 
      phone: "777654321", 
      email: "fatima@yemenstore.com", 
      role: "كاشير", 
      status: "نشط", 
      dateAdded: "2024-01-20",
      permissions: ["إدارة الطلبات", "إدارة العملاء"]
    },
    { 
      id: 3, 
      name: "محمد عبدالله", 
      phone: "777987654", 
      email: "mohammed@yemenstore.com", 
      role: "موظف توصيل", 
      status: "نشط", 
      dateAdded: "2024-02-01",
      permissions: ["إدارة التوصيل"]
    },
    { 
      id: 4, 
      name: "سارة أحمد", 
      phone: "777456789", 
      email: "sara@yemenstore.com", 
      role: "مدير مخزن", 
      status: "غير نشط", 
      dateAdded: "2024-01-10",
      permissions: ["إدارة المنتجات", "إدارة المخزون"]
    }
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingStaff, setEditingStaff] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    role: "موظف",
    status: "نشط",
    permissions: []
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [notification, setNotification] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRole, setSelectedRole] = useState("الكل");
  const [selectedStatus, setSelectedStatus] = useState("الكل");
  const [selectedStaff, setSelectedStaff] = useState([]);
  const [showBulkActions, setShowBulkActions] = useState(false);

  const roles = ["الكل", "مدير", "كاشير", "موظف توصيل", "مدير مخزن", "موظف"];
  const statuses = ["الكل", "نشط", "غير نشط"];
  const allPermissions = [
    "إدارة المنتجات",
    "إدارة الطلبات", 
    "إدارة العملاء",
    "إدارة الموظفين",
    "إدارة التوصيل",
    "إدارة المخزون",
    "إدارة التقارير"
  ];

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "اسم الموظف مطلوب";
    } else if (formData.name.trim().length < 3) {
      newErrors.name = "اسم الموظف يجب أن يكون 3 أحرف على الأقل";
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

    if (!formData.role) {
      newErrors.role = "الدور مطلوب";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const showNotification = (message, type = "success") => {
    setNotification({ message, type });
  };

  const handleAddStaff = () => {
    setEditingStaff(null);
    setFormData({
      name: "",
      phone: "",
      email: "",
      role: "موظف",
      status: "نشط",
      permissions: []
    });
    setErrors({});
    setIsModalOpen(true);
  };

  const handleEditStaff = (staffMember) => {
    setEditingStaff(staffMember);
    setFormData({
      name: staffMember.name,
      phone: staffMember.phone,
      email: staffMember.email,
      role: staffMember.role,
      status: staffMember.status,
      permissions: staffMember.permissions || []
    });
    setErrors({});
    setIsModalOpen(true);
  };

  const handleDeleteStaff = (staffId) => {
    const staffMember = staff.find(s => s.id === staffId);
    if (window.confirm(`هل أنت متأكد من حذف الموظف "${staffMember.name}"؟`)) {
      setStaff(staff.filter(s => s.id !== staffId));
      showNotification(`تم حذف الموظف "${staffMember.name}" بنجاح`, "success");
    }
  };

  const handleBulkDelete = () => {
    if (window.confirm(`هل أنت متأكد من حذف ${selectedStaff.length} موظف؟`)) {
      setStaff(staff.filter(s => !selectedStaff.includes(s.id)));
      setSelectedStaff([]);
      setShowBulkActions(false);
      showNotification(`تم حذف ${selectedStaff.length} موظف بنجاح`, "success");
    }
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
      if (editingStaff) {
        // Edit existing staff
        setStaff(staff.map(s => 
          s.id === editingStaff.id 
            ? { 
                ...s, 
                name: formData.name.trim(),
                phone: formData.phone.trim(),
                email: formData.email.trim(),
                role: formData.role,
                status: formData.status,
                permissions: formData.permissions
              }
            : s
        ));
        showNotification(`تم تحديث الموظف "${formData.name}" بنجاح`, "success");
      } else {
        // Add new staff
        const newStaff = {
          id: Math.max(...staff.map(s => s.id)) + 1,
          name: formData.name.trim(),
          phone: formData.phone.trim(),
          email: formData.email.trim(),
          role: formData.role,
          status: formData.status,
          dateAdded: new Date().toISOString().split('T')[0],
          permissions: formData.permissions
        };
        setStaff([...staff, newStaff]);
        showNotification(`تم إضافة الموظف "${formData.name}" بنجاح`, "success");
      }
      
      setIsModalOpen(false);
      setErrors({});
    } catch (error) {
      console.error("خطأ في حفظ الموظف:", error);
      showNotification("حدث خطأ في حفظ الموظف. يرجى المحاولة مرة أخرى.", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePermissionChange = (permission) => {
    const newPermissions = formData.permissions.includes(permission)
      ? formData.permissions.filter(p => p !== permission)
      : [...formData.permissions, permission];
    
    setFormData({ ...formData, permissions: newPermissions });
  };

  const filteredStaff = staff.filter(staffMember => {
    const matchesSearch = staffMember.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         staffMember.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         staffMember.phone.includes(searchTerm);
    const matchesRole = selectedRole === "الكل" || staffMember.role === selectedRole;
    const matchesStatus = selectedStatus === "الكل" || staffMember.status === selectedStatus;
    
    return matchesSearch && matchesRole && matchesStatus;
  });

  const handleSelectAll = () => {
    if (selectedStaff.length === filteredStaff.length) {
      setSelectedStaff([]);
    } else {
      setSelectedStaff(filteredStaff.map(s => s.id));
    }
  };

  const handleSelectStaff = (staffId) => {
    if (selectedStaff.includes(staffId)) {
      setSelectedStaff(selectedStaff.filter(id => id !== staffId));
    } else {
      setSelectedStaff([...selectedStaff, staffId]);
    }
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
          إدارة الموظفين
        </h1>
        <button 
          onClick={handleAddStaff}
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
          إضافة موظف جديد
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
          <h3 style={{ margin: 0, fontSize: "14px", opacity: 0.8 }}>إجمالي الموظفين</h3>
          <h2 style={{ margin: "10px 0", fontSize: "32px", fontWeight: "bold" }}>
            {staff.length}
          </h2>
        </div>
        <div style={{
          background: "linear-gradient(135deg, #87CEEB, #4682B4)",
          borderRadius: "15px",
          padding: "20px",
          color: "#fff",
          textAlign: "center"
        }}>
          <h3 style={{ margin: 0, fontSize: "14px", opacity: 0.8 }}>الموظفين النشطين</h3>
          <h2 style={{ margin: "10px 0", fontSize: "32px", fontWeight: "bold" }}>
            {staff.filter(s => s.status === "نشط").length}
          </h2>
        </div>
        <div style={{
          background: "linear-gradient(135deg, #ffa500, #ff8c00)",
          borderRadius: "15px",
          padding: "20px",
          color: "#fff",
          textAlign: "center"
        }}>
          <h3 style={{ margin: 0, fontSize: "14px", opacity: 0.8 }}>المديرين</h3>
          <h2 style={{ margin: "10px 0", fontSize: "32px", fontWeight: "bold" }}>
            {staff.filter(s => s.role === "مدير").length}
          </h2>
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
          flexWrap: "wrap",
          marginBottom: "15px"
        }}>
          {/* Search Input */}
          <div style={{ flex: 1, minWidth: "200px" }}>
            <input
              type="text"
              placeholder="البحث في الموظفين..."
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

          {/* Role Filter */}
          <div style={{ minWidth: "150px" }}>
            <select
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
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
              {roles.map(role => (
                <option key={role} value={role} style={{ background: "#000", color: "#fff" }}>
                  {role}
                </option>
              ))}
            </select>
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
            {filteredStaff.length} موظف
          </div>
        </div>

        {/* Bulk Actions */}
        {selectedStaff.length > 0 && (
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
              تم تحديد {selectedStaff.length} موظف
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

      {/* Staff Table */}
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
                  checked={selectedStaff.length === filteredStaff.length && filteredStaff.length > 0}
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
                الدور
              </th>
              <th style={{
                padding: "15px",
                textAlign: "right"
              }}>
                الحالة
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
                تاريخ الإضافة
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
            {filteredStaff.map((staffMember) => (
              <tr key={staffMember.id} style={{
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
                    checked={selectedStaff.includes(staffMember.id)}
                    onChange={() => handleSelectStaff(staffMember.id)}
                    style={{ transform: "scale(1.2)" }}
                  />
                </td>
                <td style={{ padding: "15px" }}>{staffMember.name}</td>
                <td style={{ padding: "15px" }}>
                  <span style={{
                    padding: "5px 12px",
                    background: "linear-gradient(135deg, #32CD32, #87CEEB)",
                    color: "#000",
                    borderRadius: "15px",
                    fontSize: "12px",
                    fontWeight: "bold"
                  }}>
                    {staffMember.role}
                  </span>
                </td>
                <td style={{ padding: "15px" }}>
                  <span style={{
                    padding: "5px 12px",
                    background: staffMember.status === "نشط" 
                      ? "linear-gradient(135deg, #32CD32, #28a745)" 
                      : "linear-gradient(135deg, #ff4444, #cc0000)",
                    color: "#fff",
                    borderRadius: "15px",
                    fontSize: "12px",
                    fontWeight: "bold"
                  }}>
                    {staffMember.status}
                  </span>
                </td>
                <td style={{ padding: "15px" }}>{staffMember.phone}</td>
                <td style={{ padding: "15px" }}>{staffMember.email}</td>
                <td style={{ padding: "15px" }}>{staffMember.dateAdded}</td>
                <td style={{ padding: "15px" }}>
                  <button 
                    onClick={() => handleEditStaff(staffMember)}
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
                    onClick={() => handleDeleteStaff(staffMember.id)}
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

        {filteredStaff.length === 0 && (
          <div style={{
            textAlign: "center",
            padding: "40px",
            color: "#888"
          }}>
            لا يوجد موظفين تطابق البحث
          </div>
        )}
      </div>

      {/* Add/Edit Staff Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingStaff ? "تعديل الموظف" : "إضافة موظف جديد"}
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
              اسم الموظف *
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

          <div style={{ marginBottom: "20px" }}>
            <label style={{
              display: "block",
              color: "#fff",
              marginBottom: "8px",
              fontSize: "14px"
            }}>
              الدور *
            </label>
            <select
              value={formData.role}
              onChange={(e) => {
                setFormData({...formData, role: e.target.value});
                if (errors.role) {
                  setErrors({...errors, role: null});
                }
              }}
              style={{
                width: "100%",
                padding: "12px 15px",
                border: "2px solid",
                borderColor: errors.role ? "#ff4444" : "rgba(255, 255, 255, 0.3)",
                borderImage: errors.role ? "none" : "linear-gradient(135deg, #32CD32, #87CEEB) 1",
                borderRadius: "8px",
                background: "transparent",
                color: "#fff",
                fontSize: "14px",
                textAlign: "right"
              }}
            >
              {roles.filter(role => role !== "الكل").map(role => (
                <option key={role} value={role} style={{ background: "#000", color: "#fff" }}>
                  {role}
                </option>
              ))}
            </select>
            {errors.role && (
              <div style={{
                color: "#ff4444",
                fontSize: "12px",
                marginTop: "5px"
              }}>
                {errors.role}
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
              الحالة
            </label>
            <select
              value={formData.status}
              onChange={(e) => setFormData({...formData, status: e.target.value})}
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
              {statuses.filter(status => status !== "الكل").map(status => (
                <option key={status} value={status} style={{ background: "#000", color: "#fff" }}>
                  {status}
                </option>
              ))}
            </select>
          </div>

          <div style={{ marginBottom: "30px" }}>
            <label style={{
              display: "block",
              color: "#fff",
              marginBottom: "8px",
              fontSize: "14px"
            }}>
              الصلاحيات
            </label>
            <div style={{
              display: "flex",
              flexDirection: "column",
              gap: "8px",
              maxHeight: "200px",
              overflowY: "auto"
            }}>
              {allPermissions.map(permission => (
                <label key={permission} style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  color: "#fff",
                  cursor: "pointer"
                }}>
                  <input
                    type="checkbox"
                    checked={formData.permissions.includes(permission)}
                    onChange={() => handlePermissionChange(permission)}
                    style={{ transform: "scale(1.2)" }}
                  />
                  {permission}
                </label>
              ))}
            </div>
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
                editingStaff ? "تحديث الموظف" : "إضافة الموظف"
              )}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
} 