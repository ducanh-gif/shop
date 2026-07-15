/**
 * ============================================================
 * Component: ProtectedRoute
 * ============================================================
 *
 * Mục đích:
 *   - Bảo vệ các route yêu cầu đăng nhập (authentication).
 *   - Nếu user CHƯA đăng nhập → tự động redirect về trang /login.
 *   - Nếu user ĐÃ đăng nhập → render nội dung con bình thường.
 *
 * Cách hoạt động:
 *   1. Lấy thông tin user từ AuthContext thông qua custom hook useAuth().
 *   2. Kiểm tra user có tồn tại hay không:
 *      - user === null  →  chưa đăng nhập  →  <Navigate to="/login" />
 *      - user !== null  →  đã đăng nhập    →  <Outlet /> (render route con)
 *
 * Sử dụng:
 *   Trong App.jsx, bọc các route cần bảo vệ bên trong <ProtectedRoute>:
 *
 *   <Route element={<ProtectedRoute />}>
 *       <Route path="/dashboard" element={<Dashboard />} />
 *       <Route path="/profile"   element={<Profile />} />
 *   </Route>
 *
 * Lưu ý:
 *   - Component này dùng <Outlet /> từ react-router-dom v6+
 *     để render các route con (nested routes).
 *   - Prop `replace` trong <Navigate> đảm bảo rằng trang login
 *     THAY THẾ trang hiện tại trong history stack, tránh user
 *     bấm nút "Back" quay lại trang bị chặn.
 * ============================================================
 */

import React from "react";
// Navigate: Component dùng để redirect (điều hướng) sang URL khác
// Outlet:   Component dùng để render các route con (nested routes)
import { Navigate, Outlet } from "react-router-dom";
// useAuth: Custom hook lấy thông tin authentication từ AuthContext
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = () => {
    // ── Bước 1: Lấy thông tin user từ context ──
    // Destructure lấy object `user` từ AuthContext.
    // Nếu user đã đăng nhập, `user` sẽ là object chứa thông tin (id, email, name, role...).
    // Nếu user chưa đăng nhập, `user` sẽ là null.
    const { user } = useAuth();

    // ── Bước 2: Kiểm tra trạng thái đăng nhập ──
    // Nếu `user` không tồn tại (null/undefined) → chưa đăng nhập
    if (!user) {
        // Redirect về trang /login
        // - `to="/login"`: URL đích cần redirect đến
        // - `replace`:     Thay thế entry hiện tại trong history stack
        //                  (tránh user bấm Back quay lại trang protected)
        return <Navigate to="/login" replace />;
    }

    // ── Bước 3: User đã đăng nhập → Render route con ──
    // <Outlet /> là placeholder cho các route con (nested routes).
    // React Router sẽ tự động render component tương ứng với URL hiện tại.
    // Ví dụ: nếu URL là /dashboard → Outlet sẽ render <Dashboard />
    return <Outlet />;
};

export default ProtectedRoute;
