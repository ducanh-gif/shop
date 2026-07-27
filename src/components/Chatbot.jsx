import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Bot, User, Loader2, Trash2 } from 'lucide-react';
import { sendChatMessage, clearChatHistory } from '../firebase/chatbotService';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      sender: 'bot',
      text: 'Xin chào! Tui là trợ lý ảo NutriHealth. Tui có thể giúp gì cho bạn trong việc tìm kiếm & tư vấn sản phẩm hôm nay?'
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // Tự động cuộn xuống tin nhắn mới nhất
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  // Xử lý gửi tin nhắn
  const handleSend = async (e) => {
    e.preventDefault();
    if (!inputValue.trim() || loading) return;

    const userMsg = inputValue.trim();
    setInputValue('');

    // 1. Hiển thị tin nhắn người dùng lập tức
    setMessages((prev) => [...prev, { sender: 'user', text: userMsg }]);
    setLoading(true);

    try {
      // 2. Gọi Gemini API từ chatbotService
      const botResponse = await sendChatMessage(userMsg);

      // 3. Hiển thị câu trả lời từ Bot
      setMessages((prev) => [...prev, { sender: 'bot', text: botResponse }]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { sender: 'bot', text: 'Rất tiếc, đã có lỗi xảy ra. Vui lòng thử lại!' }
      ]);
    } finally {
      setLoading(false);
    }
  };

  // Làm sạch lịch sử chat
  const handleClearHistory = () => {
    clearChatHistory();
    setMessages([
      {
        sender: 'bot',
        text: 'Đã xóa lịch sử trò chuyện. Tui có thể giúp gì thêm cho bạn?'
      }
    ]);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans">
      
      {/* 🟢 KHUNG CHAT (CHATBOX) */}
      {isOpen && (
        <div className="mb-4 w-[360px] sm:w-[380px] h-[520px] bg-white rounded-3xl shadow-2xl border border-gray-100 flex flex-col overflow-hidden transition-all duration-300 animate-in fade-in slide-in-from-bottom-5">
          
          {/* Header của Khung Chat */}
          <div className="bg-[#1a3a2f] text-white p-4 flex items-center justify-between border-b border-[#2a5043]">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-[#059669] flex items-center justify-center shadow-inner">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-sm leading-tight flex items-center gap-1.5">
                  NutriHealth AI
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                </h3>
                <p className="text-[11px] text-emerald-200/80">Trợ lý tư vấn sức khỏe</p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              {/* Nút xóa lịch sử */}
              <button
                onClick={handleClearHistory}
                className="p-1.5 text-emerald-200/70 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                title="Xóa cuộc trò chuyện"
              >
                <Trash2 className="w-4 h-4" />
              </button>

              {/* Nút Đóng */}
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 text-emerald-200/70 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Nội dung tin nhắn (Messages Area) */}
          <div className="flex-1 p-4 overflow-y-auto bg-[#fafbfa] space-y-3.5">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex gap-2.5 items-end ${
                  msg.sender === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                {/* Icon Avatar Bot */}
                {msg.sender === 'bot' && (
                  <div className="w-7 h-7 rounded-full bg-[#1a3a2f] text-white flex items-center justify-center shrink-0 mb-1">
                    <Bot className="w-4 h-4" />
                  </div>
                )}

                {/* Bong bóng tin nhắn */}
                <div
                  className={`max-w-[78%] px-4 py-2.5 rounded-2xl text-xs leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-[#1a3a2f] text-white rounded-br-none shadow-sm'
                      : 'bg-white text-gray-800 rounded-bl-none border border-gray-100 shadow-sm'
                  }`}
                >
                  <p className="whitespace-pre-line">{msg.text}</p>
                </div>

                {/* Icon Avatar User */}
                {msg.sender === 'user' && (
                  <div className="w-7 h-7 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0 mb-1">
                    <User className="w-4 h-4" />
                  </div>
                )}
              </div>
            ))}

            {/* Hiệu ứng đang gõ (Loading) */}
            {loading && (
              <div className="flex gap-2.5 items-end justify-start">
                <div className="w-7 h-7 rounded-full bg-[#1a3a2f] text-white flex items-center justify-center shrink-0">
                  <Bot className="w-4 h-4" />
                </div>
                <div className="bg-white border border-gray-100 px-4 py-3 rounded-2xl rounded-bl-none shadow-sm flex items-center gap-1.5">
                  <Loader2 className="w-4 h-4 text-[#059669] animate-spin" />
                  <span className="text-xs text-gray-400 font-medium">NutriHealth đang suy nghĩ...</span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Ô Nhập tin nhắn (Input Area) */}
          <form onSubmit={handleSend} className="p-3 bg-white border-t border-gray-100 flex items-center gap-2">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Nhập câu hỏi hoặc tên sản phẩm..."
              className="flex-1 bg-gray-50 text-gray-900 placeholder-gray-400 text-xs rounded-xl px-3.5 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#1a3a2f]/20 border border-transparent focus:border-[#1a3a2f] transition-all"
            />
            <button
              type="submit"
              disabled={!inputValue.trim() || loading}
              className="w-9 h-9 bg-[#1a3a2f] hover:bg-[#234d3f] disabled:opacity-40 text-white rounded-xl flex items-center justify-center transition-all shrink-0 active:scale-95 shadow-sm"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

        </div>
      )}

      {/* 🔴 NÚT BẤM TRÒN CÓ ICON KHUNG CHAT (FLOATING BUTTON) */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-14 h-14 rounded-full bg-[#1a3a2f] hover:bg-[#234d3f] text-white flex items-center justify-center shadow-xl hover:shadow-2xl transition-all duration-300 transform active:scale-90 group relative ${
          isOpen ? 'rotate-90 bg-red-600 hover:bg-red-700' : ''
        }`}
        aria-label="Mở khung chat"
      >
        {isOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <>
            <MessageSquare className="w-6 h-6 group-hover:scale-110 transition-transform" />
            
            {/* Chấm xanh nhấp nháy báo online */}
            <span className="absolute top-1 right-1 w-3.5 h-3.5 bg-[#059669] border-2 border-white rounded-full"></span>
          </>
        )}
      </button>

    </div>
  );
};

export default Chatbot;