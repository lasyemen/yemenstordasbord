import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  function handleLogin(e) {
    e.preventDefault();
    if (phone === "admin" && password === "123456") {
      navigate("/");
    } else {
      alert("بيانات الدخول غير صحيحة");
    }
  }

  return (
    <div style={{
      minHeight: "100vh",
      background: "#000",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: "20px",
      fontFamily: "Arial, sans-serif"
    }}>
      {/* Shopping Bag Icon */}
      <div style={{
        width: "80px",
        height: "80px",
        background: "linear-gradient(135deg, #32CD32, #87CEEB)",
        borderRadius: "50%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: "30px",
        position: "relative"
      }}>
        <div style={{
          width: "50px",
          height: "60px",
          border: "3px solid #000",
          borderRadius: "0 0 25px 25px",
          position: "relative"
        }}>
          <div style={{
            width: "20px",
            height: "15px",
            border: "2px solid #000",
            borderRadius: "0 0 10px 10px",
            position: "absolute",
            top: "-15px",
            left: "50%",
            transform: "translateX(-50%)"
          }}></div>
          {/* Yemen Map Silhouette */}
          <div style={{
            width: "30px",
            height: "20px",
            background: "#000",
            position: "absolute",
            top: "15px",
            left: "10px",
            borderRadius: "2px"
          }}></div>
        </div>
      </div>

      {/* Title */}
      <h1 style={{
        color: "#fff",
        fontSize: "28px",
        marginBottom: "40px",
        textAlign: "center"
      }}>
        تسجيل الدخول
      </h1>

      {/* Login Form */}
      <form onSubmit={handleLogin} style={{ width: "100%", maxWidth: "350px" }}>
        <div style={{ marginBottom: "20px" }}>
          <input
            type="text"
            value={phone}
            onChange={e => setPhone(e.target.value)}
            placeholder="رقم الهاتف"
            required
            style={{
              width: "100%",
              padding: "15px",
              border: "2px solid",
              borderImage: "linear-gradient(135deg, #32CD32, #87CEEB) 1",
              borderRadius: "10px",
              background: "transparent",
              color: "#fff",
              fontSize: "16px",
              textAlign: "right",
              outline: "none"
            }}
          />
        </div>

        <div style={{ marginBottom: "20px" }}>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="كلمة المرور"
            required
            style={{
              width: "100%",
              padding: "15px",
              border: "2px solid",
              borderImage: "linear-gradient(135deg, #32CD32, #87CEEB) 1",
              borderRadius: "10px",
              background: "transparent",
              color: "#fff",
              fontSize: "16px",
              textAlign: "right",
              outline: "none"
            }}
          />
        </div>

        {/* Forgot Password Link */}
        <div style={{
          textAlign: "right",
          marginBottom: "30px"
        }}>
          <a href="#" style={{
            color: "#fff",
            textDecoration: "none",
            fontSize: "14px"
          }}>
            نسيت كلمة المرور؟
          </a>
        </div>

        {/* Login Button */}
        <button
          type="submit"
          style={{
            width: "100%",
            padding: "15px",
            background: "linear-gradient(135deg, #32CD32, #87CEEB)",
            color: "#fff",
            border: "none",
            borderRadius: "10px",
            fontSize: "18px",
            fontWeight: "bold",
            cursor: "pointer",
            marginBottom: "20px"
          }}
        >
          تسجيل الدخول
        </button>
      </form>

      {/* Create Account Link */}
      <div style={{
        textAlign: "center",
        color: "#fff",
        fontSize: "14px"
      }}>
        لا يوجد حساب؟ قم بإنشاء حساب
      </div>
    </div>
  );
} 