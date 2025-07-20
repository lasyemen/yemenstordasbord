import { useState } from "react";
import Modal from "../components/Modal";
import Notification from "../components/Notification";

export default function OrdersPage() {
  const [orders, setOrders] = useState([
    {
      id: 1,
      orderNumber: "ORD-2024-001",
      customerName: "أحمد الصبري",
      customerPhone: "777123456",
      customerEmail: "ahmed@email.com",
      totalAmount: 250,
      status: "جديد",
      orderDate: "2024-03-15",
      deliveryAddress: "صنعاء، شارع الستين، رقم 123",
      paymentMethod: "نقداً عند التوصيل",
      paymentStatus: "مدفوع",
      items: [
        { id: 1, name: "عسل دوعني", quantity: 2, price: 50, total: 100 },
        { id: 2, name: "بُن يمني", quantity: 1, price: 30, total: 30 },
        { id: 3, name: "قهوة يمنية طازجة", quantity: 1, price: 120, total: 120 }
      ],
      timeline: [
        { status: "جديد", date: "2024-03-15 10:30", description: "تم استلام الطلب" },
        { status: "قيد المعالجة", date: "2024-03-15 11:00", description: "تم تأكيد الطلب" }
      ]
    },
    {
      id: 2,
      orderNumber: "ORD-2024-002",
      customerName: "منى الجبلي",
      customerPhone: "777654321",
      customerEmail: "muna@email.com",
      totalAmount: 180,
      status: "قيد المعالجة",
      orderDate: "2024-03-14",
      deliveryAddress: "عدن، شارع الملكة، رقم 456",
      paymentMethod: "بطاقة ائتمان",
      paymentStatus: "مدفوع",
      items: [
        { id: 1, name: "أفضل العسل اليمني", quantity: 1, price: 180, total: 180 }
      ],
      timeline: [
        { status: "جديد", date: "2024-03-14 14:20", description: "تم استلام الطلب" },
        { status: "قيد المعالجة", date: "2024-03-14 15:00", description: "تم تأكيد الطلب" },
        { status: "قيد المعالجة", date: "2024-03-15 09:00", description: "جاري تحضير الطلب" }
      ]
    },
    {
      id: 3,
      orderNumber: "ORD-2024-003",
      customerName: "محمد عبدالله",
      customerPhone: "777987654",
      customerEmail: "mohammed@email.com",
      totalAmount: 320,
      status: "تم التوصيل",
      orderDate: "2024-03-13",
      deliveryAddress: "تعز، شارع القاهرة، رقم 789",
      paymentMethod: "نقداً عند التوصيل",
      paymentStatus: "مدفوع",
      items: [
        { id: 1, name: "عسل دوعني", quantity: 3, price: 50, total: 150 },
        { id: 2, name: "قهوة يمنية طازجة", quantity: 1, price: 120, total: 120 },
        { id: 3, name: "بهارات يمنية", quantity: 1, price: 50, total: 50 }
      ],
      timeline: [
        { status: "جديد", date: "2024-03-13 16:45", description: "تم استلام الطلب" },
        { status: "قيد المعالجة", date: "2024-03-13 17:30", description: "تم تأكيد الطلب" },
        { status: "جاهز للتوصيل", date: "2024-03-14 10:00", description: "تم تحضير الطلب" },
        { status: "تم التوصيل", date: "2024-03-14 14:30", description: "تم توصيل الطلب" }
      ]
    },
    {
      id: 4,
      orderNumber: "ORD-2024-004",
      customerName: "سارة أحمد",
      customerPhone: "777456789",
      customerEmail: "sara@email.com",
      totalAmount: 450,
      status: "ملغي",
      orderDate: "2024-03-12",
      deliveryAddress: "الحديدة، شارع البحر، رقم 321",
      paymentMethod: "بطاقة ائتمان",
      paymentStatus: "مسترد",
      items: [
        { id: 1, name: "أفضل العسل اليمني", quantity: 2, price: 200, total: 400 },
        { id: 2, name: "بهارات يمنية", quantity: 1, price: 50, total: 50 }
      ],
      timeline: [
        { status: "جديد", date: "2024-03-12 12:15", description: "تم استلام الطلب" },
        { status: "قيد المعالجة", date: "2024-03-12 13:00", description: "تم تأكيد الطلب" },
        { status: "ملغي", date: "2024-03-12 15:30", description: "تم إلغاء الطلب من العميل" }
      ]
    }
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("الكل");
  const [selectedDateRange, setSelectedDateRange] = useState("الكل");
  const [selectedOrders, setSelectedOrders] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [notification, setNotification] = useState(null);
  const [isExporting, setIsExporting] = useState(false);

  const statuses = ["الكل", "جديد", "قيد المعالجة", "جاهز للتوصيل", "تم التوصيل", "ملغي"];
  const dateRanges = ["الكل", "اليوم", "أمس", "آخر 7 أيام", "آخر 30 يوم"];

  const getStatusColor = (status) => {
    switch (status) {
      case "جديد": return "pending";
      case "قيد المعالجة": return "info";
      case "جاهز للتوصيل": return "warning";
      case "تم التوصيل": return "active";
      case "ملغي": return "inactive";
      default: return "pending";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "جديد": return "🆕";
      case "قيد المعالجة": return "⚙️";
      case "جاهز للتوصيل": return "📦";
      case "تم التوصيل": return "✅";
      case "ملغي": return "❌";
      default: return "🆕";
    }
  };

  const getPaymentStatusColor = (status) => {
    return status === "مدفوع" ? "active" : "inactive";
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch = 
      order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customerPhone.includes(searchTerm);
    
    const matchesStatus = selectedStatus === "الكل" || order.status === selectedStatus;
    
    let matchesDate = true;
    if (selectedDateRange !== "الكل") {
      const orderDate = new Date(order.orderDate);
      const today = new Date();
      const yesterday = new Date(today);
      yesterday.setDate(yesterday.getDate() - 1);
      
      switch (selectedDateRange) {
        case "اليوم":
          matchesDate = orderDate.toDateString() === today.toDateString();
          break;
        case "أمس":
          matchesDate = orderDate.toDateString() === yesterday.toDateString();
          break;
        case "آخر 7 أيام":
          const weekAgo = new Date(today);
          weekAgo.setDate(weekAgo.getDate() - 7);
          matchesDate = orderDate >= weekAgo;
          break;
        case "آخر 30 يوم":
          const monthAgo = new Date(today);
          monthAgo.setDate(monthAgo.getDate() - 30);
          matchesDate = orderDate >= monthAgo;
          break;
      }
    }
    
    return matchesSearch && matchesStatus && matchesDate;
  });

  const handleViewOrderDetails = (order) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  const handleStatusChange = (orderId, newStatus) => {
    setOrders(orders.map(order => 
      order.id === orderId 
        ? { 
            ...order, 
            status: newStatus,
            timeline: [
              ...order.timeline,
              { 
                status: newStatus, 
                date: new Date().toLocaleString('ar-SA'),
                description: `تم تغيير الحالة إلى ${newStatus}`
              }
            ]
          }
        : order
    ));
    showNotification(`تم تحديث حالة الطلب ${orderId} إلى ${newStatus}`, "success");
  };

  const handleBulkStatusChange = (newStatus) => {
    setOrders(orders.map(order => 
      selectedOrders.includes(order.id)
        ? { 
            ...order, 
            status: newStatus,
            timeline: [
              ...order.timeline,
              { 
                status: newStatus, 
                date: new Date().toLocaleString('ar-SA'),
                description: `تم تغيير الحالة إلى ${newStatus}`
              }
            ]
          }
        : order
    ));
    setSelectedOrders([]);
    showNotification(`تم تحديث حالة ${selectedOrders.length} طلب إلى ${newStatus}`, "success");
  };

  const handleSelectAll = () => {
    if (selectedOrders.length === filteredOrders.length) {
      setSelectedOrders([]);
    } else {
      setSelectedOrders(filteredOrders.map(o => o.id));
    }
  };

  const handleSelectOrder = (orderId) => {
    if (selectedOrders.includes(orderId)) {
      setSelectedOrders(selectedOrders.filter(id => id !== orderId));
    } else {
      setSelectedOrders([...selectedOrders, orderId]);
    }
  };

  const showNotification = (message, type = "success") => {
    setNotification({ message, type });
  };

  const handleExportOrders = async () => {
    setIsExporting(true);
    // محاكاة عملية التصدير
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsExporting(false);
    showNotification("تم تصدير الطلبات بنجاح", "success");
  };

  const handlePrintInvoice = (order) => {
    // محاكاة طباعة الفاتورة
    showNotification("جاري إعداد الفاتورة للطباعة...", "info");
    setTimeout(() => {
      showNotification("تم إرسال الفاتورة للطباعة", "success");
    }, 1500);
  };

  const getTotalStats = () => {
    const totalOrders = orders.length;
    const newOrders = orders.filter(o => o.status === "جديد").length;
    const processingOrders = orders.filter(o => o.status === "قيد المعالجة").length;
    const deliveredOrders = orders.filter(o => o.status === "تم التوصيل").length;
    const totalRevenue = orders.filter(o => o.status !== "ملغي").reduce((sum, o) => sum + o.totalAmount, 0);
    
    return { totalOrders, newOrders, processingOrders, deliveredOrders, totalRevenue };
  };

  const stats = getTotalStats();

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
          إدارة الطلبات
        </h1>
        <div className="d-flex gap-10">
          <button 
            onClick={handleExportOrders}
            disabled={isExporting}
            className="modern-button secondary"
            style={{
              minWidth: "150px",
              justifyContent: "center"
            }}
          >
            {isExporting ? (
              <>
                <div className="loading-spinner"></div>
                جاري التصدير...
              </>
            ) : (
              <>
                📊 تصدير الطلبات
              </>
            )}
          </button>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="responsive-grid mb-30">
        <div className="modern-card">
          <h3 style={{ margin: "0 0 10px 0", fontSize: "14px", opacity: 0.8 }}>إجمالي الطلبات</h3>
          <h2 style={{ margin: "10px 0", fontSize: "32px", fontWeight: "bold", color: "#32CD32" }}>
            {stats.totalOrders}
          </h2>
        </div>
        <div className="modern-card">
          <h3 style={{ margin: "0 0 10px 0", fontSize: "14px", opacity: 0.8 }}>الطلبات الجديدة</h3>
          <h2 style={{ margin: "10px 0", fontSize: "32px", fontWeight: "bold", color: "#ffa500" }}>
            {stats.newOrders}
          </h2>
        </div>
        <div className="modern-card">
          <h3 style={{ margin: "0 0 10px 0", fontSize: "14px", opacity: 0.8 }}>قيد المعالجة</h3>
          <h2 style={{ margin: "10px 0", fontSize: "32px", fontWeight: "bold", color: "#87CEEB" }}>
            {stats.processingOrders}
          </h2>
        </div>
        <div className="modern-card">
          <h3 style={{ margin: "0 0 10px 0", fontSize: "14px", opacity: 0.8 }}>إجمالي المبيعات</h3>
          <h2 style={{ margin: "10px 0", fontSize: "32px", fontWeight: "bold", color: "#32CD32" }}>
            {stats.totalRevenue.toLocaleString()} ريال
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
              placeholder="البحث في الطلبات..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="modern-input"
            />
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

          {/* Date Range Filter */}
          <div style={{ minWidth: "150px" }}>
            <select
              value={selectedDateRange}
              onChange={(e) => setSelectedDateRange(e.target.value)}
              className="modern-input"
            >
              {dateRanges.map(range => (
                <option key={range} value={range} style={{ background: "#000", color: "#fff" }}>
                  {range}
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

        {/* Bulk Actions */}
        {selectedOrders.length > 0 && (
          <div style={{
            display: "flex",
            gap: "10px",
            alignItems: "center",
            padding: "15px",
            background: "rgba(50, 205, 50, 0.1)",
            borderRadius: "8px",
            border: "1px solid rgba(50, 205, 50, 0.3)",
            marginTop: "15px"
          }}>
            <span style={{ color: "#32CD32", fontSize: "14px" }}>
              تم تحديد {selectedOrders.length} طلب
            </span>
            <select
              onChange={(e) => handleBulkStatusChange(e.target.value)}
              className="modern-input"
              style={{ width: "auto", minWidth: "150px" }}
            >
              <option value="">تغيير الحالة</option>
              {statuses.filter(s => s !== "الكل").map(status => (
                <option key={status} value={status} style={{ background: "#000", color: "#fff" }}>
                  {status}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      {/* Orders Table */}
      <div className="modern-card">
        {filteredOrders.length > 0 ? (
          <div className="table-responsive">
            <table className="modern-table">
              <thead>
                <tr>
                  <th style={{ textAlign: "center" }}>
                    <input
                      type="checkbox"
                      checked={selectedOrders.length === filteredOrders.length && filteredOrders.length > 0}
                      onChange={handleSelectAll}
                      style={{ transform: "scale(1.2)" }}
                    />
                  </th>
                  <th>رقم الطلب</th>
                  <th>اسم العميل</th>
                  <th>الهاتف</th>
                  <th>المبلغ الإجمالي</th>
                  <th>الحالة</th>
                  <th>تاريخ الطلب</th>
                  <th>إجراءات</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map((order) => (
                  <tr key={order.id}>
                    <td style={{ textAlign: "center" }}>
                      <input
                        type="checkbox"
                        checked={selectedOrders.includes(order.id)}
                        onChange={() => handleSelectOrder(order.id)}
                        style={{ transform: "scale(1.2)" }}
                      />
                    </td>
                    <td style={{ fontWeight: "600", color: "#32CD32" }}>
                      {order.orderNumber}
                    </td>
                    <td style={{ fontWeight: "600" }}>{order.customerName}</td>
                    <td>{order.customerPhone}</td>
                    <td style={{ fontWeight: "600", color: "#32CD32" }}>
                      {order.totalAmount.toLocaleString()} ريال
                    </td>
                    <td>
                      <span className={`status-badge ${getStatusColor(order.status)}`}>
                        {getStatusIcon(order.status)} {order.status}
                      </span>
                    </td>
                    <td>{order.orderDate}</td>
                    <td>
                      <div className="action-buttons-container">
                        <button 
                          onClick={() => handleViewOrderDetails(order)}
                          className="modern-button info"
                          style={{ padding: "8px 12px", fontSize: "12px" }}
                        >
                          👁️ تفاصيل
                        </button>
                        <select
                          value={order.status}
                          onChange={(e) => handleStatusChange(order.id, e.target.value)}
                          className="modern-input"
                          style={{ 
                            width: "auto", 
                            minWidth: "120px", 
                            padding: "6px 8px",
                            fontSize: "11px"
                          }}
                        >
                          {statuses.filter(s => s !== "الكل").map(status => (
                            <option key={status} value={status} style={{ background: "#000", color: "#fff" }}>
                              {status}
                            </option>
                          ))}
                        </select>
                        <button 
                          onClick={() => handlePrintInvoice(order)}
                          className="modern-button warning"
                          style={{ padding: "8px 12px", fontSize: "12px" }}
                        >
                          🖨️ طباعة
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
            <div className="empty-state-icon">📋</div>
            <div className="empty-state-title">لا توجد طلبات</div>
            <div className="empty-state-description">
              {searchTerm || selectedStatus !== "الكل" || selectedDateRange !== "الكل"
                ? "لا توجد طلبات تطابق البحث" 
                : "لم يتم إنشاء أي طلبات بعد"
              }
            </div>
          </div>
        )}
      </div>

      {/* Order Details Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={`تفاصيل الطلب - ${selectedOrder?.orderNumber}`}
      >
        {selectedOrder && (
          <div>
            {/* Order Header */}
            <div className="modern-card mb-20">
              <div className="d-flex justify-between align-center mb-15">
                <h3 style={{ margin: 0, color: "#32CD32" }}>
                  {selectedOrder.orderNumber}
                </h3>
                <span className={`status-badge ${getStatusColor(selectedOrder.status)}`}>
                  {getStatusIcon(selectedOrder.status)} {selectedOrder.status}
                </span>
              </div>
              <div className="d-flex justify-between align-center">
                <span style={{ color: "#888" }}>تاريخ الطلب: {selectedOrder.orderDate}</span>
                <span style={{ color: "#32CD32", fontWeight: "bold", fontSize: "18px" }}>
                  {selectedOrder.totalAmount.toLocaleString()} ريال
                </span>
              </div>
            </div>

            {/* Customer Information */}
            <div className="modern-card mb-20">
              <h4 style={{ margin: "0 0 15px 0", color: "#fff" }}>معلومات العميل</h4>
              <div className="d-grid gap-10">
                <div className="d-flex justify-between">
                  <span style={{ color: "#888" }}>الاسم:</span>
                  <span style={{ color: "#fff", fontWeight: "600" }}>{selectedOrder.customerName}</span>
                </div>
                <div className="d-flex justify-between">
                  <span style={{ color: "#888" }}>الهاتف:</span>
                  <span style={{ color: "#fff" }}>{selectedOrder.customerPhone}</span>
                </div>
                <div className="d-flex justify-between">
                  <span style={{ color: "#888" }}>البريد الإلكتروني:</span>
                  <span style={{ color: "#fff" }}>{selectedOrder.customerEmail}</span>
                </div>
                <div className="d-flex justify-between">
                  <span style={{ color: "#888" }}>عنوان التوصيل:</span>
                  <span style={{ color: "#fff" }}>{selectedOrder.deliveryAddress}</span>
                </div>
              </div>
            </div>

            {/* Payment Information */}
            <div className="modern-card mb-20">
              <h4 style={{ margin: "0 0 15px 0", color: "#fff" }}>معلومات الدفع</h4>
              <div className="d-grid gap-10">
                <div className="d-flex justify-between">
                  <span style={{ color: "#888" }}>طريقة الدفع:</span>
                  <span style={{ color: "#fff" }}>{selectedOrder.paymentMethod}</span>
                </div>
                <div className="d-flex justify-between">
                  <span style={{ color: "#888" }}>حالة الدفع:</span>
                  <span className={`status-badge ${getPaymentStatusColor(selectedOrder.paymentStatus)}`}>
                    {selectedOrder.paymentStatus}
                  </span>
                </div>
              </div>
            </div>

            {/* Order Items */}
            <div className="modern-card mb-20">
              <h4 style={{ margin: "0 0 15px 0", color: "#fff" }}>المنتجات المطلوبة</h4>
              <div className="table-responsive">
                <table className="modern-table">
                  <thead>
                    <tr>
                      <th>المنتج</th>
                      <th>الكمية</th>
                      <th>السعر</th>
                      <th>الإجمالي</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedOrder.items.map((item) => (
                      <tr key={item.id}>
                        <td style={{ fontWeight: "600" }}>{item.name}</td>
                        <td>{item.quantity}</td>
                        <td>{item.price} ريال</td>
                        <td style={{ fontWeight: "600", color: "#32CD32" }}>
                          {item.total} ريال
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Order Timeline */}
            <div className="modern-card">
              <h4 style={{ margin: "0 0 15px 0", color: "#fff" }}>سجل الطلب</h4>
              <div className="d-flex flex-column gap-10">
                {selectedOrder.timeline.map((event, index) => (
                  <div key={index} style={{
                    display: "flex",
                    gap: "15px",
                    padding: "10px",
                    background: "rgba(255, 255, 255, 0.05)",
                    borderRadius: "8px",
                    border: "1px solid rgba(255, 255, 255, 0.1)"
                  }}>
                    <div style={{
                      width: "12px",
                      height: "12px",
                      background: "#32CD32",
                      borderRadius: "50%",
                      marginTop: "4px",
                      flexShrink: 0
                    }}></div>
                    <div style={{ flex: 1 }}>
                      <div style={{ color: "#fff", fontWeight: "600", marginBottom: "5px" }}>
                        {event.status}
                      </div>
                      <div style={{ color: "#888", fontSize: "12px" }}>
                        {event.description}
                      </div>
                      <div style={{ color: "#888", fontSize: "11px", marginTop: "5px" }}>
                        {event.date}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="d-flex justify-end gap-10 mt-20">
              <button
                onClick={() => handlePrintInvoice(selectedOrder)}
                className="modern-button warning"
              >
                🖨️ طباعة الفاتورة
              </button>
              <button
                onClick={() => setIsModalOpen(false)}
                className="modern-button secondary"
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