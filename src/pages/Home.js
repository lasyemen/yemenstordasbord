import React from 'react';

const Home = () => {
  const stats = [
    { title: 'إجمالي المبيعات', value: '12,450', unit: 'ريال', icon: '💰', color: '#27ae60' },
    { title: 'عدد الطلبات', value: '156', unit: 'طلب', icon: '📦', color: '#3498db' },
    { title: 'المنتجات', value: '45', unit: 'منتج', icon: '🏷️', color: '#f39c12' },
    { title: 'العملاء', value: '89', unit: 'عميل', icon: '👥', color: '#e74c3c' },
  ];

  const recentOrders = [
    { id: 1, customer: 'أحمد محمد', amount: 70.00, status: 'مكتمل', time: 'منذ 2 ساعة' },
    { id: 2, customer: 'فاطمة علي', amount: 45.00, status: 'قيد المعالجة', time: 'منذ 4 ساعات' },
    { id: 3, customer: 'محمد عبدالله', amount: 120.00, status: 'مكتمل', time: 'منذ 6 ساعات' },
  ];

  return (
    <div>
      <h1 style={{ marginBottom: '30px', color: '#2c3e50' }}>لوحة التحكم</h1>
      
      {/* Statistics Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '20px',
        marginBottom: '30px'
      }}>
        {stats.map((stat, index) => (
          <div key={index} style={{
            backgroundColor: 'white',
            padding: '20px',
            borderRadius: '8px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            borderLeft: `4px solid ${stat.color}`
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <h3 style={{ margin: '0 0 5px 0', color: '#7f8c8d', fontSize: '14px' }}>
                  {stat.title}
                </h3>
                <div style={{ display: 'flex', alignItems: 'baseline' }}>
                  <span style={{ fontSize: '24px', fontWeight: 'bold', color: '#2c3e50' }}>
                    {stat.value}
                  </span>
                  <span style={{ marginLeft: '5px', color: '#7f8c8d' }}>
                    {stat.unit}
                  </span>
                </div>
              </div>
              <div style={{
                fontSize: '2rem',
                opacity: 0.8
              }}>
                {stat.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '2fr 1fr',
        gap: '20px'
      }}>
        {/* Recent Orders */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '8px',
          padding: '20px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}>
          <h3 style={{ margin: '0 0 20px 0', color: '#2c3e50' }}>آخر الطلبات</h3>
          <div>
            {recentOrders.map((order) => (
              <div key={order.id} style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '15px 0',
                borderBottom: '1px solid #eee'
              }}>
                <div>
                  <div style={{ fontWeight: 'bold', color: '#2c3e50' }}>
                    {order.customer}
                  </div>
                  <div style={{ fontSize: '14px', color: '#7f8c8d' }}>
                    {order.time}
                  </div>
                </div>
                <div style={{ textAlign: 'left' }}>
                  <div style={{ fontWeight: 'bold', color: '#2c3e50' }}>
                    {order.amount.toFixed(2)} ريال
                  </div>
                  <span style={{
                    padding: '4px 8px',
                    borderRadius: '4px',
                    fontSize: '12px',
                    backgroundColor: order.status === 'مكتمل' ? '#d4edda' : '#fff3cd',
                    color: order.status === 'مكتمل' ? '#155724' : '#856404'
                  }}>
                    {order.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '8px',
          padding: '20px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}>
          <h3 style={{ margin: '0 0 20px 0', color: '#2c3e50' }}>إجراءات سريعة</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <button style={{
              backgroundColor: '#27ae60',
              color: 'white',
              border: 'none',
              padding: '12px',
              borderRadius: '5px',
              cursor: 'pointer',
              fontSize: '14px'
            }}>
              + إضافة منتج جديد
            </button>
            <button style={{
              backgroundColor: '#3498db',
              color: 'white',
              border: 'none',
              padding: '12px',
              borderRadius: '5px',
              cursor: 'pointer',
              fontSize: '14px'
            }}>
              عرض جميع الطلبات
            </button>
            <button style={{
              backgroundColor: '#f39c12',
              color: 'white',
              border: 'none',
              padding: '12px',
              borderRadius: '5px',
              cursor: 'pointer',
              fontSize: '14px'
            }}>
              إدارة المستخدمين
            </button>
            <button style={{
              backgroundColor: '#e74c3c',
              color: 'white',
              border: 'none',
              padding: '12px',
              borderRadius: '5px',
              cursor: 'pointer',
              fontSize: '14px'
            }}>
              تقرير المبيعات
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home; 