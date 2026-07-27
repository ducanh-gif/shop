/**
 * ============================================================
 * Layout: AuthLayout - Layout dành cho Đăng ký / Đăng nhập
 * Theme: NutriHealth (Xanh lá cây tươi mát & Sức khỏe)
 * ============================================================
 */

import React from "react";

const AuthLayout = ({ children, title }) => {
    return (
        <div
            style={{
                display: "flex",
                minHeight: "100vh",
                fontFamily: "'Plus Jakarta Sans', 'Segoe UI', Roboto, sans-serif",
                backgroundColor: "#f0fdf4",
            }}
        >
            {/* ── Bên trái: Banner quảng bá NutriHealth ── */}
            <div
                style={{
                    flex: 1.2,
                    background: "linear-gradient(135deg, #1a3a2f 0%, #059669 100%)",
                    color: "#ffffff",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    padding: "4rem",
                    position: "relative",
                    overflow: "hidden",
                }}
            >
                {/* Họa tiết trang trí chìm phía sau */}
                <div
                    style={{
                        position: "absolute",
                        top: "-10%",
                        right: "-10%",
                        width: "350px",
                        height: "350px",
                        background: "rgba(255, 255, 255, 0.05)",
                        borderRadius: "50%",
                        pointerEvents: "none",
                    }}
                />
                <div
                    style={{
                        position: "absolute",
                        bottom: "-5%",
                        left: "-5%",
                        width: "250px",
                        height: "250px",
                        background: "rgba(255, 255, 255, 0.03)",
                        borderRadius: "50%",
                        pointerEvents: "none",
                    }}
                />

                {/* Nội dung Banner */}
                <div style={{ relative: 1, zIndex: 1, maxWidth: "520px" }}>
                    <div
                        style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "0.5rem",
                            backgroundColor: "rgba(255, 255, 255, 0.15)",
                            padding: "0.4rem 1rem",
                            borderRadius: "20px",
                            fontSize: "14px",
                            fontWeight: "600",
                            marginBottom: "1.5rem",
                            backdropFilter: "blur(4px)",
                        }}
                    >
                        🌱 <span>NutriHealth Platform</span>
                    </div>

                    <h1
                        style={{
                            fontSize: "2.5rem",
                            fontWeight: "800",
                            lineHeight: "1.2",
                            marginBottom: "1.2rem",
                            letterSpacing: "-0.5px",
                        }}
                    >
                        Hành Trình Sống Khỏe Mỗi Ngày
                    </h1>

                    <p
                        style={{
                            fontSize: "1.05rem",
                            lineHeight: "1.6",
                            color: "#a7f3d0",
                            fontWeight: "400",
                        }}
                    >
                        Đồng hành cùng NutriHealth để theo dõi chế độ dinh dưỡng, xây dựng
                        thói quen lành mạnh và nhận lời khuyên chuyên sâu từ trợ lý AI thông minh.
                    </p>
                </div>
            </div>

            {/* ── Bên phải: Khung chứa Form Đăng nhập / Đăng ký ── */}
            <div
                style={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    padding: "2.5rem 1.5rem",
                    backgroundColor: "#f8fafc",
                }}
            >
                <div
                    style={{
                        width: "100%",
                        maxWidth: "420px",
                        padding: "2.5rem",
                        background: "#ffffff",
                        borderRadius: "16px",
                        boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.05), 0 8px 10px -6px rgba(0, 0, 0, 0.01)",
                        border: "1px solid #e2e8f0",
                    }}
                >
                    <h2
                        style={{
                            textAlign: "center",
                            marginBottom: "1.75rem",
                            color: "#1a3a2f",
                            fontSize: "1.6rem",
                            fontWeight: "700",
                            letterSpacing: "-0.3px",
                        }}
                    >
                        {title}
                    </h2>

                    {children}
                </div>
            </div>
        </div>
    );
};

export default AuthLayout;