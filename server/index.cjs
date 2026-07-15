const express = require("express");
const cors = require("cors");
const axios = require("axios");
const CryptoJS = require("crypto-js");
const zalopayConfig = require("./zalopay.config.cjs");

const app = express();
const PORT = 3001;

const allowedOrigins = [
  "https://demoshop1001.onrender.com", // Your production frontend
  "http://localhost:5173"               // Your local development frontend
];

const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps, curl, or postman)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true, // Crucial if your frontend sends cookies or tokens
  preflightContinue: false,
  optionsSuccessStatus: 204
};
// 1. Apply CORS middleware BEFORE any routes
app.use(cors(corsOptions));

// 2. Handle preflight (OPTIONS) requests explicitly
app.options("*", cors(corsOptions));                              // Cho phép frontend gọi
app.use(express.json());                      // Parse JSON body
app.use(express.urlencoded({ extended: true })); // Parse form data
const path = require("path");
app.post("/api/zalopay/create-order", async (req, res) => {
    const { amount, description, items, userId, orderId } = req.body;

    // ═══ BƯỚC 3.2.1: Tạo mã giao dịch duy nhất ═══
    // Format bắt buộc: yymmdd_xxxxx
    const now = new Date();
    const yy = String(now.getFullYear()).slice(-2);  // "26"
    const mm = String(now.getMonth() + 1).padStart(2, "0"); // "07"
    const dd = String(now.getDate()).padStart(2, "0"); // "08"
    const app_trans_id = `${yy}${mm}${dd}_${orderId}`;
    // Kết quả: "260708_ORD-ABC123"

    // ═══ BƯỚC 3.2.2: Chuẩn bị dữ liệu đơn hàng ═══
    const embed_data = JSON.stringify({
        redirecturl: '${process.env.FRONTEND_URL  || "http://localhost:5173"}/payment-result', // URL redirect về sau khi thanh toán
    });

    const order = {
        app_id: parseInt(zalopayConfig.app_id),  // 2553
        app_trans_id: app_trans_id,               // "260708_ORD-ABC123"
        app_user: userId,                         // Firebase UID
        app_time: Date.now(),                     // Milliseconds
        amount: parseInt(amount),                 // VND (số nguyên)
        item: JSON.stringify(items || []),         // JSON string
        description: description,                 // Hiển thị trên ZaloPay
        embed_data: embed_data,                   // URL redirect về
        bank_code: "",                            // "" = hiện tất cả
    };

    // ═══ BƯỚC 3.2.3: Tạo chữ ký MAC (QUAN TRỌNG NHẤT) ═══
    // Nối các field theo THỨ TỰ CHÍNH XÁC bằng dấu "|"
    const data = zalopayConfig.app_id + "|"
               + order.app_trans_id + "|"
               + order.app_user + "|"
               + order.amount + "|"
               + order.app_time + "|"
               + order.embed_data + "|"
               + order.item;

    // Mã hoá bằng HMAC-SHA256 với Key1
    order.mac = CryptoJS.HmacSHA256(data, zalopayConfig.key1).toString();

    // ═══ BƯỚC 3.2.4: Gửi request tới ZaloPay ═══
    const response = await axios.post(
        zalopayConfig.endpoint.create,  // https://sb-openapi.zalopay.vn/v2/create
        null,
        { params: order }
    );

    // ═══ BƯỚC 3.2.5: Trả kết quả cho frontend ═══
    res.json({
        ...response.data,          // { return_code, order_url, zp_trans_token }
        app_trans_id: order.app_trans_id,  // Thêm mã giao dịch để track
    });
});
app.post("/api/zalopay/callback", (req, res) => {
    const { data: dataStr, mac: reqMac } = req.body;

    // Xác minh: tạo MAC từ data + Key2 → so sánh với MAC ZaloPay gửi
    const mac = CryptoJS.HmacSHA256(dataStr, zalopayConfig.key2).toString();

    if (reqMac !== mac) {
        // MAC không khớp → request giả mạo, từ chối
        res.json({ return_code: -1, return_message: "MAC không hợp lệ" });
    } else {
        // MAC hợp lệ → cập nhật đơn hàng trong database
        const dataJson = JSON.parse(dataStr);
        // TODO: updateOrderStatus(dataJson.app_trans_id, "paid");
        res.json({ return_code: 1, return_message: "Thành công" });
    }
});
app.post("/api/zalopay/check-status", async (req, res) => {
    const { app_trans_id } = req.body;

    // MAC cho query: appid|apptransid|key1
    const data = zalopayConfig.app_id + "|" + app_trans_id + "|" + zalopayConfig.key1;
    const mac = CryptoJS.HmacSHA256(data, zalopayConfig.key1).toString();

    const response = await axios.post(zalopayConfig.endpoint.query, null, {
        params: { app_id: zalopayConfig.app_id, app_trans_id, mac },
    });

    // return_code: 1=Thành công, 2=Thất bại, 3=Đang xử lý
    res.json(response.data);
});


app.get("/api/health", (req, res) => {
    res.json({
        status: "OK",
        message: "ZaloPay Payment Server đang chạy",
        timestamp: new Date().toISOString(),
    });
});

// ══════════════════════════════════════════
// PHỤC VỤ FRONTEND REACT (HOSTING ALL-IN-ONE)
// ══════════════════════════════════════════
// Nếu không phải là các route /api/* ở trên, trả về file index.html của React
app.use(express.static(path.join(__dirname, "../dist")));
app.use((req, res) => {
    res.sendFile(path.join(__dirname, "../dist/index.html"));
});

// ══════════════════════════════════════════
// KHỞI ĐỘNG SERVER
// ══════════════════════════════════════════

app.listen(PORT, () => {
    console.log("═══════════════════════════════════════════");
    console.log(`  💰 ZaloPay Payment Server`);
    console.log(`  🌐 http://localhost:${PORT}`);
    console.log(`  📡 API: http://localhost:${PORT}/api/zalopay/create-order`);
    console.log(`  🔍 Health: http://localhost:${PORT}/api/health`);
    console.log(`  📦 Mode: SANDBOX (Test)`);
    console.log("═══════════════════════════════════════════");
});