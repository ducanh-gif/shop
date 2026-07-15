import React from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import CheckoutForm from "../../components/CheckoutForm";
import OrderSummary from "../../components/OrderSummary";
import { createZaloPayOrder } from "../../firebase/zalopayService";
import { useAuth } from "../../context/AuthContext";

const Checkout = () => {
  const { user } = useAuth();
  const location = useLocation();

  const rawItems = location.state?.items || [];
  const realSubtotal = location.state?.subtotal || 0;
  const shippingCost = 0;
  const taxCost = Math.round(realSubtotal * 0.08); // Làm tròn số tiền thuế nguyên tệ VND
  const finalTotal = realSubtotal + shippingCost + taxCost;

  // Map cấu trúc phù hợp cho giao diện OrderSummary gốc hiển thị
  const cartItems = rawItems.map(item => ({
    id: item.id,
    title: item.name,
    quantity: item.quantity,
    price: item.price,
    iconType: item.tags?.includes("Fish Oil") ? "fish" : "test-tube"
  }));

  const summaryCalculation = {
    subtotal: realSubtotal,
    shipping: shippingCost,
    tax: taxCost,
    total: finalTotal,
  };

  const handleSubmit = async (e) => {
    if (e && typeof e.preventDefault === 'function') e.preventDefault();
    if (cartItems.length === 0) return alert("Đơn hàng rỗng, không thể tiến hành thanh toán!");

    const orderId = "ORD-" + Date.now().toString(36).toUpperCase();
    
    // ✅ SỬA QUAN TRỌNG: Lấy thẳng giá trị tiền Việt gốc, KHÔNG nhân với 25000 nữa
    const amountInVND = Math.round(finalTotal); 

    try {
      const result = await createZaloPayOrder({
        amount: amountInVND > 0 ? amountInVND : 20000, // Fallback đơn hàng test tối thiểu 20k nếu rỗng
        description: `ShopVN - Đơn hàng #${orderId}`,
        items: cartItems,
        userId: user?.uid || "guest_user",
        orderId: orderId,
      });

      if (result.return_code === 1 && result.order_url) {
        // Redirect trực tiếp qua hóa đơn QR Code thanh toán thực tế của ZaloPay
        window.location.href = result.order_url;
      } else {
        alert("Tạo đơn hàng ZaloPay thất bại: " + (result.return_message || "Lỗi máy chủ"));
      }
    } catch (error) {
      console.error("Lỗi hệ thống cổng thanh toán ZaloPay:", error);
      alert("Hệ thống thanh toán đang bận, vui lòng thử lại sau!");
    }
  };

  return (
    <div className="min-h-screen bg-[#f3f8f5] flex flex-col font-sans selection:bg-[#006d44] selection:text-white">
      <Navbar />
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 md:px-8 py-10 flex items-start justify-center">
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <section className="lg:col-span-7 w-full">
            <CheckoutForm />
          </section>
          <section className="lg:col-span-5 w-full sticky top-6">
            {/* 💡 Lưu ý: Bên trong OrderSummary.jsx, bạn hãy thay đổi hiển thị dấu '$' bằng chữ 'đ' kế bên các biến tính toán tương tự nhé */}
            <OrderSummary items={cartItems} summaryData={summaryCalculation} handlesubmit={handleSubmit} />
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Checkout;