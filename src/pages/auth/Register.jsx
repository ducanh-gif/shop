/**
 * ============================================================
 * Page: Register - Trang Đăng Ký Tài Khoản
 * ============================================================
 *
 * Mục đích:
 *   - Cho phép user tạo tài khoản mới bằng 2 phương thức:
 *     1. Email + Password (điền form đầy đủ)
 *     2. Google Account (đăng ký nhanh 1 click)
 *   - Thu thập: username, email, password (cho phương thức email).
 *   - Xác thực qua Firebase Authentication.
 *   - Sau khi đăng ký thành công → redirect về /dashboard.
 *
 * Route: /register (được bảo vệ bởi GuestRoute - chỉ guest truy cập)
 *
 * Luồng hoạt động (Email/Password):
 *   1. User nhập username + email + password.
 *   2. Bấm "Đăng Ký" → handleSubmit() được gọi.
 *   3. Validate dữ liệu đầu vào (kiểm tra trống, password ≥ 6 ký tự).
 *   4. Gọi register(username, email, password) từ AuthContext.
 *      → Firebase tạo account + updateProfile() gắn displayName.
 *   5. Thành công → navigate("/dashboard")
 *   6. Thất bại → hiển thị lỗi.
 *
 * Luồng hoạt động (Google):
 *   1. User bấm "Đăng ký bằng Google".
 *   2. handleGoogleRegister() được gọi.
 *   3. Gọi loginWithGoogle() từ AuthContext.
 *      → Popup Google mở → user chọn tài khoản.
 *      → Firebase TỰ ĐỘNG tạo tài khoản nếu lần đầu.
 *   4. Thành công → navigate("/dashboard")
 *   5. User đóng popup → không làm gì.
 *   6. Lỗi → hiển thị thông báo.
 *
 * LƯU Ý VỀ GOOGLE SIGN-IN:
 *   - Dùng CÙNG hàm loginWithGoogle() cho cả Login và Register.
 *   - Vì signInWithPopup() của Firebase TỰ ĐỘNG xử lý:
 *     + Nếu email chưa có → TẠO tài khoản mới (register)
 *     + Nếu email đã có  → ĐĂNG NHẬP tài khoản cũ (login)
 *   - Nên không cần hàm "registerWithGoogle" riêng!
 * ============================================================
 */

import { useState } from "react";
// useNavigate: Điều hướng bằng code sau khi đăng ký thành công
// Link: Thay thế thẻ <a>, chuyển trang mà không reload (SPA)
import { useNavigate, Link } from "react-router-dom";
// useAuth: Lấy hàm register() và loginWithGoogle() từ AuthContext
import { useAuth } from "../../context/AuthContext";
// AuthLayout: Layout chung cho các trang auth (Login, Register)
import AuthLayout from "../../layouts/AuthLayout";

export default function Register() {
    // ══════════════════════════════════════════
    // HOOKS
    // ══════════════════════════════════════════

    // ── Lấy các hàm authentication từ AuthContext ──
    // register:        Đăng ký bằng email/password + username
    // loginWithGoogle: Đăng ký/đăng nhập bằng Google (cùng 1 hàm)
    const { register, loginWithGoogle } = useAuth();

    // ── Function điều hướng ──
    const navigate = useNavigate();

    // ══════════════════════════════════════════
    // STATE
    // ══════════════════════════════════════════

    // ── State: Dữ liệu form ──
    // Object chứa 3 field, dùng computed property name để cập nhật
    const [form, setForm] = useState({
        username: "",   // Tên hiển thị (sẽ được gắn vào displayName qua updateProfile)
        email: "",      // Email đăng ký (phải chưa được sử dụng)
        password: "",   // Mật khẩu (Firebase yêu cầu tối thiểu 6 ký tự)
    });

    // ── State: Thông báo lỗi ──
    // Rỗng = không có lỗi, có giá trị = hiển thị alert đỏ
    const [error, setError] = useState("");

    // ── State: Trạng thái đang xử lý form (email/password) ──
    const [isSubmitting, setIsSubmitting] = useState(false);

    // ── State: Trạng thái đang xử lý Google Sign-In ──
    // Tách riêng để 2 nút hoạt động độc lập (UX tốt hơn)
    const [isGoogleLoading, setIsGoogleLoading] = useState(false);

    // ══════════════════════════════════════════
    // EVENT HANDLERS
    // ══════════════════════════════════════════

    /**
     * handleChange - Cập nhật state khi user gõ vào input
     *
     * Dùng computed property name: [e.target.name] để cập nhật đúng field.
     * Ví dụ: input name="username" gõ "Nguyễn Văn A"
     *   → setForm({ ...form, username: "Nguyễn Văn A" })
     *
     * @param {Event} e - Sự kiện onChange từ input
     */
    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
        // Xóa lỗi cũ khi user gõ lại
        if (error) setError("");
    };

    /**
     * handleSubmit - Xử lý đăng ký bằng email/password
     *
     * Async vì register() gọi Firebase API (network request):
     *   - createUserWithEmailAndPassword() → Tạo account
     *   - updateProfile() → Gắn displayName
     *
     * Validate chi tiết:
     *   - Kiểm tra tất cả field không trống
     *   - Password >= 6 ký tự (Firebase requirement)
     *
     * @param {Event} e - Sự kiện onSubmit từ form
     */
    const handleSubmit = async (e) => {
        // Ngăn form reload trang
        e.preventDefault();

        // ── Validate ──
        if (!form.username || !form.email || !form.password) {
            setError("Vui lòng nhập đầy đủ thông tin!");
            return;
        }

        // ── Validate password length ──
        // Firebase yêu cầu password tối thiểu 6 ký tự
        // Kiểm tra trước ở client để UX tốt hơn (không cần đợi server trả lỗi)
        if (form.password.length < 6) {
            setError("Mật khẩu phải có ít nhất 6 ký tự!");
            return;
        }

        // ── Bật loading ──
        setIsSubmitting(true);

        // ── Gọi hàm register từ AuthContext ──
        // register() thực hiện 2 bước:
        //   1. createUserWithEmailAndPassword(auth, email, password) → Tạo account
        //   2. updateProfile(user, { displayName: username }) → Gắn tên
        const result = await register(form.username, form.email, form.password);

        // ── Tắt loading ──
        setIsSubmitting(false);

        // ── Xử lý kết quả ──
        if (result.error) {
            // Đăng ký thất bại → Hiển thị lỗi (email trùng, password yếu...)
            setError(result.error);
        } else {
            // Đăng ký thành công → Chuyển đến Dashboard
            // Lưu ý: Firebase TỰ ĐỘNG đăng nhập user sau khi tạo account
            // → onAuthStateChanged sẽ cập nhật state user
            navigate("/home");
        }
    };

    /**
     * handleGoogleRegister - Xử lý đăng ký bằng Google
     *
     * Gọi CÙNG hàm loginWithGoogle() với trang Login.
     * Firebase signInWithPopup() tự xử lý:
     *   - Email chưa có trên Firebase → Tạo tài khoản MỚI (register)
     *   - Email đã có trên Firebase  → Đăng nhập tài khoản CŨ (login)
     *
     * Ưu điểm của đăng ký bằng Google:
     *   - User KHÔNG cần nhớ password
     *   - displayName, email, photoURL được lấy TỰ ĐỘNG từ Google
     *   - KHÔNG cần validate hay kiểm tra gì
     *   - Nhanh hơn (chỉ 1-2 click)
     */
    const handleGoogleRegister = async () => {
        // ── Bật loading cho nút Google ──
        setIsGoogleLoading(true);
        setError("");

        // ── Gọi loginWithGoogle() từ AuthContext ──
        // Mở popup Google → user chọn tài khoản → Firebase xác thực
        const result = await loginWithGoogle();

        // ── Tắt loading ──
        setIsGoogleLoading(false);

        // ── Xử lý kết quả ──
        if (result.error) {
            // Có lỗi → Hiển thị thông báo
            setError(result.error);
        } else if (result.cancelled) {
            // User đóng popup → Không làm gì (hành động có chủ đích)
        } else {
            // Đăng ký/Đăng nhập Google thành công → Chuyển đến Dashboard
            navigate("/home");
        }
    };

    // ══════════════════════════════════════════
    // RENDER
    // ══════════════════════════════════════════

    return (
        <AuthLayout title="Đăng Ký">
            {/* ── Form đăng ký bằng email/password ── */}
            <form
                onSubmit={handleSubmit}
                style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "1rem",
                }}
            >
                {/* Thông báo lỗi - hiển thị trong box đỏ nhạt */}
                {error && (
                    <div
                        style={{
                            color: "#dc2626",
                            fontSize: "14px",
                            padding: "0.5rem 0.75rem",
                            backgroundColor: "#fef2f2",
                            borderRadius: "6px",
                            border: "1px solid #fecaca",
                        }}
                    >
                        ⚠️ {error}
                    </div>
                )}

                {/* Input: Tên người dùng */}
                <div>
                    <label
                        style={{
                            display: "block",
                            marginBottom: "0.5rem",
                            fontWeight: "500",
                        }}
                    >
                        Tên người dùng
                    </label>
                    <input
                        type="text"
                        name="username"
                        value={form.username}
                        onChange={handleChange}
                        placeholder="Nguyễn Văn A"
                        style={{
                            width: "100%",
                            padding: "0.75rem",
                            borderRadius: "4px",
                            border: "1px solid #d1d5db",
                        }}
                    />
                </div>

                {/* Input: Email */}
                <div>
                    <label
                        style={{
                            display: "block",
                            marginBottom: "0.5rem",
                            fontWeight: "500",
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
                            padding: "0.75rem",
                            borderRadius: "4px",
                            border: "1px solid #d1d5db",
                        }}
                    />
                </div>

                {/* Input: Mật khẩu */}
                <div>
                    <label
                        style={{
                            display: "block",
                            marginBottom: "0.5rem",
                            fontWeight: "500",
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
                            padding: "0.75rem",
                            borderRadius: "4px",
                            border: "1px solid #d1d5db",
                        }}
                    />
                    {/**
                     * Gợi ý yêu cầu mật khẩu
                     * Hiển thị ngay dưới input password để user biết trước khi nhập.
                     * Firebase yêu cầu tối thiểu 6 ký tự.
                     */}
                    <p
                        style={{
                            fontSize: "12px",
                            color: "#9ca3af",
                            marginTop: "0.25rem",
                        }}
                    >
                        Mật khẩu phải có ít nhất 6 ký tự
                    </p>
                </div>

                {/* Nút Đăng Ký (email/password) */}
                <button
                    type="submit"
                    disabled={isSubmitting}
                    style={{
                        width: "100%",
                        padding: "0.75rem",
                        backgroundColor: "#4F46E5",
                        color: "#fff",
                        border: "none",
                        borderRadius: "4px",
                        fontWeight: "bold",
                        cursor: isSubmitting ? "not-allowed" : "pointer",
                        opacity: isSubmitting ? 0.7 : 1,
                        marginTop: "1rem",
                    }}
                >
                    {isSubmitting ? "Đang xử lý..." : "Đăng Ký"}
                </button>
            </form>

            {/**
             * ══════════════════════════════════════════
             * DIVIDER - Phân cách giữa 2 phương thức đăng ký
             * ══════════════════════════════════════════
             *
             * Pattern phổ biến: "───── hoặc ─────"
             * Giúp user nhận biết có 2 cách đăng ký khác nhau.
             */}
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
                        borderTop: "1px solid #d1d5db",
                    }}
                />
                <span
                    style={{
                        color: "#9ca3af",
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
                        borderTop: "1px solid #d1d5db",
                    }}
                />
            </div>

            {/**
             * ══════════════════════════════════════════
             * NÚT ĐĂNG KÝ BẰNG GOOGLE
             * ══════════════════════════════════════════
             *
             * Nằm NGOÀI thẻ <form> → type="button" (không trigger submit).
             * onClick → handleGoogleRegister() → loginWithGoogle()
             *
             * Firebase signInWithPopup() tự xử lý:
             *   - Nếu Google email chưa có → Tạo account mới
             *   - Nếu Google email đã có  → Đăng nhập luôn
             *   → User không cần phân biệt "đăng ký" hay "đăng nhập" bằng Google
             */}
            <button
                type="button"
                onClick={handleGoogleRegister}
                disabled={isGoogleLoading}
                style={{
                    width: "100%",
                    padding: "0.75rem",
                    backgroundColor: "#fff",
                    color: "#374151",
                    border: "1px solid #d1d5db",
                    borderRadius: "4px",
                    fontWeight: "600",
                    cursor: isGoogleLoading ? "not-allowed" : "pointer",
                    opacity: isGoogleLoading ? 0.7 : 1,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "0.5rem",
                    fontSize: "14px",
                    transition: "background-color 0.2s ease",
                }}
                onMouseEnter={(e) => {
                    if (!isGoogleLoading) e.target.style.backgroundColor = "#f9fafb";
                }}
                onMouseLeave={(e) => {
                    e.target.style.backgroundColor = "#fff";
                }}
            >
                {/* Google Logo SVG - 4 màu chính thức (xanh dương, xanh lá, vàng, đỏ) */}
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
                {/* Text nút - thay đổi theo trạng thái loading */}
                {isGoogleLoading ? "Đang xử lý..." : "Đăng ký bằng Google"}
            </button>

            {/* Link chuyển sang trang Login */}
            <p
                style={{
                    marginTop: "1.5rem",
                    textAlign: "center",
                    fontSize: "14px",
                }}
            >
                Đã có tài khoản?{" "}
                <Link
                    to="/login"
                    style={{ color: "#4F46E5", textDecoration: "none" }}
                >
                    Đăng nhập ngay
                </Link>
            </p>
        </AuthLayout>
    );
}
