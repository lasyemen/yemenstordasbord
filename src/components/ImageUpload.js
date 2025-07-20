import { useState, useRef } from "react";

export default function ImageUpload({ onImageSelect, currentImage, onError }) {
  const [preview, setPreview] = useState(currentImage || null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef(null);

  const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
  const ALLOWED_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];

  const validateFile = (file) => {
    // التحقق من نوع الملف
    if (!ALLOWED_TYPES.includes(file.type)) {
      return {
        isValid: false,
        message: "نوع الملف غير مدعوم. يرجى اختيار صورة بصيغة JPG, PNG, GIF أو WebP"
      };
    }

    // التحقق من حجم الملف
    if (file.size > MAX_FILE_SIZE) {
      return {
        isValid: false,
        message: "حجم الملف كبير جداً. الحد الأقصى 5 ميجابايت"
      };
    }

    return { isValid: true };
  };

  const handleFileSelect = async (file) => {
    setError(null);
    setIsLoading(true);

    try {
      const validation = validateFile(file);
      
      if (!validation.isValid) {
        setError(validation.message);
        if (onError) {
          onError(validation.message);
        }
        return;
      }

      // إنشاء معاينة للصورة
      const reader = new FileReader();
      
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          setPreview(e.target.result);
          onImageSelect(e.target.result);
          setIsLoading(false);
        };
        img.onerror = () => {
          setError("فشل في تحميل الصورة. يرجى المحاولة مرة أخرى");
          setIsLoading(false);
        };
        img.src = e.target.result;
      };

      reader.onerror = () => {
        setError("فشل في قراءة الملف. يرجى المحاولة مرة أخرى");
        setIsLoading(false);
      };

      reader.readAsDataURL(file);
    } catch (error) {
      setError("حدث خطأ أثناء معالجة الصورة");
      setIsLoading(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleClick = () => {
    fileInputRef.current.click();
  };

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleRemoveImage = () => {
    setPreview(null);
    setError(null);
    onImageSelect(null);
    // إعادة تعيين input file
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div>
      <div
        onClick={handleClick}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className="image-upload-area"
        style={{
          width: "100%",
          height: "150px",
          border: "2px dashed",
          borderColor: error ? "#ff4444" : isDragOver ? "#32CD32" : "rgba(255, 255, 255, 0.3)",
          borderRadius: "10px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          cursor: isLoading ? "not-allowed" : "pointer",
          background: error 
            ? "rgba(255, 68, 68, 0.1)" 
            : isDragOver 
              ? "rgba(50, 205, 50, 0.1)" 
              : "rgba(255, 255, 255, 0.05)",
          transition: "all 0.3s ease",
          position: "relative",
          overflow: "hidden",
          opacity: isLoading ? 0.7 : 1
        }}
      >
        {isLoading ? (
          <div style={{
            textAlign: "center",
            color: "#fff"
          }}>
            <div style={{
              width: "32px",
              height: "32px",
              border: "3px solid #32CD32",
              borderTop: "3px solid transparent",
              borderRadius: "50%",
              animation: "spin 1s linear infinite",
              margin: "0 auto 10px"
            }}></div>
            <div style={{ fontSize: "14px" }}>
              جاري تحميل الصورة...
            </div>
          </div>
        ) : preview ? (
          <div style={{
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative"
          }}>
            <img
              src={preview}
              alt="معاينة الصورة"
              style={{
                maxWidth: "100%",
                maxHeight: "100%",
                objectFit: "contain",
                borderRadius: "8px"
              }}
            />
            <div style={{
              position: "absolute",
              top: "5px",
              right: "5px",
              background: "rgba(0, 0, 0, 0.8)",
              color: "#fff",
              padding: "5px 10px",
              borderRadius: "5px",
              fontSize: "12px",
              backdropFilter: "blur(5px)"
            }}>
              انقر لتغيير الصورة
            </div>
            <div style={{
              position: "absolute",
              bottom: "5px",
              left: "5px",
              background: "rgba(0, 0, 0, 0.8)",
              color: "#fff",
              padding: "3px 8px",
              borderRadius: "3px",
              fontSize: "10px",
              backdropFilter: "blur(5px)"
            }}>
              معاينة
            </div>
          </div>
        ) : (
          <div style={{
            textAlign: "center",
            color: "#fff"
          }}>
            <div style={{ fontSize: "32px", marginBottom: "10px" }}>📷</div>
            <div style={{ fontSize: "14px", marginBottom: "5px" }}>
              اسحب الصورة هنا أو انقر للاختيار
            </div>
            <div style={{ fontSize: "12px", opacity: 0.7, marginBottom: "5px" }}>
              JPG, PNG, GIF, WebP حتى 5MB
            </div>
            <div style={{ 
              fontSize: "10px", 
              opacity: 0.5,
              background: "rgba(255, 255, 255, 0.1)",
              padding: "3px 8px",
              borderRadius: "3px"
            }}>
              دعم السحب والإفلات
            </div>
          </div>
        )}
      </div>
      
      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/jpg,image/png,image/gif,image/webp"
        onChange={handleFileInputChange}
        style={{ display: "none" }}
        disabled={isLoading}
      />
      
      {/* رسالة الخطأ */}
      {error && (
        <div style={{
          color: "#ff4444",
          fontSize: "12px",
          marginTop: "8px",
          padding: "8px 12px",
          background: "rgba(255, 68, 68, 0.1)",
          borderRadius: "6px",
          border: "1px solid rgba(255, 68, 68, 0.3)"
        }}>
          ⚠️ {error}
        </div>
      )}
      
      {/* معلومات الملف */}
      {preview && !error && (
        <div style={{
          color: "#32CD32",
          fontSize: "12px",
          marginTop: "8px",
          padding: "8px 12px",
          background: "rgba(50, 205, 50, 0.1)",
          borderRadius: "6px",
          border: "1px solid rgba(50, 205, 50, 0.3)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center"
        }}>
          <span>✅ تم تحميل الصورة بنجاح</span>
          <button
            type="button"
            onClick={handleRemoveImage}
            style={{
              background: "linear-gradient(135deg, #ff4444, #cc0000)",
              color: "#fff",
              border: "none",
              padding: "4px 8px",
              borderRadius: "4px",
              cursor: "pointer",
              fontSize: "10px",
              fontWeight: "bold"
            }}
          >
            حذف
          </button>
        </div>
      )}
      
      {/* زر حذف منفصل */}
      {preview && !error && (
        <button
          type="button"
          onClick={handleRemoveImage}
          style={{
            background: "linear-gradient(135deg, #ff4444, #cc0000)",
            color: "#fff",
            border: "none",
            padding: "8px 15px",
            borderRadius: "6px",
            marginTop: "10px",
            cursor: "pointer",
            fontSize: "12px",
            fontWeight: "bold",
            width: "100%"
          }}
        >
          🗑️ حذف الصورة
        </button>
      )}
    </div>
  );
} 