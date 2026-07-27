import { GoogleGenAI } from "@google/genai";
import { fetchProducts } from "../firebase/productService"; 

const GEMINI_API_KEY =
  import.meta.env?.VITE_GEMINI_API_KEY ||
  (typeof process !== "undefined" ? process.env.VITE_GEMINI_API_KEY : "");

let ai = null;

const getAI = () => {
  if (!ai && GEMINI_API_KEY) {
    ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });
  }
  return ai;
};

// --- QUẢN LÝ CACHE SẢN PHẨM ---
let cachedProducts = null;
let lastFetchTime = 0;
const CACHE_DURATION = 5 * 60 * 1000; // Cache trong 5 phút

const getProductsWithCache = async () => {
  const now = Date.now();
  if (!cachedProducts || (now - lastFetchTime) > CACHE_DURATION) {
    try {
      cachedProducts = await fetchProducts();
      lastFetchTime = now;
    } catch (err) {
      console.error("Không thể tải danh sách sản phẩm cho chatbot:", err);
      return cachedProducts || [];
    }
  }
  return cachedProducts;
};

// --- QUẢN LÝ LỊCH SỬ CHAT ---
let conversationHistory = [];
const MAX_HISTORY = 10;

/**
 * Gửi tin nhắn và cho phép AI gợi ý sản phẩm thực tế từ hệ thống
 */
export const sendChatMessage = async (userMessage) => {
  const client = getAI();
  
  if (!client) {
    return "⚠️ Lỗi: Chưa cấu hình API Key Gemini trong file môi trường (.env hoặc Render).";
  }

  try {
    // 1. Lấy danh sách sản phẩm (có cơ chế cache 5 phút để tăng tốc độ phản hồi)
    const productsList = await getProductsWithCache();

    // Chuyển đổi mảng sản phẩm thành chuỗi ngắn gọn để AI dễ đọc
    const productsContext = productsList && productsList.length > 0
      ? productsList.map(p => `- ID: ${p.id} | Tên: ${p.name} | Giá: ${p.price ? p.price.toLocaleString('vi-VN') + 'đ' : 'Liên hệ'} | Danh mục: ${p.category || 'Chung'} | Mô tả: ${p.description || 'Không có'}`).join('\n')
      : "Hiện tại chưa có sản phẩm nào trên hệ thống.";

    // 2. Thiết lập System Instruction
    const systemInstruction = `
      Bạn là trợ lý ảo tư vấn thông minh, thân thiện của trang web thương mại điện tử sức khỏe "NutriHealth".
      
      DƯỚI ĐÂY LÀ DANH SÁCH SẢN PHẨM THỰC TẾ ĐANG CÓ TRÊN HỆ THỐNG CỦA CHÚNG TÔI:
      ${productsContext}

      NHIỆM VỤ CỦA BẠN:
      - Dựa vào danh sách sản phẩm ở trên để gợi ý chính xác cho khách hàng khi họ hỏi về sản phẩm, giá cả, hoặc tìm kiếm giải pháp sức khỏe.
      - Khi gợi ý sản phẩm, hãy nhắc đến tên sản phẩm, giá tiền chính xác và lý do vì sao sản phẩm đó phù hợp với họ.
      - Nếu cần hướng dẫn xem chi tiết, bạn có thể gợi ý người dùng truy cập trang sản phẩm theo đường dẫn dạng: /shop/[ID_SAN_PHAM]
      - Nếu khách hàng hỏi sản phẩm không có trong danh sách trên, hãy khéo léo thông báo và gợi ý sản phẩm gần giống nhất có trong danh sách.
      - Trả lời ngắn gọn, rõ ràng, lịch sự bằng tiếng Việt.
    `;

    // 3. Tạo phiên chat sử dụng model 'gemini-1.5-flash' hoặc 'gemini-2.5-flash'
    const chatSession = client.chats.create({
      model: 'gemini-3.1-flash-lite', // Hoặc 'gemini-1.5-flash' tùy thuộc phiên bản Gemini bạn muốn dùng
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.7,
      },
      history: conversationHistory
    });

    const result = await chatSession.sendMessage({
      message: userMessage
    });

    const botReply = result.text;

    // 4. Lưu lại lịch sử hội thoại
    conversationHistory.push(
      { role: 'user', parts: [{ text: userMessage }] },
      { role: 'model', parts: [{ text: botReply }] }
    );

    if (conversationHistory.length > MAX_HISTORY * 2) {
      conversationHistory = conversationHistory.slice(-MAX_HISTORY * 2);
    }

    return botReply;

  } catch (error) {
    console.error("Lỗi khi gọi Gemini API:", error);
    return "Xin lỗi, hệ thống tư vấn đang gặp chút gián đoạn. Vui lòng thử lại sau ít phút!";
  }
};

/**
 * Xóa sạch lịch sử trò chuyện
 */
export const clearChatHistory = () => {
  conversationHistory = [];
};