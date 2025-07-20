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

      {/* Page Header */}
      <div className="page-header d-flex justify-between align-center flex-wrap gap-15 mb-30">
        <h1 style={{
          color: "#fff",
          fontSize: "28px",
          margin: 0,
          fontWeight: "700"
        }}>
          إدارة الموظفين
        </h1>
        <button 
          onClick={handleAddStaff}
          className="modern-button"
          style={{
            minWidth: "200px",
            justifyContent: "center"
          }}
        >
          <span style={{ fontSize: "20px", fontWeight: "bold" }}>+</span>
          إضافة موظف جديد
        </button>
      </div>

      {/* Statistics Cards */}
      <div className="responsive-grid mb-30">
        <div className="modern-card">
          <h3 style={{ margin: "0 0 10px 0", fontSize: "14px", opacity: 0.8 }}>إجمالي الموظفين</h3>
          <h2 style={{ margin: "10px 0", fontSize: "32px", fontWeight: "bold", color: "#32CD32" }}>
            {staff.length}
          </h2>
        </div>
        <div className="modern-card">
          <h3 style={{ margin: "0 0 10px 0", fontSize: "14px", opacity: 0.8 }}>الموظفين النشطين</h3>
          <h2 style={{ margin: "10px 0", fontSize: "32px", fontWeight: "bold", color: "#87CEEB" }}>
            {staff.filter(s => s.status === "نشط").length}
          </h2>
        </div>
        <div className="modern-card">
          <h3 style={{ margin: "0 0 10px 0", fontSize: "14px", opacity: 0.8 }}>المديرين</h3>
          <h2 style={{ margin: "10px 0", fontSize: "32px", fontWeight: "bold", color: "#ffa500" }}>
            {staff.filter(s => s.role === "مدير").length}
          </h2>
        </div>
      </div>

      {/* Search and Filter Section */}
      <div className="modern-card mb-20">
        <div className="search-filter-container">
          {/* Search Input */}
          <div style={{ flex: 1, minWidth: "200px" }}>
            <input
              type="text"
              placeholder="البحث في الموظفين..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="modern-input"
            />
          </div>

          {/* Role Filter */}
          <div style={{ minWidth: "150px" }}>
            <select
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
              className="modern-input"
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
              className="modern-input"
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
            border: "1px solid rgba(50, 205, 50, 0.3)",
            marginTop: "15px"
          }}>
            <span style={{ color: "#32CD32", fontSize: "14px" }}>
              تم تحديد {selectedStaff.length} موظف
            </span>
            <button
              onClick={handleBulkDelete}
              className="modern-button danger"
              style={{ padding: "8px 15px", fontSize: "12px" }}
            >
              حذف المحددين
            </button>
          </div>
        )}
      </div>

      {/* Staff Table */}
      <div className="modern-card">
        {filteredStaff.length > 0 ? (
          <div className="table-responsive">
            <table className="modern-table">
              <thead>
                <tr>
                  <th style={{ textAlign: "center" }}>
                    <input
                      type="checkbox"
                      checked={selectedStaff.length === filteredStaff.length && filteredStaff.length > 0}
                      onChange={handleSelectAll}
                      style={{ transform: "scale(1.2)" }}
                    />
                  </th>
                  <th>الاسم</th>
                  <th>الدور</th>
                  <th>الحالة</th>
                  <th>الهاتف</th>
                  <th>البريد الإلكتروني</th>
                  <th>تاريخ الإضافة</th>
                  <th>إجراءات</th>
                </tr>
              </thead>
              <tbody>
                {filteredStaff.map((staffMember) => (
                  <tr key={staffMember.id}>
                    <td style={{ textAlign: "center" }}>
                      <input
                        type="checkbox"
                        checked={selectedStaff.includes(staffMember.id)}
                        onChange={() => handleSelectStaff(staffMember.id)}
                        style={{ transform: "scale(1.2)" }}
                      />
                    </td>
                    <td style={{ fontWeight: "600" }}>{staffMember.name}</td>
                    <td>
                      <span className="status-badge active">
                        {staffMember.role}
                      </span>
                    </td>
                    <td>
                      <span className={`status-badge ${staffMember.status === "نشط" ? "active" : "inactive"}`}>
                        {staffMember.status}
                      </span>
                    </td>
                    <td>{staffMember.phone}</td>
                    <td>{staffMember.email}</td>
                    <td>{staffMember.dateAdded}</td>
                    <td>
                      <div className="action-buttons-container">
                        <button 
                          onClick={() => handleEditStaff(staffMember)}
                          className="modern-button info"
                          style={{ padding: "8px 12px", fontSize: "12px" }}
                        >
                          ✏️ تعديل
                        </button>
                        <button 
                          onClick={() => handleDeleteStaff(staffMember.id)}
                          className="modern-button danger"
                          style={{ padding: "8px 12px", fontSize: "12px" }}
                        >
                          🗑️ حذف
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="empty-state">
            <div className="empty-state-icon">👥</div>
            <div className="empty-state-title">لا يوجد موظفين</div>
            <div className="empty-state-description">
              {searchTerm || selectedRole !== "الكل" || selectedStatus !== "الكل"
                ? "لا يوجد موظفين تطابق البحث" 
                : "ابدأ بإضافة موظفين جدد إلى فريقك"
              }
            </div>
            {!searchTerm && selectedRole === "الكل" && selectedStatus === "الكل" && (
              <button 
                onClick={handleAddStaff}
                className="modern-button mt-20"
              >
                إضافة موظف جديد
              </button>
            )}
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