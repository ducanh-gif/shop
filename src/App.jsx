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
 * │  │  /login    → Trang đăng nhập                          │  │
 * │  │  /register → Trang đăng ký                            │  │
 * │  └────────────────────────────────────────────────────┘  │
 * │                                                          │
 * │  ┌─ ProtectedRoute (yêu cầu đăng nhập) ──────────────┐   │
 * │  │  /home, /shop, /cart...                           │   │
 * │  └───────────────────────────────────────────────────┘   │
 * │                                                          │
 * │  /*        → Trang 404 (URL không tồn tại)               │
 * │                                                          │
 * └──────────────────────────────────────────────────────────┘
 */

import React from "react";

// ── Import các component routing từ react-router-dom ──
import { Routes, Route, Navigate } from "react-router-dom";

// ── Import AuthProvider ──
import { AuthProvider } from "./context/AuthContext";

// ── Import Route Guards (Bảo vệ route) ──
import ProtectedRoute from "./components/ProtectedRoute";
import GuestRoute from "./components/GuestRoute";

// ── Import các Page components ──
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

// ── Import Chatbot AI Component ──
import Chatbot from './components/Chatbot';

/**
 * Component App
 *
 * Đây là component gốc (root component) của ứng dụng.
 */
function App() {
    return (
        <AuthProvider>
            {/* ── Routes Navigation ── */}
            <Routes>
                {/* Trang chủ mặc định -> Chuyển hướng sang Login */}
                <Route
                    path="/"
                    element={<Navigate to="/login" replace />}
                />

                {/* ════════════════════════════════════════════
                 * GUEST ROUTES (Chỉ dành cho user CHƯA đăng nhập)
                 * ════════════════════════════════════════════ */}
                <Route element={<GuestRoute />}>
                    <Route path="login" element={<Login />} />
                    <Route path="register" element={<Register />} />
                </Route>

                {/* ════════════════════════════════════════════
                 * PROTECTED ROUTES (Yêu cầu đăng nhập)
                 * ════════════════════════════════════════════ */}
                <Route element={<ProtectedRoute />}>
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

                {/* ════════════════════════════════════════════
                 * CATCH-ALL ROUTE (Trang 404 - Not Found)
                 * ════════════════════════════════════════════ */}
                <Route
                    path="*"
                    element={<Navigate to="/login" replace />}
                />
            </Routes>

            {/* 🤖 KHUNG CHATBOT AI (Nút chat luôn hiển thị nổi ở góc dưới bên phải màn hình) */}
            <Chatbot />
        </AuthProvider>
    );
}

export default App;