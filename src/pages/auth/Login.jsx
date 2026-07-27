/**
 * ============================================================
 * Page: Login - Trang Đăng Nhập
 * ============================================================
 */

import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import AuthLayout from "../../layouts/AuthLayout";

export default function Login() {
    // ══════════════════════════════════════════
    // HOOKS - Khởi tạo các hook cần thiết (GIỮ NGUYÊN)
    // ══════════════════════════════════════════
    const { login, loginWithGoogle } = useAuth();
    const navigate = useNavigate();

    // ══════════════════════════════════════════
    // STATE - Quản lý trạng thái local (GIỮ NGUYÊN)
    // ══════════════════════════════════════════
    const [form, setForm] = useState({
        email: "",
        password: "",
    });
    const [error, setError] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isGoogleLoading, setIsGoogleLoading] = useState(false);

    // ══════════════════════════════════════════
    // EVENT HANDLERS - Xử lý sự kiện (GIỮ NGUYÊN)
    // ══════════════════════════════════════════
    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });

        if (error) {
            setError("");
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!form.email || !form.password) {
            setError("Vui lòng nhập đầy đủ thông tin!");
            return;
        }

        setIsSubmitting(true);
        const result = await login(form.email, form.password);
        setIsSubmitting(false);

        if (result.error) {
            setError(result.error);
        } else {
            navigate("/home");
        }
    };

    const handleGoogleLogin = async () => {
        setIsGoogleLoading(true);
        setError("");

        const result = await loginWithGoogle();
        setIsGoogleLoading(false);

        if (result.error) {
            setError(result.error);
        } else if (result.cancelled) {
            // User đóng popup, không làm gì
        } else {
            navigate("/home");
        }
    };

    // ══════════════════════════════════════════
    // RENDER - Giao diện người dùng (CẬP NHẬT TÔNG MÀU XANH LÁ)
    // ══════════════════════════════════════════
    return (
        <AuthLayout title="Đăng Nhập">
            {/* ── Form đăng nhập bằng email/password ── */}
            <form
                onSubmit={handleSubmit}
                style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "1.2rem",
                }}
            >
                {/* ── Hiển thị thông báo lỗi ── */}
                {error && (
                    <div
                        style={{
                            color: "#b91c1c",
                            fontSize: "14px",
                            padding: "0.75rem 1rem",
                            backgroundColor: "#fef2f2",
                            borderRadius: "10px",
                            border: "1px solid #fecaca",
                            display: "flex",
                            alignItems: "center",
                            gap: "0.5rem",
                            fontWeight: "500",
                        }}
                    >
                        <span>⚠️</span> {error}
                    </div>
                )}

                {/* ── Input Email ── */}
                <div>
                    <label
                        style={{
                            display: "block",
                            marginBottom: "0.4rem",
                            fontWeight: "600",
                            color: "#1a3a2f",
                            fontSize: "14px",
                        }}
                    >
                        Email
                    </label>
                    <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="example@gmail.com"
                        style={{
                            width: "100%",
                            padding: "0.8rem 1rem",
                            borderRadius: "10px",
                            border: "1px solid #cbd5e1",
                            outline: "none",
                            fontSize: "14px",
                            transition: "all 0.2s ease",
                            backgroundColor: "#f8fafc",
                            boxSizing: "border-box",
                        }}
                        onFocus={(e) => {
                            e.target.style.borderColor = "#059669";
                            e.target.style.backgroundColor = "#fff";
                            e.target.style.boxShadow = "0 0 0 3px rgba(5, 150, 105, 0.15)";
                        }}
                        onBlur={(e) => {
                            e.target.style.borderColor = "#cbd5e1";
                            e.target.style.backgroundColor = "#f8fafc";
                            e.target.style.boxShadow = "none";
                        }}
                    />
                </div>

                {/* ── Input Mật khẩu ── */}
                <div>
                    <label
                        style={{
                            display: "block",
                            marginBottom: "0.4rem",
                            fontWeight: "600",
                            color: "#1a3a2f",
                            fontSize: "14px",
                        }}
                    >
                        Mật khẩu
                    </label>
                    <input
                        type="password"
                        name="password"
                        value={form.password}
                        onChange={handleChange}
                        placeholder="••••••••"
                        style={{
                            width: "100%",
                            padding: "0.8rem 1rem",
                            borderRadius: "10px",
                            border: "1px solid #cbd5e1",
                            outline: "none",
                            fontSize: "14px",
                            transition: "all 0.2s ease",
                            backgroundColor: "#f8fafc",
                            boxSizing: "border-box",
                        }}
                        onFocus={(e) => {
                            e.target.style.borderColor = "#059669";
                            e.target.style.backgroundColor = "#fff";
                            e.target.style.boxShadow = "0 0 0 3px rgba(5, 150, 105, 0.15)";
                        }}
                        onBlur={(e) => {
                            e.target.style.borderColor = "#cbd5e1";
                            e.target.style.backgroundColor = "#f8fafc";
                            e.target.style.boxShadow = "none";
                        }}
                    />
                </div>

                {/* ── Nút Submit (Tông xanh đậm #1a3a2f) ── */}
                <button
                    type="submit"
                    disabled={isSubmitting}
                    style={{
                        width: "100%",
                        padding: "0.85rem",
                        backgroundColor: "#1a3a2f",
                        color: "#ffffff",
                        border: "none",
                        borderRadius: "10px",
                        fontWeight: "600",
                        fontSize: "15px",
                        cursor: isSubmitting ? "not-allowed" : "pointer",
                        opacity: isSubmitting ? 0.7 : 1,
                        marginTop: "0.5rem",
                        transition: "all 0.2s ease",
                        boxShadow: "0 4px 12px rgba(26, 58, 47, 0.2)",
                    }}
                    onMouseEnter={(e) => {
                        if (!isSubmitting) e.target.style.backgroundColor = "#234d3f";
                    }}
                    onMouseLeave={(e) => {
                        if (!isSubmitting) e.target.style.backgroundColor = "#1a3a2f";
                    }}
                >
                    {isSubmitting ? "Đang xử lý..." : "Đăng Nhập"}
                </button>
            </form>

            {/* ── DIVIDER ── */}
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    margin: "1.5rem 0",
                    gap: "0.75rem",
                }}
            >
                <hr
                    style={{
                        flex: 1,
                        border: "none",
                        borderTop: "1px solid #e2e8f0",
                    }}
                />
                <span
                    style={{
                        color: "#94a3b8",
                        fontSize: "13px",
                        fontWeight: "500",
                    }}
                >
                    hoặc
                </span>
                <hr
                    style={{
                        flex: 1,
                        border: "none",
                        borderTop: "1px solid #e2e8f0",
                    }}
                />
            </div>

            {/* ── NÚT ĐĂNG NHẬP BẰNG GOOGLE ── */}
            <button
                type="button"
                onClick={handleGoogleLogin}
                disabled={isGoogleLoading}
                style={{
                    width: "100%",
                    padding: "0.8rem",
                    backgroundColor: "#ffffff",
                    color: "#334155",
                    border: "1px solid #cbd5e1",
                    borderRadius: "10px",
                    fontWeight: "600",
                    cursor: isGoogleLoading ? "not-allowed" : "pointer",
                    opacity: isGoogleLoading ? 0.7 : 1,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "0.6rem",
                    fontSize: "14px",
                    transition: "all 0.2s ease",
                    boxSizing: "border-box",
                }}
                onMouseEnter={(e) => {
                    if (!isGoogleLoading) {
                        e.target.style.backgroundColor = "#f8fafc";
                        e.target.style.borderColor = "#94a3b8";
                    }
                }}
                onMouseLeave={(e) => {
                    if (!isGoogleLoading) {
                        e.target.style.backgroundColor = "#ffffff";
                        e.target.style.borderColor = "#cbd5e1";
                    }
                }}
            >
                <svg width="18" height="18" viewBox="0 0 24 24">
                    <path
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
                        fill="#4285F4"
                    />
                    <path
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        fill="#34A853"
                    />
                    <path
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                        fill="#FBBC05"
                    />
                    <path
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                        fill="#EA4335"
                    />
                </svg>
                {isGoogleLoading ? "Đang xử lý..." : "Đăng nhập bằng Google"}
            </button>

            {/* ── Link chuyển sang trang Đăng ký ── */}
            <p
                style={{
                    marginTop: "1.5rem",
                    textAlign: "center",
                    fontSize: "14px",
                    color: "#64748b",
                }}
            >
                Chưa có tài khoản?{" "}
                <Link
                    to="/register"
                    style={{
                        color: "#059669",
                        fontWeight: "600",
                        textDecoration: "none",
                    }}
                    onMouseEnter={(e) => (e.target.style.textDecoration = "underline")}
                    onMouseLeave={(e) => (e.target.style.textDecoration = "none")}
                >
                    Đăng ký ngay
                </Link>
            </p>
        </AuthLayout>
    );
}