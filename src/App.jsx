/**
 * ============================================================
 * File: App.jsx - Component gốc chứa toàn bộ cấu hình Routing
 * ============================================================
 *
 * Đây là "bản đồ" điều hướng của ứng dụng.
 * Mọi URL trong app đều được định nghĩa tại đây.
 *
 * ┌──────────────────────────────────────────────────────────┐
 * │                  CẤU TRÚC ROUTE                          │
 * ├──────────────────────────────────────────────────────────┤
 * │                                                          │
 * │  /    → Redirect về /login (trang mặc định)              │
 * │                                                          │
 * │  ┌─ GuestRoute (chỉ cho guest - chưa đăng nhập) ──────┐  │
 * │  │  /login    → Trang đăng nhập                       │  │
 * │  │  /register → Trang đăng ký                         │  │
 * │  └────────────────────────────────────────────────────┘  │
 * │                                                          │
 * │  ┌─ ProtectedRoute (yêu cầu đăng nhập) ──────────────┐   │
 * │  │  /dashboard → Trang chính sau khi login           │   │
 * │  └───────────────────────────────────────────────────┘   │
 * │                                                          │
 * │  /*          → Trang 404 (URL không tồn tại)             │
 * │                                                          │
 * └──────────────────────────────────────────────────────────┘
 *
 * Luồng hoạt động (Flow):
 *
 *   [User mở app] → "/" → Redirect → "/login"
 *                                        ↓
 *                              [Nhập email + password]
 *                                        ↓
 *                              [Đăng nhập thành công]
 *                                        ↓
 *                              navigate("/dashboard")
 *                                        ↓
 *                              [ProtectedRoute kiểm tra]
 *                                        ↓
 *                              user !== null → ✅ Cho phép
 *                                        ↓
 *                              [Render Dashboard]
 *
 * Khái niệm quan trọng:
 *
 *   1. <Routes>: Container chứa tất cả các <Route>.
 *      React Router sẽ tìm Route có path khớp với URL hiện tại.
 *
 *   2. <Route>: Định nghĩa mapping giữa URL path và component.
 *      - path: URL pattern (ví dụ: "/login", "/dashboard")
 *      - element: Component sẽ được render khi URL khớp
 *
 *   3. <Route element={<Layout />}>: Route wrapper (không có path)
 *      - Dùng để bọc các route con với một layout/logic chung
 *      - Các route con sẽ render qua <Outlet /> trong Layout component
 *
 *   4. <Navigate>: Component redirect, chuyển hướng URL.
 *      - Dùng khi muốn tự động chuyển từ URL này sang URL khác
 *
 *   5. path="*": Wildcard, khớp với MỌI URL không được định nghĩa.
 *      - Dùng làm trang 404 Not Found.
 * ============================================================
 */

import React from "react";

// ── Import các component routing từ react-router-dom ──
// Routes:   Container bọc tất cả các Route, quản lý việc matching URL
// Route:    Định nghĩa một route (URL path → Component)
// Navigate: Component dùng để redirect (chuyển hướng) URL
import { Routes, Route, Navigate } from "react-router-dom";

// ── Import AuthProvider ──
// AuthProvider bọc toàn bộ ứng dụng, cung cấp authentication context
// (user, login, logout, register) cho mọi component con
import { AuthProvider } from "./context/AuthContext";

// ── Import Route Guards (Bảo vệ route) ──
// ProtectedRoute: Chỉ cho user ĐÃ đăng nhập truy cập (ví dụ: dashboard)
// GuestRoute:     Chỉ cho user CHƯA đăng nhập truy cập (ví dụ: login, register)
import ProtectedRoute from "./components/ProtectedRoute";
import GuestRoute from "./components/GuestRoute";

// ── Import các Page components ──
// Mỗi page tương ứng với một URL trong ứng dụng
import Login from "./pages/auth/Login";         // Trang đăng nhập   → /login
import Register from "./pages/auth/Register";   // Trang đăng ký     → /register
import Home from "./pages/user/Home";
import Science from "./pages/user/Science";
import Shop from "./pages/user/Shop";
import ProductDetail from "./pages/user/ProductDetail";
import Checkout from "./pages/user/Checkout";
import Consultation from "./pages/user/Consultation";
import ShopOrders from "./pages/user/ShopOrders";
import Wishlist from './pages/user/Wishlist';
import Rewards from './pages/user/Rewards';
import Cart from './pages/user/Cart';
import PaymentResult from './pages/user/PaymentResult';

/**
 * Component App
 *
 * Đây là component gốc (root component) của ứng dụng.
 * Chịu trách nhiệm:
 *   1. Cung cấp AuthProvider (authentication context) cho toàn bộ app.
 *   2. Định nghĩa tất cả các route và logic điều hướng.
 */
function App() {
    return (
        /**
         * ── AuthProvider ──
         * Bọc toàn bộ ứng dụng để cung cấp authentication context.
         * Mọi component con đều có thể truy cập user, login, logout, register
         * thông qua custom hook useAuth().
         *
         * Thứ tự bọc: BrowserRouter (main.jsx) → AuthProvider (App.jsx) → Routes
         * Lý do: Routes cần cả routing context VÀ auth context để hoạt động.
         */
        <AuthProvider>
            {/**
             * ── Routes ──
             * Container chứa tất cả các Route definitions.
             * React Router sẽ scan qua từng Route và render Route đầu tiên
             * có path khớp (match) với URL hiện tại trên trình duyệt.
             *
             * Chỉ MỘT route được render tại một thời điểm.
             */}
            <Routes>
                {/**
                 * ── Route: "/" (Trang chủ / Root) ──
                 * Khi user truy cập vào "/" (root URL), tự động redirect về "/login".
                 *
                 * - index: Đánh dấu đây là route mặc định cho path cha.
                 * - <Navigate to="/login" replace />: Redirect ngay lập tức
                 *   + to="/login": URL đích
                 *   + replace: Thay thế entry trong history (không tạo history mới)
                 *              → User bấm "Back" sẽ không quay lại "/"
                 */}
                <Route
                    path="/"
                    element={<Navigate to="/login" replace />}
                />

                {/**
                 * ════════════════════════════════════════════
                 * GUEST ROUTES (Chỉ dành cho user CHƯA đăng nhập)
                 * ════════════════════════════════════════════
                 *
                 * <Route element={<GuestRoute />}> là một "Layout Route":
                 *   - KHÔNG có prop `path` → không match URL trực tiếp
                 *   - Chỉ đóng vai trò wrapper/guard cho các route con
                 *   - GuestRoute kiểm tra: user ĐÃ login? → Redirect /dashboard
                 *   - Nếu chưa login → render <Outlet /> (tức route con bên trong)
                 *
                 * Tại sao dùng Layout Route thay vì bọc từng page?
                 *   - DRY (Don't Repeat Yourself): Không cần kiểm tra auth trong từng page
                 *   - Dễ bảo trì: Thêm/xóa route chỉ cần sửa ở đây
                 *   - Tách biệt concerns: Page chỉ lo UI, Route Guard lo logic auth
                 */}
                <Route element={<GuestRoute />}>
                    {/**
                     * ── Route: /login ──
                     * Trang đăng nhập.
                     * Chỉ hiển thị khi user CHƯA đăng nhập (được bảo vệ bởi GuestRoute).
                     * Sau khi đăng nhập thành công → navigate("/dashboard")
                     */}
                    <Route path="login" element={<Login />} />

                    {/**
                     * ── Route: /register ──
                     * Trang đăng ký tài khoản mới.
                     * Chỉ hiển thị khi user CHƯA đăng nhập (được bảo vệ bởi GuestRoute).
                     * Sau khi đăng ký thành công → navigate("/dashboard")
                     */}
                    <Route path="register" element={<Register />} />
                </Route>

                {/**
                 * ════════════════════════════════════════════
                 * PROTECTED ROUTES (Yêu cầu đăng nhập)
                 * ════════════════════════════════════════════
                 *
                 * <Route element={<ProtectedRoute />}> cũng là Layout Route:
                 *   - ProtectedRoute kiểm tra: user CHƯA login? → Redirect /login
                 *   - Nếu đã login → render <Outlet /> (route con bên trong)
                 *
                 * Mở rộng: Có thể thêm nhiều route protected ở đây:
                 *   <Route path="/profile"  element={<Profile />} />
                 *   <Route path="/settings" element={<Settings />} />
                 *   <Route path="/users"    element={<UserManagement />} />
                 */}
                <Route element={<ProtectedRoute />}>
                    {/**
                     * ── Route: /dashboard ──
                     * Trang chính sau khi đăng nhập.
                     * Hiển thị thông tin user và nút đăng xuất.
                     * Chỉ truy cập được khi đã đăng nhập (bảo vệ bởi ProtectedRoute).
                     */}
                    <Route path="home" element={<Home />} />
                    <Route path="/science" element={<Science />} />
                    <Route path="/shop" element={<Shop />} />
                    <Route path="shop/:id" element={<ProductDetail />} />
                    <Route path="checkout" element={<Checkout />} />
                    <Route path="consultation" element={<Consultation />} />
                    <Route path="shoporders" element={<ShopOrders />} />
                    <Route path="/wishlist" element={<Wishlist />} />
                    <Route path="/rewards" element={<Rewards />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/payment-result" element={<PaymentResult />} />

                </Route>

                {/**
                 * ════════════════════════════════════════════
                 * CATCH-ALL ROUTE (Trang 404 - Not Found)
                 * ════════════════════════════════════════════
                 *
                 * path="*" là wildcard, khớp với MỌI URL không được định nghĩa ở trên.
                 * Ví dụ: /abc, /xyz, /khong-ton-tai → đều vào route này.
                 *
                 * Hiện tại: Redirect về /login.
                 * Có thể thay bằng: element={<NotFound />} để hiện trang 404 đẹp hơn.
                 */}
                <Route
                    path="*"
                    element={<Navigate to="/login" replace />}
                />
            </Routes>
        </AuthProvider>
    );
}

export default App;
