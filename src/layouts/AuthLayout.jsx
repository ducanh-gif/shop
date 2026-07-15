import React from "react";

const AuthLayout = ({ children, title }) => {
    return (
        <div
            style={{
                display: "flex",
                minHeight: "100vh",
                fontFamily: "sans-serif",
            }}
        >
            {/* Bên trái: Banner (Ẩn trên mobile nếu responsive) */}
            <div
                style={{
                    flex: 1,
                    backgroundColor: "#4F46E5",
                    color: "#fff",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    padding: "3rem",
                }}
            >
                <h1>Welcome to Our Platform</h1>
                <p>
                    Trải nghiệm hệ thống quản lý mượt mà được xây dựng bởi React
                    Senior Dev.
                </p>
            </div>

            {/* Bên phải: Form Đăng nhập / Đăng ký */}
            <div
                style={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    padding: "2rem",
                    backgroundColor: "#f9fafb",
                }}
            >
                <div
                    style={{
                        width: "100%",
                        maxWidth: "400px",
                        padding: "2rem",
                        background: "#fff",
                        borderRadius: "8px",
                        boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
                    }}
                >
                    <h2
                        style={{
                            textAlign: "center",
                            marginBottom: "1.5rem",
                            color: "#111827",
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
