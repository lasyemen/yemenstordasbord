import { useState } from "react";
import Modal from "../components/Modal";
import ImageUpload from "../components/ImageUpload";
import Notification from "../components/Notification";

export default function ProductsPage() {
  const [products, setProducts] = useState([
    { id: 1, name: "عسل دوعني", price: 50, stock: 20, category: "عسل", image: "🍯" },
    { id: 2, name: "بُن يمني", price: 30, stock: 100, category: "قهوة", image: "☕" },
    { id: 3, name: "قهوة يمنية طازجة", price: 150, stock: 50, category: "قهوة", image: "☕" },
    { id: 4, name: "أفضل العسل اليمني", price: 200, stock: 15, category: "عسل", image: "🍯" },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("الكل");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
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

  const categories = ["الكل", "عسل", "قهوة", "بهارات"];
  const productCategories = ["عسل", "قهوة", "بهارات"];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "الكل" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

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

    if (!formData.image && !editingProduct) {
      newErrors.image = "صورة المنتج مطلوبة";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const showNotification = (message, type = "success") => {
    setNotification({ message, type });
  };

  const handleAddProduct = () => {
    setEditingProduct(null);
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

  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      price: product.price.toString(),
      stock: product.stock.toString(),
      category: product.category,
      image: product.image
    });
    setErrors({});
    setIsModalOpen(true);
  };

  const handleDeleteProduct = (productId) => {
    if (window.confirm("هل أنت متأكد من حذف هذا المنتج؟")) {
      setProducts(products.filter(p => p.id !== productId));
      showNotification("تم حذف المنتج بنجاح", "success");
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
      if (editingProduct) {
        // Edit existing product
        setProducts(products.map(p => 
          p.id === editingProduct.id 
            ? { 
                ...p, 
                name: formData.name.trim(),
                price: parseFloat(formData.price), 
                stock: parseInt(formData.stock),
                category: formData.category,
                image: formData.image || p.image
              }
            : p
        ));
        showNotification("تم تحديث المنتج بنجاح", "success");
      } else {
        // Add new product
        const newProduct = {
          id: Math.max(...products.map(p => p.id)) + 1,
          name: formData.name.trim(),
          price: parseFloat(formData.price),
          stock: parseInt(formData.stock),
          category: formData.category,
          image: formData.image || "📦"
        };
        setProducts([...products, newProduct]);
        showNotification("تم إضافة المنتج بنجاح", "success");
      }
      
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

  // دالة للتحقق من أن الصورة هي URL أم emoji
  const isImageUrl = (image) => {
    return image && (image.startsWith('data:image') || image.startsWith('http'));
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
          المنتجات
        </h1>
        <button 
          onClick={handleAddProduct}
          className="modern-button"
          style={{
            minWidth: "200px",
            justifyContent: "center"
          }}
        >
          <span style={{ fontSize: "20px", fontWeight: "bold" }}>+</span>
          إضافة منتج جديد
        </button>
      </div>

      {/* Statistics Cards */}
      <div className="responsive-grid mb-30">
        <div className="modern-card">
          <h3 style={{ margin: "0 0 10px 0", fontSize: "14px", opacity: 0.8 }}>إجمالي المنتجات</h3>
          <h2 style={{ margin: "10px 0", fontSize: "32px", fontWeight: "bold", color: "#32CD32" }}>
            {products.length}
          </h2>
        </div>
        <div className="modern-card">
          <h3 style={{ margin: "0 0 10px 0", fontSize: "14px", opacity: 0.8 }}>المنتجات المتوفرة</h3>
          <h2 style={{ margin: "10px 0", fontSize: "32px", fontWeight: "bold", color: "#87CEEB" }}>
            {products.filter(p => p.stock > 0).length}
          </h2>
        </div>
        <div className="modern-card">
          <h3 style={{ margin: "0 0 10px 0", fontSize: "14px", opacity: 0.8 }}>المنتجات النفاذة</h3>
          <h2 style={{ margin: "10px 0", fontSize: "32px", fontWeight: "bold", color: "#ffa500" }}>
            {products.filter(p => p.stock === 0).length}
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
              placeholder="البحث في المنتجات..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="modern-input"
            />
          </div>

          {/* Category Filter */}
          <div style={{ minWidth: "150px" }}>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="modern-input"
            >
              {categories.map(category => (
                <option key={category} value={category} style={{ background: "#000", color: "#fff" }}>
                  {category}
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
            {filteredProducts.length} منتج
          </div>
        </div>
      </div>

      {/* Products Table */}
      <div className="modern-card">
        {filteredProducts.length > 0 ? (
          <div className="table-responsive">
            <table className="modern-table">
              <thead>
                <tr>
                  <th>الصورة</th>
                  <th>اسم المنتج</th>
                  <th>الفئة</th>
                  <th>السعر</th>
                  <th>المخزون</th>
                  <th>الحالة</th>
                  <th>إجراءات</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map((product) => (
                  <tr key={product.id}>
                    <td style={{ textAlign: "center" }}>
                      <div style={{
                        width: "50px",
                        height: "50px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "24px",
                        background: "rgba(255, 255, 255, 0.1)",
                        borderRadius: "8px"
                      }}>
                        {isImageUrl(product.image) ? (
                          <img 
                            src={product.image} 
                            alt={product.name}
                            style={{
                              width: "100%",
                              height: "100%",
                              objectFit: "cover",
                              borderRadius: "8px"
                            }}
                          />
                        ) : (
                          product.image
                        )}
                      </div>
                    </td>
                    <td style={{ fontWeight: "600" }}>{product.name}</td>
                    <td>
                      <span className="status-badge active">
                        {product.category}
                      </span>
                    </td>
                    <td style={{ fontWeight: "600", color: "#32CD32" }}>
                      {product.price} ريال
                    </td>
                    <td>
                      <span style={{
                        color: product.stock > 10 ? "#32CD32" : product.stock > 0 ? "#ffa500" : "#ff4444",
                        fontWeight: "600"
                      }}>
                        {product.stock}
                      </span>
                    </td>
                    <td>
                      <span className={`status-badge ${product.stock > 10 ? 'active' : product.stock > 0 ? 'pending' : 'inactive'}`}>
                        {product.stock > 10 ? "متوفر" : product.stock > 0 ? "منخفض" : "نفذ"}
                      </span>
                    </td>
                    <td>
                      <div className="action-buttons-container">
                        <button 
                          onClick={() => handleEditProduct(product)}
                          className="modern-button info"
                          style={{ padding: "8px 12px", fontSize: "12px" }}
                        >
                          ✏️ تعديل
                        </button>
                        <button 
                          onClick={() => handleDeleteProduct(product.id)}
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
            <div className="empty-state-icon">📦</div>
            <div className="empty-state-title">لا توجد منتجات</div>
            <div className="empty-state-description">
              {searchTerm || selectedCategory !== "الكل" 
                ? "لا توجد منتجات تطابق البحث" 
                : "ابدأ بإضافة منتجات جديدة إلى متجرك"
              }
            </div>
            {!searchTerm && selectedCategory === "الكل" && (
              <button 
                onClick={handleAddProduct}
                className="modern-button mt-20"
              >
                إضافة منتج جديد
              </button>
            )}
          </div>
        )}
      </div>

      {/* Add/Edit Product Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingProduct ? "تعديل المنتج" : "إضافة منتج جديد"}
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
              {productCategories.map(category => (
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
              صورة المنتج {!editingProduct && "*"}
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
                  جاري الحفظ...
                </>
              ) : (
                editingProduct ? "تحديث المنتج" : "إضافة المنتج"
              )}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
} 