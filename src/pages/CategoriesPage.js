import { useState } from "react";
import Modal from "../components/Modal";
import Notification from "../components/Notification";

export default function CategoriesPage() {
  const [categories, setCategories] = useState([
    { id: 1, name: "عسل", description: "أفضل أنواع العسل اليمني الطبيعي", productCount: 5, color: "#FFD700" },
    { id: 2, name: "قهوة", description: "قهوة يمنية طازجة ومحمصة", productCount: 8, color: "#8B4513" },
    { id: 3, name: "بهارات", description: "بهارات يمنية تقليدية", productCount: 12, color: "#FF6347" },
    { id: 4, name: "منتجات غذائية", description: "منتجات غذائية يمنية طازجة", productCount: 15, color: "#32CD32" },
    { id: 5, name: "ملابس تقليدية", description: "ملابس يمنية تقليدية", productCount: 10, color: "#9370DB" },
    { id: 6, name: "جنابي", description: "جنابي يمنية تقليدية", productCount: 6, color: "#FF4500" },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    color: "#32CD32"
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [notification, setNotification] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showProductsModal, setShowProductsModal] = useState(false);

  // ألوان الفئات
  const categoryColors = [
    "#FFD700", "#8B4513", "#FF6347", "#32CD32", "#9370DB", "#FF4500",
    "#4169E1", "#FF69B4", "#20B2AA", "#FF8C00", "#8A2BE2", "#00CED1"
  ];

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "اسم الفئة مطلوب";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "اسم الفئة يجب أن يكون حرفين على الأقل";
    }

    if (!formData.description.trim()) {
      newErrors.description = "وصف الفئة مطلوب";
    } else if (formData.description.trim().length < 10) {
      newErrors.description = "وصف الفئة يجب أن يكون 10 أحرف على الأقل";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const showNotification = (message, type = "success") => {
    setNotification({ message, type });
  };

  const handleAddCategory = () => {
    setEditingCategory(null);
    setFormData({
      name: "",
      description: "",
      color: categoryColors[Math.floor(Math.random() * categoryColors.length)]
    });
    setErrors({});
    setIsModalOpen(true);
  };

  const handleEditCategory = (category) => {
    setEditingCategory(category);
    setFormData({
      name: category.name,
      description: category.description,
      color: category.color
    });
    setErrors({});
    setIsModalOpen(true);
  };

  const handleDeleteCategory = (categoryId) => {
    const category = categories.find(c => c.id === categoryId);
    if (window.confirm(`هل أنت متأكد من حذف فئة "${category.name}"؟\n\nسيتم حذف جميع المنتجات المرتبطة بهذه الفئة.`)) {
      setCategories(categories.filter(c => c.id !== categoryId));
      showNotification(`تم حذف فئة "${category.name}" بنجاح`, "success");
    }
  };

  const handleViewProducts = (category) => {
    setSelectedCategory(category);
    setShowProductsModal(true);
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
      if (editingCategory) {
        // Edit existing category
        setCategories(categories.map(c => 
          c.id === editingCategory.id 
            ? { 
                ...c, 
                name: formData.name.trim(),
                description: formData.description.trim(),
                color: formData.color
              }
            : c
        ));
        showNotification(`تم تحديث فئة "${formData.name}" بنجاح`, "success");
      } else {
        // Add new category
        const newCategory = {
          id: Math.max(...categories.map(c => c.id)) + 1,
          name: formData.name.trim(),
          description: formData.description.trim(),
          color: formData.color,
          productCount: 0
        };
        setCategories([...categories, newCategory]);
        showNotification(`تم إضافة فئة "${formData.name}" بنجاح`, "success");
      }
      
      setIsModalOpen(false);
      setErrors({});
    } catch (error) {
      console.error("خطأ في حفظ الفئة:", error);
      showNotification("حدث خطأ في حفظ الفئة. يرجى المحاولة مرة أخرى.", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  // محاكاة منتجات الفئة
  const getCategoryProducts = (categoryId) => {
    const mockProducts = [
      { id: 1, name: "عسل دوعني", price: 50, stock: 20 },
      { id: 2, name: "عسل سدر", price: 80, stock: 15 },
      { id: 3, name: "عسل طبيعي", price: 60, stock: 25 },
      { id: 4, name: "عسل بري", price: 70, stock: 10 },
      { id: 5, name: "عسل جبلي", price: 90, stock: 8 }
    ];
    return mockProducts.slice(0, Math.floor(Math.random() * 5) + 1);
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
          إدارة الفئات
        </h1>
        <button 
          onClick={handleAddCategory}
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
          إضافة فئة جديدة
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
          <h3 style={{ margin: 0, fontSize: "14px", opacity: 0.8 }}>إجمالي الفئات</h3>
          <h2 style={{ margin: "10px 0", fontSize: "32px", fontWeight: "bold" }}>
            {categories.length}
          </h2>
        </div>
        <div style={{
          background: "linear-gradient(135deg, #87CEEB, #4682B4)",
          borderRadius: "15px",
          padding: "20px",
          color: "#fff",
          textAlign: "center"
        }}>
          <h3 style={{ margin: 0, fontSize: "14px", opacity: 0.8 }}>إجمالي المنتجات</h3>
          <h2 style={{ margin: "10px 0", fontSize: "32px", fontWeight: "bold" }}>
            {categories.reduce((sum, cat) => sum + cat.productCount, 0)}
          </h2>
        </div>
        <div style={{
          background: "linear-gradient(135deg, #ffa500, #ff8c00)",
          borderRadius: "15px",
          padding: "20px",
          color: "#fff",
          textAlign: "center"
        }}>
          <h3 style={{ margin: 0, fontSize: "14px", opacity: 0.8 }}>أكثر فئة نشاطاً</h3>
          <h2 style={{ margin: "10px 0", fontSize: "20px", fontWeight: "bold" }}>
            {categories.reduce((max, cat) => cat.productCount > max.productCount ? cat : max, categories[0])?.name}
          </h2>
        </div>
      </div>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(350px, 1fr))",
        gap: "20px"
      }}>
        {categories.map((category) => (
          <div key={category.id} style={{
            background: "rgba(255, 255, 255, 0.05)",
            borderRadius: "15px",
            padding: "25px",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            transition: "all 0.3s ease",
            position: "relative",
            overflow: "hidden"
          }}
          onMouseEnter={(e) => {
            e.target.style.background = "rgba(255, 255, 255, 0.1)";
            e.target.style.transform = "translateY(-5px)";
          }}
          onMouseLeave={(e) => {
            e.target.style.background = "rgba(255, 255, 255, 0.05)";
            e.target.style.transform = "translateY(0)";
          }}
          >
            {/* Category Color Bar */}
            <div style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: "4px",
              background: category.color
            }}></div>

            <div style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              marginBottom: "15px"
            }}>
              <div style={{ flex: 1 }}>
                <h3 style={{
                  margin: 0,
                  color: "#fff",
                  fontSize: "20px",
                  fontWeight: "bold",
                  marginBottom: "8px"
                }}>
                  {category.name}
                </h3>
                <p style={{
                  margin: 0,
                  color: "#888",
                  fontSize: "14px",
                  lineHeight: "1.4"
                }}>
                  {category.description}
                </p>
              </div>
              <span style={{
                background: "linear-gradient(135deg, #32CD32, #87CEEB)",
                color: "#000",
                padding: "5px 12px",
                borderRadius: "15px",
                fontSize: "12px",
                fontWeight: "bold",
                marginRight: "10px"
              }}>
                {category.productCount} منتج
              </span>
            </div>
            
            <div style={{
              display: "flex",
              gap: "10px",
              marginTop: "20px",
              flexWrap: "wrap"
            }}>
              <button 
                onClick={() => handleViewProducts(category)}
                style={{
                  background: "linear-gradient(135deg, #87CEEB, #4682B4)",
                  color: "#fff",
                  border: "none",
                  padding: "8px 15px",
                  borderRadius: "6px",
                  cursor: "pointer",
                  fontSize: "12px",
                  fontWeight: "bold",
                  flex: 1,
                  minWidth: "120px"
                }}
              >
                👁️ عرض المنتجات
              </button>
              <button 
                onClick={() => handleEditCategory(category)}
                style={{
                  background: "linear-gradient(135deg, #32CD32, #87CEEB)",
                  color: "#000",
                  border: "none",
                  padding: "8px 15px",
                  borderRadius: "6px",
                  cursor: "pointer",
                  fontSize: "12px",
                  fontWeight: "bold",
                  flex: 1,
                  minWidth: "80px"
                }}
              >
                ✏️ تعديل
              </button>
              <button 
                onClick={() => handleDeleteCategory(category.id)}
                style={{
                  background: "linear-gradient(135deg, #ff4444, #cc0000)",
                  color: "#fff",
                  border: "none",
                  padding: "8px 15px",
                  borderRadius: "6px",
                  cursor: "pointer",
                  fontSize: "12px",
                  fontWeight: "bold",
                  flex: 1,
                  minWidth: "80px"
                }}
              >
                🗑️ حذف
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add/Edit Category Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingCategory ? "تعديل الفئة" : "إضافة فئة جديدة"}
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
              اسم الفئة *
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
              وصف الفئة *
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => {
                setFormData({...formData, description: e.target.value});
                if (errors.description) {
                  setErrors({...errors, description: null});
                }
              }}
              required
              rows="3"
              style={{
                width: "100%",
                padding: "12px 15px",
                border: "2px solid",
                borderColor: errors.description ? "#ff4444" : "rgba(255, 255, 255, 0.3)",
                borderImage: errors.description ? "none" : "linear-gradient(135deg, #32CD32, #87CEEB) 1",
                borderRadius: "8px",
                background: "transparent",
                color: "#fff",
                fontSize: "14px",
                textAlign: "right",
                resize: "vertical"
              }}
            />
            {errors.description && (
              <div style={{
                color: "#ff4444",
                fontSize: "12px",
                marginTop: "5px"
              }}>
                {errors.description}
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
              لون الفئة
            </label>
            <div style={{
              display: "flex",
              gap: "10px",
              flexWrap: "wrap"
            }}>
              {categoryColors.map((color, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => setFormData({...formData, color})}
                  style={{
                    width: "40px",
                    height: "40px",
                    background: color,
                    border: "2px solid",
                    borderColor: formData.color === color ? "#fff" : "transparent",
                    borderRadius: "50%",
                    cursor: "pointer",
                    transition: "all 0.3s ease"
                  }}
                ></button>
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
                editingCategory ? "تحديث الفئة" : "إضافة الفئة"
              )}
            </button>
          </div>
        </form>
      </Modal>

      {/* View Products Modal */}
      <Modal
        isOpen={showProductsModal}
        onClose={() => setShowProductsModal(false)}
        title={`منتجات فئة "${selectedCategory?.name}"`}
      >
        {selectedCategory && (
          <div>
            <div style={{
              background: "rgba(255, 255, 255, 0.05)",
              borderRadius: "10px",
              padding: "15px",
              marginBottom: "20px",
              border: "1px solid rgba(255, 255, 255, 0.1)"
            }}>
              <h4 style={{ color: "#fff", margin: "0 0 10px 0" }}>
                معلومات الفئة
              </h4>
              <p style={{ color: "#888", margin: 0, fontSize: "14px" }}>
                {selectedCategory.description}
              </p>
            </div>

            <div style={{
              background: "rgba(255, 255, 255, 0.05)",
              borderRadius: "10px",
              padding: "15px",
              border: "1px solid rgba(255, 255, 255, 0.1)"
            }}>
              <h4 style={{ color: "#fff", margin: "0 0 15px 0" }}>
                المنتجات ({getCategoryProducts(selectedCategory.id).length})
              </h4>
              <div style={{
                display: "flex",
                flexDirection: "column",
                gap: "10px"
              }}>
                {getCategoryProducts(selectedCategory.id).map((product) => (
                  <div key={product.id} style={{
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
                        {product.name}
                      </div>
                      <div style={{ color: "#888", fontSize: "12px" }}>
                        المخزون: {product.stock}
                      </div>
                    </div>
                    <div style={{
                      color: "#32CD32",
                      fontWeight: "bold"
                    }}>
                      {product.price} ريال
                    </div>
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
                onClick={() => setShowProductsModal(false)}
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