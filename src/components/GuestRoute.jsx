/**
 * ============================================================
 * Component: GuestRoute
 * ============================================================
 *
 * Mục đích:
 *   - Ngược lại với ProtectedRoute: chỉ cho phép user CHƯA đăng nhập truy cập.
 *   - Nếu user ĐÃ đăng nhập → tự động redirect về /dashboard.
 *   - Nếu user CHƯA đăng nhập → render nội dung con (login, register...).
 *
 * Tại sao cần GuestRoute?
 *   - Khi user đã đăng nhập rồi, không cần phải thấy trang Login/Register nữa.
 *   - Nếu user gõ thủ công URL /login khi đã đăng nhập → redirect về dashboard.
 *   - Đây là pattern phổ biến trong các ứng dụng web thực tế.
 *
 * Sử dụng:
 *   <Route element={<GuestRoute />}>
 *       <Route path="/login"    element={<Login />} />
 *       <Route path="/register" element={<Register />} />
 *   </Route>
 * ============================================================
 */

import React from "react";
// Navigate: Dùng để redirect sang URL khác
// Outlet:   Dùng để render route con (nested routes)
import { Navigate, Outlet } from "react-router-dom";
// useAuth: Custom hook lấy thông tin user từ AuthContext
import { useAuth } from "../context/AuthContext";

const GuestRoute = () => {
    // ── Lấy thông tin user từ context ──
    const { user } = useAuth();

    // ── Nếu user ĐÃ đăng nhập → Redirect về /dashboard ──
    // User đã login rồi thì không cần vào trang login/register nữa
    if (user) {
        return <Navigate to="/home" replace />;
    }

    // ── User CHƯA đăng nhập → Cho phép truy cập (render route con) ──
    return <Outlet />;
};

export default GuestRoute;
