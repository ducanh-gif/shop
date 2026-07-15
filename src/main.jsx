/**
 * ============================================================
 * File: main.jsx - Entry Point (Điểm khởi đầu của ứng dụng)
 * ============================================================
 *
 * Đây là file đầu tiên được Vite thực thi khi chạy ứng dụng.
 * Nhiệm vụ chính:
 *   1. Tìm phần tử DOM có id="root" trong index.html.
 *   2. Tạo React Root và render toàn bộ ứng dụng vào đó.
 *
 * Cấu trúc bọc (wrapper) từ ngoài vào trong:
 *   <StrictMode>        → Bật chế độ kiểm tra lỗi nghiêm ngặt (chỉ trong development)
 *     <BrowserRouter>   → Cung cấp hệ thống routing cho toàn bộ ứng dụng
 *       <App />         → Component gốc chứa toàn bộ logic routing
 *
 * Tại sao đặt BrowserRouter ở đây (main.jsx) thay vì App.jsx?
 *   - BrowserRouter cần bọc BÊN NGOÀI mọi component sử dụng routing.
 *   - Đặt ở main.jsx đảm bảo rằng mọi component trong App đều
 *     có thể sử dụng useNavigate, useParams, useLocation, <Link>...
 *   - Đây là best practice được khuyến nghị bởi React Router docs.
 * ============================================================
 */

// ── Import thư viện React core ──
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

// ── Import BrowserRouter ──
// BrowserRouter sử dụng HTML5 History API (pushState, replaceState)
// để giữ URL đồng bộ với giao diện mà KHÔNG reload trang.
// Khác với HashRouter (dùng #hash), BrowserRouter tạo URL sạch: /login, /dashboard
import { BrowserRouter } from "react-router-dom";

// ── Import CSS global ──
import "./index.css";

// ── Import component gốc ──
import App from "./App.jsx";

// ── Render ứng dụng ──
// createRoot() là API mới của React 18+ (thay thế ReactDOM.render cũ)
// document.getElementById("root") tìm <div id="root"> trong index.html
createRoot(document.getElementById("root")).render(
    <StrictMode>
        {/* BrowserRouter phải bọc bên ngoài App để cung cấp routing context */}
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </StrictMode>
);
