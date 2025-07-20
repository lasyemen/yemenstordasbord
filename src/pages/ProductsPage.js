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
          المنتجات
        </h1>
        <button 
          onClick={handleAddProduct}
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
            justifyContent: "center",
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
          onMouseDown={(e) => {
            e.target.style.transform = "translateY(0)";
            e.target.style.boxShadow = "0 2px 8px rgba(50, 205, 50, 0.3)";
          }}
          onMouseUp={(e) => {
            e.target.style.transform = "translateY(-2px)";
            e.target.style.boxShadow = "0 6px 20px rgba(50, 205, 50, 0.4)";
          }}
        >
          <span style={{ 
            fontSize: "20px",
            fontWeight: "bold"
          }}>+</span>
          <span>إضافة منتج جديد</span>
          <div style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05))",
            opacity: 0,
            transition: "opacity 0.3s ease"
          }}
          onMouseEnter={(e) => {
            e.target.style.opacity = "1";
          }}
          onMouseLeave={(e) => {
            e.target.style.opacity = "0";
          }}
          ></div>
        </button>
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
              placeholder="البحث في المنتجات..."
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

          {/* Category Filter */}
          <div style={{ minWidth: "150px" }}>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
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

      <div style={{
        background: "rgba(255, 255, 255, 0.05)",
        borderRadius: "15px",
        padding: "25px",
        border: "1px solid rgba(255, 255, 255, 0.1)"
      }}>
        {/* Quick Add Button */}
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
          paddingBottom: "15px",
          borderBottom: "1px solid rgba(255, 255, 255, 0.1)"
        }}>
          <h3 style={{
            color: "#fff",
            margin: 0,
            fontSize: "18px"
          }}>
            قائمة المنتجات
          </h3>
          <button 
            onClick={handleAddProduct}
            className="quick-add-btn"
            style={{
              background: "linear-gradient(135deg, #32CD32, #87CEEB)",
              color: "#000",
              border: "none",
              padding: "10px 20px",
              borderRadius: "8px",
              fontWeight: "bold",
              fontSize: "14px",
              cursor: "pointer",
              transition: "all 0.3s ease",
              display: "flex",
              alignItems: "center",
              gap: "8px"
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = "translateY(-1px)";
              e.target.style.boxShadow = "0 4px 12px rgba(50, 205, 50, 0.3)";
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = "translateY(0)";
              e.target.style.boxShadow = "none";
            }}
          >
            <span style={{ fontSize: "16px" }}>+</span>
            إضافة منتج
          </button>
        </div>

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
                صورة المنتج
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
                الفئة
              </th>
              <th style={{
                padding: "15px",
                textAlign: "right"
              }}>
                السعر
              </th>
              <th style={{
                padding: "15px",
                textAlign: "right"
              }}>
                المخزون
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
            {filteredProducts.map((p, index) => (
              <tr key={p.id} style={{
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
                  <div style={{
                    width: "50px",
                    height: "50px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: "8px",
                    overflow: "hidden",
                    background: "rgba(255, 255, 255, 0.1)",
                    margin: "0 auto"
                  }}>
                    {isImageUrl(p.image) ? (
                      <img
                        src={p.image}
                        alt={p.name}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          borderRadius: "8px"
                        }}
                        onError={(e) => {
                          e.target.style.display = "none";
                          e.target.nextSibling.style.display = "flex";
                        }}
                      />
                    ) : (
                      <div style={{
                        fontSize: "24px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: "100%",
                        height: "100%"
                      }}>
                        {p.image}
                      </div>
                    )}
                    {/* Fallback emoji */}
                    <div style={{
                      fontSize: "24px",
                      display: isImageUrl(p.image) ? "none" : "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: "100%",
                      height: "100%"
                    }}>
                      📦
                    </div>
                  </div>
                </td>
                <td style={{ padding: "15px" }}>{p.name}</td>
                <td style={{ padding: "15px" }}>
                  <span style={{
                    padding: "5px 12px",
                    background: "linear-gradient(135deg, #32CD32, #87CEEB)",
                    color: "#000",
                    borderRadius: "15px",
                    fontSize: "12px",
                    fontWeight: "bold"
                  }}>
                    {p.category}
                  </span>
                </td>
                <td style={{ padding: "15px" }}>
                  <span style={{
                    color: "#32CD32",
                    fontWeight: "bold"
                  }}>
                    {p.price} ريال
                  </span>
                </td>
                <td style={{ padding: "15px" }}>
                  <span style={{
                    padding: "5px 12px",
                    background: p.stock > 20 ? "linear-gradient(135deg, #32CD32, #28a745)" : "linear-gradient(135deg, #ff4444, #cc0000)",
                    color: "#fff",
                    borderRadius: "15px",
                    fontSize: "12px",
                    fontWeight: "bold"
                  }}>
                    {p.stock}
                  </span>
                </td>
                <td style={{ padding: "15px" }}>
                  <button 
                    onClick={() => handleEditProduct(p)}
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
                    onClick={() => handleDeleteProduct(p.id)}
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

        {filteredProducts.length === 0 && (
          <div style={{
            textAlign: "center",
            padding: "40px",
            color: "#888"
          }}>
            لا توجد منتجات تطابق البحث
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