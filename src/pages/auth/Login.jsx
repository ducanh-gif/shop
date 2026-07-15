/**
 * ============================================================
 * Page: Login - Trang Đăng Nhập
 * ============================================================
 *
 * Mục đích:
 *   - Cho phép user đăng nhập bằng 2 phương thức:
 *     1. Email + Password (truyền thống)
 *     2. Google Account (OAuth - đăng nhập 1 click)
 *   - Xác thực thông tin qua Firebase Authentication.
 *   - Sau khi đăng nhập thành công → redirect về /dashboard.
 *
 * Luồng hoạt động (Email/Password):
 *   1. User nhập email + password vào form.
 *   2. User bấm nút "Đăng Nhập" → handleSubmit() được gọi.
 *   3. Validate: kiểm tra form có trống không.
 *   4. Gọi login(email, password) từ AuthContext.
 *   5. Nếu thành công → navigate("/dashboard")
 *   6. Nếu thất bại → hiển thị thông báo lỗi.
 *
 * Luồng hoạt động (Google):
 *   1. User bấm nút "Đăng nhập bằng Google".
 *   2. handleGoogleLogin() được gọi.
 *   3. Gọi loginWithGoogle() từ AuthContext.
 *   4. Popup Google hiện lên → user chọn tài khoản.
 *   5. Nếu thành công → navigate("/dashboard")
 *   6. Nếu user đóng popup → không làm gì (cancelled).
 *   7. Nếu lỗi → hiển thị thông báo lỗi.
 *
 * Các hook sử dụng:
 *   - useState:    Quản lý state local (form data, error, loading)
 *   - useAuth:     Lấy hàm login(), loginWithGoogle() từ AuthContext
 *   - useNavigate: Điều hướng bằng code (programmatic navigation)
 *
 * Route: /login (được bảo vệ bởi GuestRoute - chỉ guest truy cập)
 * ============================================================
 */

import { useState } from "react";

// ── Import từ react-router-dom ──
// useNavigate: Hook cho phép chuyển trang bằng JavaScript code
//              Thay vì dùng <a href="..."> (reload trang),
//              navigate() chuyển trang mà KHÔNG reload (SPA behavior).
// Link:        Component thay thế thẻ <a> trong React Router.
//              <Link to="/register"> thay cho <a href="/register">
//              Khác biệt: Link KHÔNG reload trang, chỉ thay đổi URL và render component.
import { useNavigate, Link } from "react-router-dom";

// ── Import custom hook và layout ──
import { useAuth } from "../../context/AuthContext";
import AuthLayout from "../../layouts/AuthLayout";

export default function Login() {
    // ══════════════════════════════════════════
    // HOOKS - Khởi tạo các hook cần thiết
    // ══════════════════════════════════════════

    // ── useAuth(): Lấy các hàm authentication từ AuthContext ──
    // Destructure lấy:
    //   - login:           Đăng nhập bằng email/password
    //   - loginWithGoogle: Đăng nhập bằng Google (signInWithPopup)
    const { login, loginWithGoogle } = useAuth();

    // ── useNavigate(): Tạo function navigate ──
    // navigate("/path")       → Chuyển đến /path (thêm vào history)
    // navigate("/path", { replace: true }) → Chuyển và thay thế history entry
    // navigate(-1)            → Quay lại trang trước (giống nút Back)
    const navigate = useNavigate();

    // ══════════════════════════════════════════
    // STATE - Quản lý trạng thái local
    // ══════════════════════════════════════════

    // ── State form: Lưu trữ dữ liệu nhập vào ──
    // Dùng object thay vì 2 useState riêng lẻ để dễ quản lý và mở rộng
    // (ví dụ: thêm field "rememberMe" sau này chỉ cần thêm vào object)
    const [form, setForm] = useState({
        email: "",      // Email người dùng nhập
        password: "",   // Mật khẩu người dùng nhập
    });

    // ── State error: Lưu thông báo lỗi hiển thị cho user ──
    // Rỗng ("") = không có lỗi, có giá trị = hiển thị thông báo đỏ
    const [error, setError] = useState("");

    // ── State isSubmitting: Trạng thái đang gửi form (email/password) ──
    // true = đang xử lý (disable nút, hiện "Đang xử lý...")
    // false = sẵn sàng nhận submit mới
    const [isSubmitting, setIsSubmitting] = useState(false);

    // ── State isGoogleLoading: Trạng thái đang đăng nhập Google ──
    // Tách riêng với isSubmitting để 2 nút hoạt động độc lập:
    //   - Khi bấm Google → chỉ disable nút Google, form vẫn hoạt động
    //   - Khi submit form → chỉ disable nút Submit, Google vẫn hoạt động
    const [isGoogleLoading, setIsGoogleLoading] = useState(false);

    // ══════════════════════════════════════════
    // EVENT HANDLERS - Xử lý sự kiện
    // ══════════════════════════════════════════

    /**
     * handleChange - Xử lý khi user gõ vào input
     *
     * Sử dụng kỹ thuật "Computed Property Name" của ES6:
     *   [e.target.name]: e.target.value
     *
     * Ví dụ: Nếu input có name="email" và user gõ "a@b.com":
     *   → e.target.name = "email"
     *   → e.target.value = "a@b.com"
     *   → setForm({ ...form, email: "a@b.com" })
     *
     * Spread operator (...form) giữ lại các field khác không thay đổi.
     *
     * @param {Event} e - Sự kiện onChange từ input element
     */
    const handleChange = (e) => {
        setForm({
            ...form,                        // Giữ nguyên các field cũ
            [e.target.name]: e.target.value, // Cập nhật field đang thay đổi
        });

        // Xóa thông báo lỗi khi user bắt đầu gõ lại
        // → UX tốt hơn: không để lỗi cũ hiển thị khi user đang sửa
        if (error) {
            setError("");
        }
    };

    /**
     * handleSubmit - Xử lý khi user bấm nút Đăng Nhập (email/password)
     *
     * Đây là hàm async vì login() từ AuthContext trả về Promise
     * (gọi Firebase signInWithEmailAndPassword).
     *
     * Luồng xử lý:
     *   1. Ngăn form reload trang (e.preventDefault)
     *   2. Validate dữ liệu đầu vào
     *   3. Bật trạng thái loading
     *   4. Gọi login() từ AuthContext
     *   5. Kiểm tra kết quả → thành công/thất bại
     *   6. Tắt trạng thái loading
     *
     * @param {Event} e - Sự kiện onSubmit từ form element
     */
    const handleSubmit = async (e) => {
        // ── Bước 1: Ngăn hành vi mặc định của form ──
        // Mặc định, khi submit form, trình duyệt sẽ reload trang.
        // preventDefault() ngăn điều đó → xử lý bằng JavaScript thay vì HTTP request.
        e.preventDefault();

        // ── Bước 2: Validate (Kiểm tra dữ liệu) ──
        // Kiểm tra xem user đã nhập đủ thông tin chưa
        if (!form.email || !form.password) {
            setError("Vui lòng nhập đầy đủ thông tin!");
            return; // Dừng hàm, không tiếp tục xử lý
        }

        // ── Bước 3: Bật trạng thái loading ──
        // Disable nút submit và hiển thị text "Đang xử lý..."
        setIsSubmitting(true);

        // ── Bước 4: Gọi hàm login từ AuthContext ──
        // login() là async function, trả về:
        //   - { success: true }  nếu đăng nhập thành công
        //   - { error: "..." }   nếu thất bại
        const result = await login(form.email, form.password);

        // ── Bước 5: Tắt trạng thái loading ──
        setIsSubmitting(false);

        // ── Bước 6: Xử lý kết quả ──
        if (result.error) {
            // Đăng nhập THẤT BẠI → Hiển thị thông báo lỗi
            setError(result.error);
        } else {
            // Đăng nhập THÀNH CÔNG → Chuyển đến trang Dashboard
            // navigate() thay đổi URL và render component tương ứng
            // mà KHÔNG reload trang (Single Page Application behavior)
            navigate("/home");
        }
    };

    /**
     * handleGoogleLogin - Xử lý đăng nhập bằng Google
     *
     * Khi user bấm nút "Đăng nhập bằng Google":
     *   1. Bật trạng thái loading cho nút Google
     *   2. Gọi loginWithGoogle() từ AuthContext
     *      → Mở popup Google → user chọn tài khoản
     *   3. Xử lý kết quả:
     *      - success: true   → Chuyển đến /dashboard
     *      - cancelled: true → User đóng popup, không làm gì
     *      - error: "..."    → Hiển thị thông báo lỗi
     *   4. Tắt trạng thái loading
     *
     * Tại sao tách riêng isGoogleLoading thay vì dùng chung isSubmitting?
     *   - Khi popup Google đang mở, user vẫn có thể tương tác với form
     *   - Nếu dùng chung → cả form và nút Google đều bị disable → UX kém
     *   - Tách riêng cho phép 2 flow hoạt động độc lập
     */
    const handleGoogleLogin = async () => {
        // ── Bật loading cho nút Google ──
        setIsGoogleLoading(true);
        // Xóa lỗi cũ (nếu có) trước khi thử lại
        setError("");

        // ── Gọi loginWithGoogle() từ AuthContext ──
        // Hàm này sẽ mở popup Google và xử lý xác thực
        const result = await loginWithGoogle();

        // ── Tắt loading ──
        setIsGoogleLoading(false);

        // ── Xử lý kết quả ──
        if (result.error) {
            // Có lỗi (popup bị chặn, lỗi mạng...) → Hiển thị thông báo
            setError(result.error);
        } else if (result.cancelled) {
            // User tự đóng popup → KHÔNG hiển thị lỗi
            // Đây là hành động có chủ đích, không phải lỗi
            // → Không làm gì, user có thể thử lại khi muốn
        } else {
            // Đăng nhập Google THÀNH CÔNG → Chuyển đến Dashboard
            navigate("/home");
        }
    };

    // ══════════════════════════════════════════
    // RENDER - Giao diện người dùng
    // ══════════════════════════════════════════

    return (
        /**
         * AuthLayout: Layout component bọc bên ngoài.
         * Cung cấp giao diện 2 cột:
         *   - Bên trái: Banner giới thiệu (màu tím)
         *   - Bên phải: Form (children được render ở đây)
         */
        <AuthLayout title="Đăng Nhập">
            {/* ── Form đăng nhập bằng email/password ── */}
            {/* onSubmit: Gọi handleSubmit khi user submit form (bấm nút hoặc Enter) */}
            <form
                onSubmit={handleSubmit}
                style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "1rem", // Khoảng cách giữa các phần tử con
                }}
            >
                {/**
                 * ── Hiển thị thông báo lỗi (nếu có) ──
                 * Conditional rendering: chỉ render khi `error` có giá trị (truthy).
                 * Cú pháp: {condition && <JSX />}
                 *   - condition = true  → render JSX
                 *   - condition = false → không render gì (null)
                 */}
                {error && (
                    <div
                        style={{
                            color: "#dc2626",
                            fontSize: "14px",
                            marginBottom: "0.5rem",
                            padding: "0.5rem 0.75rem",
                            backgroundColor: "#fef2f2",
                            borderRadius: "6px",
                            border: "1px solid #fecaca",
                        }}
                    >
                        ⚠️ {error}
                    </div>
                )}

                {/* ── Input Email ── */}
                <div>
                    <label
                        style={{
                            display: "block",       // Label chiếm 1 dòng riêng
                            marginBottom: "0.5rem",  // Khoảng cách với input bên dưới
                            fontWeight: "500",       // Độ đậm vừa phải
                        }}
                    >
                        Email
                    </label>
                    <input
                        type="email"                     // Trình duyệt validate format email
                        name="email"                     // Dùng cho handleChange → [e.target.name]
                        value={form.email}               // Controlled component: giá trị từ state
                        onChange={handleChange}           // Cập nhật state khi user gõ
                        placeholder="example@gmail.com"  // Gợi ý format email
                        style={{
                            width: "100%",
                            padding: "0.75rem",
                            borderRadius: "4px",
                            border: "1px solid #d1d5db",
                        }}
                    />
                </div>

                {/* ── Input Mật khẩu ── */}
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
                        type="password"                  // Ẩn ký tự nhập (hiện dấu •)
                        name="password"                  // Dùng cho handleChange
                        value={form.password}            // Controlled component
                        onChange={handleChange}           // Cập nhật state khi user gõ
                        placeholder="••••••••"           // Gợi ý đây là field mật khẩu
                        style={{
                            width: "100%",
                            padding: "0.75rem",
                            borderRadius: "4px",
                            border: "1px solid #d1d5db",
                        }}
                    />
                </div>

                {/* ── Nút Submit (Đăng nhập bằng email/password) ── */}
                <button
                    type="submit"                    // Kích hoạt onSubmit của form
                    disabled={isSubmitting}           // Disable khi đang xử lý (tránh double submit)
                    style={{
                        width: "100%",
                        padding: "0.75rem",
                        backgroundColor: "#4F46E5",  // Màu tím Indigo (brand color)
                        color: "#fff",
                        border: "none",
                        borderRadius: "4px",
                        fontWeight: "bold",
                        cursor: isSubmitting ? "not-allowed" : "pointer", // Thay đổi con trỏ chuột
                        opacity: isSubmitting ? 0.7 : 1,                 // Mờ đi khi đang xử lý
                        marginTop: "1rem",
                    }}
                >
                    {/**
                     * Conditional rendering cho text nút:
                     * - Đang xử lý (isSubmitting = true)  → "Đang xử lý..."
                     * - Sẵn sàng (isSubmitting = false)    → "Đăng Nhập"
                     */}
                    {isSubmitting ? "Đang xử lý..." : "Đăng Nhập"}
                </button>
            </form>

            {/**
             * ══════════════════════════════════════════
             * DIVIDER - Phân cách giữa 2 phương thức đăng nhập
             * ══════════════════════════════════════════
             *
             * Thiết kế: ────── hoặc ──────
             * Dùng flexbox với 2 đường kẻ (<hr>) và text "hoặc" ở giữa.
             * Pattern phổ biến trong các trang login hiện đại
             * (Google, Facebook, GitHub... đều dùng kiểu này).
             */}
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    margin: "1.5rem 0",
                    gap: "0.75rem",
                }}
            >
                {/* Đường kẻ bên trái */}
                <hr
                    style={{
                        flex: 1,
                        border: "none",
                        borderTop: "1px solid #d1d5db",
                    }}
                />
                {/* Text "hoặc" ở giữa */}
                <span
                    style={{
                        color: "#9ca3af",
                        fontSize: "13px",
                        fontWeight: "500",
                    }}
                >
                    hoặc
                </span>
                {/* Đường kẻ bên phải */}
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
             * NÚT ĐĂNG NHẬP BẰNG GOOGLE
             * ══════════════════════════════════════════
             *
             * Khi bấm → handleGoogleLogin() được gọi:
             *   1. Mở popup chọn tài khoản Google
             *   2. User chọn tài khoản → Google xác thực
             *   3. Firebase nhận token → tạo/liên kết tài khoản
             *   4. onAuthStateChanged cập nhật state → navigate dashboard
             *
             * Tại sao dùng type="button" thay vì type="submit"?
             *   - type="submit" sẽ trigger onSubmit của form cha
             *   - type="button" chỉ trigger onClick → handleGoogleLogin()
             *   - Nút này KHÔNG thuộc form email/password
             *     (được đặt NGOÀI thẻ <form>)
             *
             * Icon Google SVG:
             *   Dùng inline SVG thay vì <img> để:
             *   - Không cần tải file ảnh riêng
             *   - Có thể thay đổi màu sắc bằng CSS
             *   - Luôn sắc nét ở mọi kích thước (vector, không bị vỡ pixel)
             */}
            <button
                type="button"
                onClick={handleGoogleLogin}
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
                {/**
                 * Google Logo SVG
                 *
                 * Đây là logo Google chính thức (4 màu: xanh, đỏ, vàng, xanh lá).
                 * Dùng inline SVG để không phụ thuộc vào file ảnh bên ngoài.
                 * viewBox="0 0 24 24" → Kích thước gốc 24x24, width/height scale xuống 18px.
                 */}
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
                {/**
                 * Text nút - Thay đổi theo trạng thái:
                 *   - isGoogleLoading = true  → "Đang xử lý..."
                 *   - isGoogleLoading = false → "Đăng nhập bằng Google"
                 */}
                {isGoogleLoading ? "Đang xử lý..." : "Đăng nhập bằng Google"}
            </button>

            {/**
             * ── Link chuyển sang trang Đăng ký ──
             *
             * Sử dụng <Link> từ react-router-dom thay vì thẻ <a> thông thường.
             *
             * Tại sao dùng <Link> thay vì <a>?
             *   - <a href="/register">:  Reload TOÀN BỘ trang → mất state, chậm
             *   - <Link to="/register">: Chỉ thay đổi URL và render component mới
             *                            → KHÔNG reload, giữ state, nhanh (SPA)
             *
             * Đây là nguyên lý cốt lõi của Single Page Application (SPA):
             * Client-side routing thay vì server-side navigation.
             */}
            <p
                style={{
                    marginTop: "1.5rem",
                    textAlign: "center",
                    fontSize: "14px",
                }}
            >
                Chưa có tài khoản?{" "}
                <Link
                    to="/register"
                    style={{ color: "#4F46E5", textDecoration: "none" }}
                >
                    Đăng ký ngay
                </Link>
            </p>
        </AuthLayout>
    );
}
