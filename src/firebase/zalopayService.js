const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3001/api/zalopay";
// Tạo đơn hàng → trả về order_url để redirect
export const createZaloPayOrder = async (orderData) => {
    const response = await fetch(`${API_BASE_URL}/create-order`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
    });
    return await response.json();
};

// Kiểm tra trạng thái thanh toán
export const checkPaymentStatus = async (appTransId) => {
    const response = await fetch(`${API_BASE_URL}/check-status`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ app_trans_id: appTransId }),
    });
    return await response.json();
};

// Mã trạng thái
export const ZALOPAY_STATUS = {
    SUCCESS: 1,      // Đã thanh toán
    FAILED: 2,       // Thất bại
    PROCESSING: 3,   // Đang xử lý
};