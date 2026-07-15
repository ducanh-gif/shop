const zalopayConfig = {
    // App ID — ZaloPay cung cấp khi đăng ký merchant
    app_id: "2553",

    // Key1 — Dùng để TẠO chữ ký (MAC) khi GỬI request đi
    key1: "PcY4iZIKFCIdgZvA6ueMcMHHUbRLYjPL",

    // Key2 — Dùng để XÁC MINH chữ ký khi NHẬN callback về
    key2: "kLtgPl8YESDmyABkQgeZByOUJsbcpNI2",

    // Các URL API của ZaloPay (Sandbox = môi trường test)
    endpoint: {
        create: "https://sb-openapi.zalopay.vn/v2/create",   // Tạo đơn
        query: "https://sb-openapi.zalopay.vn/v2/query",      // Kiểm tra trạng thái
    },
};

module.exports = zalopayConfig;